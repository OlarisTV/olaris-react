// @flow
import React, { type Node } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useLocation } from 'react-router';

import { Auth } from 'Client/Auth';

type Props = {
    children?: Node | null,
    computedMatch?: Object,
    exact: boolean,
    path: string,
};

const PrivateRoute = ({ children, computedMatch, exact, path }: Props) => {
    const from = useLocation();

    return (
        <Route computedMatch={computedMatch} exact={exact} path={path}>
            {Auth.isAuthenticated ? (
                children
            ) : (
                <Redirect
                    to={{
                        pathname: '/',
                        state: { from },
                    }}
                />
            )}
        </Route>
    );
};

PrivateRoute.defaultProps = {
    children: null,
    computedMatch: {},
};

export default PrivateRoute;
