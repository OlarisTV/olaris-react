// @flow
import React from 'react';

import LogoIcon from 'Components/Logo/LogoIcon';
import Title from '../Components/Title';
import Input from '../Components/Input';
import Button from '../Components/Button';
import FormLink from '../Components/FormLink';

import * as S from '../Styles';

type Props = {
    error: boolean,
    initialSetup: boolean,
    username: string,
    password: string,
    inviteCode: string,
    onChange: Function,
    onSubmit: Function,
};

const RegisterForm = ({ error, onChange, onSubmit, initialSetup, username, password, inviteCode = null }: Props) => {
    const heading = initialSetup ? 'Welcome To Olaris' : 'Olaris';
    const title = initialSetup ? 'Setup your admin account' : 'Register Account';
    const warning = 'You are currently creating your admin account ensure you remember your details';

    return (
        <>
            {initialSetup && <S.Help>{warning}</S.Help>}
            <S.FormWrap error={error}>
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
                    value={username}
                    autocomplete="new-username"
                    placeholder="Username"
                    required
                    handleChange={onChange}
                />
                <Input
                    type="password"
                    name="password"
                    value={password}
                    autocomplete="new-password"
                    placeholder="Password"
                    required
                    handleChange={onChange}
                />
                <Button callback={onSubmit}>Create Account</Button>

                {!initialSetup && <FormLink to="/login" strapline="Have An Account?" value="Log In" setup={false} />}
            </S.FormWrap>
        </>
    );
};

export default RegisterForm;
