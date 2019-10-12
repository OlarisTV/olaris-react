import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';

import DropdownIndicator from './DropdownIndicator';

import * as S from './Styles';

const SingleSelect = ({ searchable, onChange, options, value, placeholder, name, menuPlacement }) => {
    return (
        <Select
            placeholder={placeholder}
            value={value}
            options={options}
            onChange={onChange}
            components={{ DropdownIndicator }}
            styles={S.SelectStyle}
            name={name}
            isSearchable={searchable}
            menuPlacement={menuPlacement}
        />
    );
};

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
    menuPlacement: PropTypes.string,
    value: allowNull(
        PropTypes.shape({
            label: PropTypes.string,
        }),
    ),
    options: PropTypes.arrayOf(
        PropTypes.shape({
            label: PropTypes.string.isRequired,
        }),
    ).isRequired,
};

SingleSelect.defaultProps = {
    searchable: false,
    value: null,
    placeholder: null,
    name: '',
    menuPlacement: 'bottom',
};

export default SingleSelect;
