// @flow
import React from 'react';

import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';

import { NextArrow, PrevArrow } from './Styles';

type Props = {
    onClick?: Function,
    className?: string,
};

export const ArrowNext = ({ onClick, className }: Props) => (
    <NextArrow className={className} icon={faAngleRight} onClick={onClick} />
);

export const ArrowPrev = ({ onClick, className }: Props) => (
    <PrevArrow className={className} icon={faAngleLeft} onClick={onClick} />
);

const DefaultProps = {
    onClick: null,
    className: '',
};

ArrowNext.defaultProps = DefaultProps;
ArrowPrev.defaultProps = DefaultProps;
