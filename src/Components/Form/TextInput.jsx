// @flow
import React from 'react';

import { Input } from './Styles';

type Props = {
    placeholder: string,
    onChange: Function,
    type: string,
    name?: string,
    value?: string,
};

const TextInput = ({ placeholder, onChange, value, name, type }: Props) => (
    <Input type={type} placeholder={placeholder} onChange={(e) => onChange(e)} value={value} name={name} />
);

TextInput.defaultProps = {
    name: null,
    value: null,
};

export default TextInput;
