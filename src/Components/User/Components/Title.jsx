// @flow
import React from 'react';

import * as S from '../Styles';

type Props = {
    heading: string,
    sub: string,
};

const Title = ({ heading, sub }: Props) => (
    <>
        <S.Heading>{heading}</S.Heading>
        <S.SubHeading>{sub}</S.SubHeading>
    </>
);

export default Title;
