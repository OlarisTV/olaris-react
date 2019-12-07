import React from 'react';
import styled from 'styled-components';

export const SearchWrap = styled.form`
    position: relative;
    float: left;
    width: 100%;
`;

export const Button = styled.button`
    position: absolute;
    top: 0;
    right: 0;
    height: 5rem;
    border: none;
    padding: 0 1.5rem;
    background: #0c0d16;
    color: #fff;
    border-radius: 0.3rem 0 0 0.3rem;
    transition: 0.2s background;

    :hover {
        background: #0f1019;
    }

    :disabled {
        opacity: 0.8;
        color: rgba(255, 255, 255, 0.2);

        :hover {
            background: #191a2a;
        }
    }
`;

export const MediaList = styled.div`
    background: #ffffff08;
    border-radius: 0.3rem;
    padding: 0.5rem;

    button {
        color: #fff;
        font-size: 1.4rem;
        display: flex;
        line-height: 3.5rem;
        width: 100%;
        cursor: pointer;
        font-weight: 600;
        padding: 0 2rem 0 1rem;
        color: ${(props) => props.theme.primary};
        background: none;
        border: none;

        span {
            color: #fff;
            margin-left: auto;
        }

        &:hover {
            background: rgba(0, 0, 0, 0.15);
        }
    }
`;

export const renderThumb = ({ style }) => {
    const thumbStyle = {
        background: 'rgba(255,255,255,0.2)',
        borderRadius: '2px',
    };

    return <div style={{ ...style, ...thumbStyle }} />;
};

export const renderTrack = ({ style }) => {
    const trackStyle = {
        width: '0.5rem',
        right: '0.5rem',
        top: '0',
        padding: '0.25rem 0',
        height: '100%',
    };

    return <div style={{ ...style, ...trackStyle }} />;
};
