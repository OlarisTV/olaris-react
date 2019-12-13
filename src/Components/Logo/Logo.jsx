// @flow
import React from 'react';

import Icon from 'Images/full-logo.svg';

type Props = {
    alt?: string,
    height?: string,
}

const Logo = ({ alt, height }: Props) => <img src={Icon} alt={alt} height={`${height}px`} />;

Logo.defaultProps = {
    alt: 'Olaris',
    height: '150',
};

export default Logo;
