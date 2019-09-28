import React from 'react';
import PropTypes from 'prop-types';
import { transitions, positions } from 'react-alert';

import AlertIcon from './AlertIcon';
import AlertInline from './AlertInline';

import * as S from './Styles';

const AlertOptions = {
    position: positions.BOTTOM_RIGHT,
    timeout: 5000,
    transition: transitions.SCALE,
    offset: '30',
};

const AlertTemplate = ({ message, options, close }) => (
    <S.AlertWrap>
        <S.AlertMessage>{message}</S.AlertMessage>

        <S.IconWrap>{AlertIcon(options.type)}</S.IconWrap>
        <S.Close onClick={close}>×</S.Close>
    </S.AlertWrap>
);

AlertTemplate.propTypes = {
    message: PropTypes.string.isRequired,
    options: PropTypes.shape({
        type: PropTypes.string,
        timeout: PropTypes.number,
    }),
    close: PropTypes.func.isRequired,
};

AlertTemplate.defaultProps = {
    options: PropTypes.shape({
        type: 'info',
        timeout: 5000,
    }),
};

export { AlertTemplate, AlertOptions, AlertInline };
