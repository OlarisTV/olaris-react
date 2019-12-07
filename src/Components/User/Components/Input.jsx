// @flow
import React, { useState } from 'react';

import * as S from '../Styles';

type Props = {
    type: string,
    name: string,
    value?: string | null,
    required?: boolean,
    placeholder: string,
    handleChange: Function,
    uniqueCode?: boolean,
    autocomplete: string,
};

const Input = ({
    type,
    name,
    placeholder,
    handleChange,
    autocomplete,
    value,
    required,
    uniqueCode,
}: Props) => {
    const [focused, setFocus] = useState(false);

    return (
        <S.InputWrap isFocused={focused} uniqueCode={uniqueCode}>
            <S.TextInput
                type={type}
                name={name}
                value={value}
                placeholder={placeholder}
                autoComplete={autocomplete}
                onChange={handleChange}
                onFocus={() => setFocus(true)}
                onBlur={() => setFocus(false)}
                required={required}
            />
        </S.InputWrap>
    );
};

Input.defaultProps = {
    required: false,
    value: null,
    uniqueCode: false,
};

export default Input;
