// @flow
import React from 'react';

import * as S from '../Styles';

type Props = {
    value: string,
    to: string,
};

const ForgotPassword = ({ to, value }: Props) => (
    <S.ForgotPasswordLink to={to} value={value}>
        {value}
    </S.ForgotPasswordLink>
);

export default ForgotPassword;
