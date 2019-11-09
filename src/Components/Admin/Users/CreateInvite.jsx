// @flow
import React from 'react';

import * as S from './Styles';

type Props = {
    generateInvite: Function,
    loading: boolean,
};

const CreateInvite = ({ generateInvite, loading }: Props) => (
    <S.GenerateInvite onClick={() => generateInvite()} disabled={loading}>
        Create Invite
    </S.GenerateInvite>
);

export default CreateInvite;
