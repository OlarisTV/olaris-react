import React from 'react';
import PropTypes from 'prop-types';

import LogoIcon from 'Components/Logo/LogoIcon';
import { FormWrap } from '../Styles';

import Title from '../Components/Title';
import Input from '../Components/Input';
import Button from '../Components/Button';
import FormLink from '../Components/FormLink';

const LoginForm = ({ error, onChange, onSubmit }) => (
    <>
        <FormWrap error={error}>
            <LogoIcon alt="Olaris" height="35" />
            <Title heading="Welcome Back!" sub="Login to get started" />

            <Input
                type="text"
                name="username"
                autocomplete="username"
                placeholder="Enter Username"
                handleChange={onChange}
            />
            <Input
                type="password"
                name="password"
                autocomplete="password"
                placeholder="Enter Password"
                handleChange={onChange}
            />
            <Button handleSubmit={onSubmit} value="Login" />

            <FormLink to="/register" strapline="Don't Have An Account?" value="Sign Up" setup={false} />
        </FormWrap>
    </>
);

LoginForm.propTypes = {
    error: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
};

export default LoginForm;
