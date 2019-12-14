import React from 'react';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

import { Auth } from 'Client/Auth';

import * as S from './Styles';

const Logout = () => (
    <S.NavButton onClick={() => Auth.logout()}>
        <S.NavIcon icon={faSignOutAlt} />
    </S.NavButton>
);

export default Logout;
