import React from 'react';
import PropTypes from 'prop-types';

import AlertIcon from './AlertIcon';
import AlertInline from './AlertInline';

import { AlertWrap, AlertMessage, IconWrap, Close } from './Styles';

const AlertOptions = {
    position: 'bottom right',
    timeout: 5000,
    transition: 'fade',
    offset: '30'
};

const AlertTemplate = ({ message, options, close }) => (
    <AlertWrap>
        <AlertMessage>{message}</AlertMessage>

        <IconWrap>{AlertIcon(options.type)}</IconWrap>
        <Close onClick={close}>×</Close>
    </AlertWrap>
);

AlertTemplate.propTypes = {
    message: PropTypes.string.isRequired,
    options: PropTypes.shape({
        type: PropTypes.string,
        timeout: PropTypes.number
    }),
    close: PropTypes.func.isRequired
};

AlertTemplate.defaultProps = {
    options: PropTypes.shape({
        type: 'info',
        timeout: 5000
    })
};

export { AlertTemplate, AlertOptions, AlertInline };
