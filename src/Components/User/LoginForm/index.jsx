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
    username: string,
    password: string,
    onChange: Function,
    onSubmit: Function,
};

const LoginForm = ({ error, onChange, onSubmit, username, password }: Props) => (
    <S.FormWrap error={error}>
        <LogoIcon alt="Olaris" height="35" />
        <Title heading="Welcome Back!" sub="Login to get started" />

        <Input
            type="text"
            name="username"
            value={username}
            autocomplete="username"
            placeholder="Enter Username"
            handleChange={onChange}
        />

        <Input
            type="password"
            name="password"
            value={password}
            autocomplete="password"
            placeholder="Enter Password"
            handleChange={onChange}
        />

        <Button callback={onSubmit}>Login</Button>
        <FormLink to="/register" strapline="Don't Have An Account?" value="Sign Up" setup={false} />
    </S.FormWrap>
);

export default LoginForm;
