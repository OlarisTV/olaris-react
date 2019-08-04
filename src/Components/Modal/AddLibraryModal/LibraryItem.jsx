import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
import ReactToolTip from 'react-tooltip';

import { faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import { faExclamation } from '@fortawesome/free-solid-svg-icons';
import { AlertInline } from 'Components/Alerts';
import FETCH_LIBRARIES from 'Queries/fetchLibraries';
import { DELETE_LIBRARY } from 'Mutations/manageLibraries';

import {
    LibraryItemWrap,
    LibraryItemFilePath,
    LibraryItemDelete,
    LibraryUnhealthy,
} from './Styles';

class LibraryItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            error: false,
            errorMessage: '',
        };
    }

    deleteLibrary = (id) => {
        const { mutate } = this.props;

        mutate({
            variables: { id },
            refetchQueries: [{ query: FETCH_LIBRARIES }],
        })
            .then((res) => {
                const { error } = res.data.deleteLibrary;

                if (error) {
                    this.setState({
                        error: true,
                        errorMessage: error.message,
                    });
                }
            })
            .catch((error) => {
                this.setState({
                    error: true,
                    errorMessage: error.message,
                });
            });
    };

    render() {
        const { filePath, id, backend, healthy } = this.props;
        const { error, errorMessage } = this.state;

        const libraryType = backend === 0 ? 'Local' : 'Rclone';

        const isHealthy = () => {
            if (healthy) return false;

            return (
                <LibraryUnhealthy
                    icon={faExclamation}
                    data-tip="This is an unhealthy library, playback may be broken."
                />
            );
        };

        return (
            <LibraryItemWrap>
                <ReactToolTip effect="solid" place="bottom" className="tooltip" />

                {error && <AlertInline type="error">{errorMessage}</AlertInline>}
                <LibraryItemFilePath>
                    <span>
                        {isHealthy()}
                        {libraryType}
                    </span>

                    {filePath.length > 50 ? <p data-tip={filePath}>{filePath}</p> : filePath}
                </LibraryItemFilePath>

                <LibraryItemDelete icon={faTrashAlt} onClick={() => this.deleteLibrary(id)} />
            </LibraryItemWrap>
        );
    }
}

LibraryItem.propTypes = {
    filePath: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    mutate: PropTypes.func.isRequired,
    backend: PropTypes.number.isRequired,
    healthy: PropTypes.bool,
};

LibraryItem.defaultProps = {
    healthy: true,
};

export default graphql(DELETE_LIBRARY)(LibraryItem);
