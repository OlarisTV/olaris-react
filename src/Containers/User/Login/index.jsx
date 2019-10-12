import React, { useState, useReducer, useEffect } from 'react';
import { useAlert } from 'react-alert';
import { Redirect, useHistory, useLocation } from 'react-router';

import { isInitialSetup } from 'Helpers';
import { AUTH_REQUEST, Auth } from 'Client/Auth';

import LoginForm from 'Components/User/LoginForm';
import { initialState, reducer } from './reducer';

import * as S from '../Styles';

const Login = () => {
    const [formState, dispatch] = useReducer(reducer, initialState);
    const [initialSetup, setInitialSetup] = useState(false);
    const [redirect, setRedirect] = useState(false);

    const alert = useAlert();
    const history = useHistory();
    const { from } = useLocation().state || { from: { pathname: '/dashboard' } };
    const { success, error, username, password } = formState;

    const onChange = (name, value) => dispatch({ type: 'UPDATE_FORM', payload: { name, value } });

    const onError = (message) => {
        alert.error(`There was a problem with your request: ${message}`);

        dispatch({ type: 'ERROR' });
    };

    const onSubmit = () => {
        AUTH_REQUEST(username, password)
            .then(() => {
                dispatch({ type: 'SUCCESS' });

                setTimeout(() => {
                    setRedirect(true);
                }, 750);
            })
            .catch((err) => {
                onError(err.response.data.message);
            });
    };

    useEffect(() => {
        setInitialSetup(isInitialSetup);

        if (history.location.state && history.location.state.registered) {
            alert.success('Account Successfully Created, login with your details above');
        }
    }, []);

    if (initialSetup) return <Redirect to="/register" />;
    if (redirect || Auth.isAuthenticated) return <Redirect to={from} />;

    return (
        <S.UserFormWrap success={success}>
            <LoginForm
                username={username}
                password={password}
                onSubmit={onSubmit}
                onChange={({ target: { name, value } }) => onChange(name, value)}
                error={error}
            />
        </S.UserFormWrap>
    );
};

export default Login;
