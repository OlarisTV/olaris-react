// @flow
import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationCircle, faCheckCircle, faQuestionCircle } from '@fortawesome/free-solid-svg-icons';

type Props = {
    options: Object,
};

const AlertIcon = ({ options }: Props) => {
    switch (options.type) {
        case 'error':
            return <FontAwesomeIcon icon={faExclamationCircle} color="#E83C50" size="2x" />;
        case 'info':
            return <FontAwesomeIcon icon={faQuestionCircle} color="#4C6EAC" size="2x" />;
        case 'success':
            return <FontAwesomeIcon icon={faCheckCircle} color="#81A35A" size="2x" />;
        default:
            return false;
    }
};

export default AlertIcon;
