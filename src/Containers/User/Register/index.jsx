import React, { useState } from 'react';
import { withAlert } from 'react-alert';
import { Redirect, useLocation } from 'react-router';
import { getUrlParameter, isInitialSetup } from 'Helpers';

import { Auth } from 'Client/Auth';
import CREATE_USER from 'Mutations/createUser';
import RegisterForm from 'Components/User/Register';

import UserFormWrap from '../Styles';

const Register = ({ alert }) => {
    const [formData, setFormData] = useState({
        error: false,
        username: '',
        password: '',
        inviteCode: getUrlParameter('inviteCode') ? getUrlParameter('inviteCode') : '',
        initialSetup: isInitialSetup(),
        success: false,
    });

    const { from } = useLocation().state || { from: { pathname: '/dashboard' } };
    const { success, error, username, password, inviteCode, initialSetup } = formData;

    const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onError = (message) => {
        setFormData({ ...formData, error: true });
        alert.error(`There was a problem with your request: ${message}`);
    };

    const onSubmit = () => {
        let registerInfo = {
            username,
            password,
        };

        if (!initialSetup) {
            registerInfo = {
                ...registerInfo,
                code: inviteCode,
            };
        }

        CREATE_USER(registerInfo)
            .then(() => {
                setFormData({ ...formData, success: true });
            })
            .catch((err) => {
                onError(err.response.data.message);
            });
    };

    if (Auth.isAuthenticated) return <Redirect to={from} />;
    if (success) return <Redirect to={{ pathname: '/login', state: { registered: true } }} />;

    return (
        <UserFormWrap>
            <RegisterForm
                onSubmit={onSubmit}
                onChange={onChange}
                error={error}
                inviteCode={inviteCode}
                initialSetup={initialSetup}
            />
        </UserFormWrap>
    );
};

export default withAlert()(Register);
