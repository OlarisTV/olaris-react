import React from 'react';
import PropTypes from 'prop-types';

import LogoIcon from 'Components/Logo/LogoIcon';
import { FormWrap, Help } from '../Styles';

import Title from '../Components/Title';
import Input from '../Components/Input';
import Button from '../Components/Button';
import FormLink from '../Components/FormLink';

const RegisterForm = ({ error, onChange, onSubmit, initialSetup, inviteCode }) => {
    const heading = initialSetup ? 'Welcome To Olaris' : 'Olaris';
    const title = initialSetup ? 'Setup your admin account' : 'Register Account';
    const warning = 'You are currently creating your admin account ensure you remember your details';

    return (
        <>
            {initialSetup && <Help>{warning}</Help>}
            <FormWrap error={error}>
                <LogoIcon alt="Olaris" height="30" />
                <Title heading={heading} sub={title} />

                {!initialSetup && (
                    <Input
                        type="text"
                        value={inviteCode}
                        name="inviteCode"
                        autocomplete="inviteCode"
                        placeholder="Enter Invite Code"
                        handleChange={onChange}
                        uniqueCode
                    />
                )}
                <Input
                    type="text"
                    name="username"
                    autocomplete="new-username"
                    placeholder="Username"
                    required
                    handleChange={onChange}
                />
                <Input
                    type="password"
                    name="password"
                    autocomplete="new-password"
                    placeholder="Password"
                    required
                    handleChange={onChange}
                />
                <Button handleSubmit={onSubmit} value="Create Account" />

                {!initialSetup && <FormLink to="/login" strapline="Have An Account?" value="Log In" setup={false} />}
            </FormWrap>
        </>
    );
};

RegisterForm.propTypes = {
    error: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    initialSetup: PropTypes.bool.isRequired,
    inviteCode: PropTypes.string,
};

RegisterForm.defaultProps = {
    inviteCode: '',
};

export default RegisterForm;
