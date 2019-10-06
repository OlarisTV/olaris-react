import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { InputWrap, TextInput } from '../Styles';

const Input = ({ type, name, placeholder, handleChange, uniqueCode, autocomplete, value, required }) => {
    const [focused, setFocus] = useState(false);

    return (
        <InputWrap isFocused={focused} uniqueCode={uniqueCode}>
            <TextInput
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
        </InputWrap>
    );
};

Input.propTypes = {
    type: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    value: PropTypes.string,
    required: PropTypes.bool,
    placeholder: PropTypes.string.isRequired,
    handleChange: PropTypes.func.isRequired,
    uniqueCode: PropTypes.bool,
    autocomplete: PropTypes.string.isRequired,
};

Input.defaultProps = {
    uniqueCode: false,
    required: false,
    value: '',
};

export default Input;
