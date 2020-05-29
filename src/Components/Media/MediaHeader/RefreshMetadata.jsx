import React, { useState } from 'react';
import { graphql } from 'react-apollo';
import { useAlert } from 'react-alert';
import { faSync } from '@fortawesome/free-solid-svg-icons';

import REFRESH_METADATA from 'Mutations/refreshMetadata';

import { HeaderIconWrap, HeaderIcon } from './Styles';

type Props = {
    uuid: string,
    mutate: Function,
};

const RefreshMetadata = ({ uuid, mutate }: Props) => {
    const [disabled, setDisabled] = useState(false);
    const alert = useAlert();

    const refreshMetadata = () =>
        mutate({
            variables: { uuid },
        }).then(() => {
            setDisabled(true);

            alert.success('Refreshing Metadata, this may take a while');
        });

    return (
        <HeaderIconWrap disabled={disabled} onClick={() => refreshMetadata()} data-tip="Refresh Meta Data" right>
            <HeaderIcon icon={faSync} />
        </HeaderIconWrap>
    );
};

export default graphql(REFRESH_METADATA)(RefreshMetadata);
