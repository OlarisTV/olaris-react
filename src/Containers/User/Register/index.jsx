import React, { useState, useReducer, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Auth } from 'Client/Auth';
import { withAlert } from 'react-alert';
import { Redirect, useLocation } from 'react-router';
import { getUrlParameter, isInitialSetup } from 'Helpers';

import CREATE_USER from 'Mutations/createUser';
import RegisterForm from 'Components/User/RegisterForm';
import { initialState, reducer } from './reducer';

import UserFormWrap from '../Styles';

const Register = ({ alert }) => {
    const [initialSetup, setInitialSetup] = useState(false);
    const [formState, dispatch] = useReducer(reducer, initialState);

    const { from } = useLocation().state || { from: { pathname: '/dashboard' } };
    const { success, error, username, password, inviteCode } = formState;

    const onChange = (name, value) => dispatch({ type: 'UPDATE_FORM', payload: { name, value } });

    const onError = (message) => {
        alert.error(`There was a problem with your request: ${message}`);

        dispatch({ type: 'ERROR' });
    };

    const onSubmit = () => {
        let registerInfo = {
            username,
            password,
        };

        if (!initialSetup) {
            registerInfo = {
                ...registerInfo,
                code,
            };
        }

        CREATE_USER(registerInfo)
            .then(() => {
                dispatch({ type: 'SUCCESS' });
            })
            .catch((err) => {
                onError(err.response.data.message);
            });
    };

    useEffect(() => {
        setInitialSetup(isInitialSetup);
        dispatch({
            type: 'UPDATE_FORM',
            payload: {
                name: 'inviteCode',
                value: getUrlParameter('inviteCode') ? getUrlParameter('inviteCode') : '',
            },
        });
    }, []);

    if (Auth.isAuthenticated) return <Redirect to={from} />;
    if (success) return <Redirect to={{ pathname: '/login', state: { registered: true } }} />;

    return (
        <UserFormWrap>
            <RegisterForm
                onSubmit={onSubmit}
                error={error}
                inviteCode={inviteCode}
                onChange={({ target: { name, value } }) => onChange(name, value)}
                initialSetup={initialSetup}
                username={username}
                password={password}
            />
        </UserFormWrap>
    );
};

Register.propTypes = {
    alert: PropTypes.shape({
        success: PropTypes.func.isRequired,
        error: PropTypes.func.isRequired,
    }).isRequired,
};

export default withAlert()(Register);
