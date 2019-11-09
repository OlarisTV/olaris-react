import React from 'react';

import * as S from '../Styles';

type Props = {
    strapline: string,
    to: string,
    value: string,
};

const FormLink = ({ strapline, to, value }: Props) => (
    <S.FormLinkPara>
        {strapline}
        <S.Links to={to} title={value}>
            {value}
        </S.Links>
    </S.FormLinkPara>
);

export default FormLink;
