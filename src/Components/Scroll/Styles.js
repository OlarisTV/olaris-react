import React from 'react';

export const renderThumb = ({ style }) => {
    const thumbStyle = {
        background: '#191a28',
        borderRadius: '2px',
    };

    return <div style={{ ...style, ...thumbStyle }} />;
};

export const renderTrack = ({ style }) => {
    const trackStyle = {
        width: '1rem',
        right: '.5rem',
        top: '0',
        padding: '.5rem 0',
        height: '100%',
    };

    return <div style={{ ...style, ...trackStyle }} />;
};
