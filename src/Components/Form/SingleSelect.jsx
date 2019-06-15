import React from 'react';
import PropTypes from 'prop-types';
import Select, { components } from 'react-select';

import { faAngleDown } from '@fortawesome/free-solid-svg-icons';

import { DropdownIcon, SelectStyle } from './Styles';

const DropdownIndicator = (props) => {
    return (
        components.DropdownIndicator && (
            <components.DropdownIndicator {...props}>
                <DropdownIcon icon={faAngleDown} />
            </components.DropdownIndicator>
        )
    );
};

const SingleSelect = ({
    searchable,
    onChange,
    options,
    value,
    placeholder,
    name,
}) => (
    <Select
        placeholder={placeholder}
        value={value}
        options={options}
        onChange={onChange}
        components={{ DropdownIndicator }}
        styles={SelectStyle}
        name={name}
        isSearchable={searchable}
    />
);

const allowNull = (wrappedPropTypes) => {
    return (props, propName, ...rest) => {
        if (props[propName] === null) return null;
        return wrappedPropTypes(props, propName, ...rest);
    };
};

SingleSelect.propTypes = {
    placeholder: PropTypes.string,
    searchable: PropTypes.bool,
    onChange: PropTypes.func.isRequired,
    name: PropTypes.string,
    value: allowNull(
        PropTypes.shape({
            value: PropTypes.string,
            label: PropTypes.string,
        }),
    ),
    options: PropTypes.arrayOf(
        PropTypes.shape({
            value: PropTypes.string.isRequired,
            label: PropTypes.string.isRequired,
        }),
    ).isRequired,
};

SingleSelect.defaultProps = {
    searchable: false,
    value: null,
    placeholder: null,
    name: '',
};

export default SingleSelect;
