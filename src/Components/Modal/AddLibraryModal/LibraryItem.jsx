// @flow
import React from 'react';
import { useMutation } from '@apollo/react-hooks';
import ReactToolTip from 'react-tooltip';

import { faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import { faExclamation, faSpinner } from '@fortawesome/free-solid-svg-icons';

import FETCH_LIBRARIES from 'Queries/fetchLibraries';
import { DELETE_LIBRARY } from 'Mutations/manageLibraries';

import { AlertInline } from 'Components/Alerts';
import { LibraryItemWrap, LibraryItemFilePath, LibraryItemDelete, LibraryUnhealthy } from './Styles';

type Props = {
    filePath: string,
    id: number,
    backend: number,
    healthy?: boolean,
};

const LibraryItem = ({ filePath, id, backend, healthy }: Props) => {
    const libraryType = backend === 0 ? 'Local' : 'Rclone';
    const [deleteLibrary, { loading, error }] = useMutation(DELETE_LIBRARY, {
        variables: { id },
        refetchQueries: [{ query: FETCH_LIBRARIES }],
    });

    return (
        <LibraryItemWrap>
            <ReactToolTip effect="solid" place="bottom" className="tooltip" />

            {error && <AlertInline type="error">{error.message}</AlertInline>}
            <LibraryItemFilePath>
                <span>
                    {!healthy && (
                        <LibraryUnhealthy
                            icon={faExclamation}
                            data-tip="This is an unhealthy library, playback may be broken."
                        />
                    )}
                    {libraryType}
                </span>

                {filePath.length > 50 ? <p data-tip={filePath}>{filePath}</p> : filePath}
            </LibraryItemFilePath>

            {!loading && <LibraryItemDelete icon={faTrashAlt} onClick={() => deleteLibrary()} />}
            {loading && <LibraryItemDelete icon={faSpinner} spin deleting={loading ? 1 : 0} />}
        </LibraryItemWrap>
    );
};

export default LibraryItem;

LibraryItem.defaultProps = {
    healthy: true,
};
