import React from 'react';
import { Auth } from 'Client/Auth';

import navigationArr from 'Routes/Helper/navigationArr';
import NavItem from './NavItem';

const Navigation = () => (
    <>
        {navigationArr.map((item) => {
            if (item.admin && !Auth.isAdmin.admin) return false;

            return <NavItem name={item.name} links={item.links} key={item.id} />;
        })}
    </>
);

export default Navigation;
