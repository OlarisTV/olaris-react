// @flow
import React, { type Node } from 'react';
import Slider from 'react-slick';
import { forceCheck } from 'react-lazyload';
import sliderSettings from './settings';

import { ArrowPrev, ArrowNext } from './Arrows';

type Props = {
    children: Node,
};

const Carousel = ({ children }: Props) => (
    <Slider
        infinite={false}
        speed="500"
        slidesToShow="6"
        slidesToScroll="1"
        nextArrow={<ArrowNext />}
        prevArrow={<ArrowPrev />}
        afterChange={() => forceCheck()}
        responsive={sliderSettings}
    >
        {children}
    </Slider>
);

export default Carousel;
