import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { useLocation } from 'react-router';

import { Auth } from 'Client/Auth';

const PrivateRoute = ({ children, computedMatch, exact, path }) => {
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

PrivateRoute.propTypes = {
    children: PropTypes.node,
    computedMatch: PropTypes.shape({}),
    exact: PropTypes.bool.isRequired,
    path: PropTypes.string.isRequired,
};

PrivateRoute.defaultProps = {
    children: null,
    computedMatch: {},
};

export default PrivateRoute;
