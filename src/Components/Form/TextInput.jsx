import React from 'react';
import PropTypes from 'prop-types';

import { Input } from './Styles';

const TextInput = ({ placeholder, onChange, value, name, type }) => (
    <Input
        type={type}
        placeholder={placeholder}
        onChange={(e) => onChange(e)}
        value={value}
        name={name}
    />
);

TextInput.propTypes = {
    value: PropTypes.string,
    placeholder: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    name: PropTypes.string,
    onChange: PropTypes.func.isRequired,
};

TextInput.defaultProps = {
    name: null,
    value: null,
};

export default TextInput;
