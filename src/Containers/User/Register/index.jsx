import React, { Component } from 'react';
import { withAlert } from 'react-alert';
import { Redirect } from 'react-router';
import { getUrlParameter } from 'Helpers';

import { Auth } from 'Client/Auth';
import CREATE_USER from 'Mutations/createUser';
import RegisterForm from 'Components/User/Register';

import UserFormWrap from '../Styles';

class Register extends Component {
    state = {
        error: false,
        redirectToDashboard: false,
        username: '',
        password: '',
        inviteCode: '',
        initialSetup: true,
        registeredSuccessful: false,
    };

    componentWillMount() {
        const { initialSetup } = this.props;

        if (Auth.isAuthenticated) this.setState({ redirectToDashboard: true });

        this.setState({
            inviteCode: getUrlParameter('inviteCode')
                ? getUrlParameter('inviteCode')
                : '',
            initialSetup,
        });
    }

    handleChange = ({ target: { name, value } }) => {
        this.setState({
            [name]: value,
        });
    };

    formError = (err) => {
        const { alert } = this.props;

        this.setState({ error: true }, () => {
            alert.error(`There is a problem: ${err}`);
        });
    };

    handleRegister = () => {
        const { username, password, inviteCode, initialSetup } = this.state;

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
                this.setState({ registeredSuccessful: true });
                return true;
            })
            .catch((err) => {
                this.formError(err.response.data.message);
            });

        return false;
    };

    render() {
        const { location } = this.props;
        const {
            redirectToDashboard,
            error,
            inviteCode,
            initialSetup,
            registeredSuccessful,
        } = this.state;

        if (registeredSuccessful)
            return (
                <Redirect
                    to={{ pathname: '/login', state: { registered: true } }}
                />
            );

        const { from } = location.state || { from: { pathname: '/dashboard' } };
        if (redirectToDashboard) return <Redirect to={from} />;

        const RegisterProps = {
            handleRegister: this.handleRegister,
            handleChange: this.handleChange,
            error,
            inviteCode,
            initialSetup,
        };

        return (
            <UserFormWrap>
                <RegisterForm {...RegisterProps} />
            </UserFormWrap>
        );
    }
}

export default withAlert(Register);
