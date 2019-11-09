// @flow
import React from 'react';

import InviteItem from 'Components/Admin/Users/InviteItem';

import * as S from './Styles';

type Props = {
    invites: Array<Object>,
};

const RenderInvites = ({ invites }: Props) => (
    <S.List>
        <S.ListHeading>Invites</S.ListHeading>
        {invites.map((i) => <InviteItem key={i.code} code={i.code} />)}
    </S.List>
);

export default RenderInvites;
