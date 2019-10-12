import React from 'react';

import { Auth } from 'Client/Auth';
import navigationArr from 'Routes/Helper/navigationArr';
import NavItem from './NavItem';

const Navigation = () => {
    const renderNavigation = navigationArr.map((item) => {
        if (item.admin && !Auth.isAdmin) return false;

        return <NavItem name={item.name} links={item.links} key={item.id} />;
    });

    return <>{renderNavigation}</>;
};

export default Navigation;
