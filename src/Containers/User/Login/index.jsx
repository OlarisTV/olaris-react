import React, { useState } from 'react';
import { Redirect, useHistory, useLocation } from 'react-router';
import { withAlert } from 'react-alert';

import { isInitialSetup } from 'Helpers';
import { AUTH_REQUEST, Auth } from 'Client/Auth';

import LoginForm from 'Components/User/Login';

import UserFormWrap from '../Styles';

const Login = ({ alert }) => {
    const [redirect, setRedirect] = useState(false);
    const [formData, setFormData] = useState({
        success: false,
        error: false,
        username: '',
        password: '',
    });

    const { from } = useLocation().state || { from: { pathname: '/dashboard' } };
    const { success, error, username, password } = formData;

    if (useHistory().location.state && useHistory().location.state.registered) {
        alert.success('Account Successfully Created, login with your details above');
    }

    const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onError = (message) => {
        setFormData({ ...formData, error: true });
        alert.error(`There was a problem with your request: ${message}`);
    };

    const onSubmit = () => {
        AUTH_REQUEST(username, password)
            .then(() => {
                setFormData({ ...formData, success: true });

                setTimeout(() => {
                    setRedirect(true);
                }, 750);
            })
            .catch((err) => {
                onError(err.message && err.response.data.message);
            });
    };

    if (isInitialSetup()) return <Redirect to="/register" />;
    if (redirect || Auth.isAuthenticated) return <Redirect to={from} />;

    return (
        <UserFormWrap success={success}>
            <LoginForm onSubmit={onSubmit} onChange={onChange} error={error} />
        </UserFormWrap>
    );
};

export default withAlert()(Login);
