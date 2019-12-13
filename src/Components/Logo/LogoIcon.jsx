// @flow
import React from 'react';

import Icon from 'Images/logo-icon.svg';

type Props = {
    alt?: string,
    height?: string,
};

const LogoIcon = ({ alt, height }: Props) => <img src={Icon} alt={alt} height={`${height}px`} />;

LogoIcon.defaultProps = {
    alt: 'Olaris',
    height: '150',
};

export default LogoIcon;
