// @flow
import React from 'react';
import Select from 'react-select';

import DropdownIndicator from './DropdownIndicator';

import * as S from './Styles';

type Props = {
    placeholder?: string,
    searchable?: boolean,
    onChange: Function,
    name?: string,
    menuPlacement?: string,
    value?: ?Object<{ label: string }>,
    options: Array<{ label: string }>,
};

const SingleSelect = ({ searchable, onChange, options, value, placeholder, name, menuPlacement }: Props) => {
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

SingleSelect.defaultProps = {
    searchable: false,
    value: null,
    placeholder: null,
    name: '',
    menuPlacement: 'bottom',
};

export default SingleSelect;
