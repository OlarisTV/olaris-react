/* eslint react/jsx-props-no-spreading: ["off"] */
import React from 'react';
import { components } from 'react-select';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';

import * as S from '../Styles';

const DropdownIndicator = ({ props }) => {
    return (
        components.DropdownIndicator && (
            <components.DropdownIndicator {...props}>
                <S.DropdownIcon icon={faAngleDown} />
            </components.DropdownIndicator>
        )
    );
};

export default DropdownIndicator;
