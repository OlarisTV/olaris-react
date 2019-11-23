// @flow
import React from 'react';
import { transitions, positions } from 'react-alert';

import AlertIcon from './AlertIcon';
import AlertInline from './AlertInline';

import * as S from './Styles';

type Options = {
    type: string,
    timeout: number,
};

type Props = {
    message: string,
    options?: Options,
    close: Function,
};

const AlertOptions = {
    position: positions.BOTTOM_RIGHT,
    timeout: 5000,
    transition: transitions.SCALE,
    offset: '30',
};

const AlertTemplate = ({ message, options, close }: Props) => (
    <S.AlertWrap>
        <S.AlertMessage>{message}</S.AlertMessage>

        <S.IconWrap>
            <AlertIcon options={options} />
        </S.IconWrap>
        <S.Close onClick={close}>×</S.Close>
    </S.AlertWrap>
);

AlertTemplate.defaultProps = {
    options: {
        type: 'info',
        timeout: 5000,
    },
};

export { AlertTemplate, AlertOptions, AlertInline };
