import React from 'react';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

import { Auth } from 'Client/Auth';
import { NavButton, NavIcon } from './Styles';

const Logout = () => (
    <NavButton onClick={() => Auth.logout()}>
        <NavIcon icon={faSignOutAlt} />
    </NavButton>
);

export default Logout;
