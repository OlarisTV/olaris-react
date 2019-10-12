import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { useLocation } from 'react-router';

import { Auth } from 'Client/Auth';

const AdminRoute = ({ children, computedMatch, exact, path }) => {
    const from = useLocation();

    return (
        <Route computedMatch={computedMatch} exact={exact} path={path}>
            {Auth.isAuthenticated && Auth.isAdmin ? (
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

AdminRoute.propTypes = {
    children: PropTypes.node,
    computedMatch: PropTypes.shape({}),
    exact: PropTypes.bool.isRequired,
    path: PropTypes.string.isRequired,
};

AdminRoute.defaultProps = {
    children: null,
    computedMatch: {},
};

export default AdminRoute;
