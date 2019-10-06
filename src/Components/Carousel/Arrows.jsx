import React from 'react';
import PropTypes from 'prop-types';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { NextArrow, PrevArrow } from './Styles';

export const ArrowNext = ({ onClick, className }) => {
    return <NextArrow className={className} icon={faAngleRight} onClick={onClick} />;
};

export const ArrowPrev = ({ onClick, className }) => {
    return <PrevArrow className={className} icon={faAngleLeft} onClick={onClick} />;
};

ArrowNext.propTypes = {
    onClick: PropTypes.func,
    className: PropTypes.string,
};

ArrowNext.defaultProps = {
    onClick: null,
    className: null,
};

ArrowPrev.propTypes = {
    onClick: PropTypes.func,
    className: PropTypes.string,
};

ArrowPrev.defaultProps = {
    onClick: null,
    className: null,
};
