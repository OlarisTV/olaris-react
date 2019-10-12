import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useMutation } from '@apollo/react-hooks';
import { useAlert } from 'react-alert';

import { faSync } from '@fortawesome/free-solid-svg-icons';

import REFRESH_METADATA from 'Mutations/refreshMetadata';

import * as S from './Styles';

const RefreshMetadata = ({ uuid }) => {
    const alert = useAlert();
    const [state, setState] = useState(false);
    const [refreshMetadata] = useMutation(REFRESH_METADATA, {
        onCompleted: () => {
            setState(true);
            alert.show('Success!, Refreshing metadata this may take a while');
        },
    });

    return (
        <S.HeaderIconWrap
            disabled={state}
            onClick={() => refreshMetadata({ variables: { uuid } })}
            data-tip="Refresh Meta Data"
        >
            <S.HeaderIcon icon={faSync} />
        </S.HeaderIconWrap>
    );
};

RefreshMetadata.propTypes = {
    uuid: PropTypes.string.isRequired,
};

export default RefreshMetadata;
