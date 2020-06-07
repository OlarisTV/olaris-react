import styled from 'styled-components';

import { media } from 'Styles/Utils';

export const Wrap = styled.section`
    float: left;
    width: 100%;
    padding: 3rem 2.5rem;
    position: relative;
    display: flex;
    z-index: 4;
    flex-wrap: wrap;

    ${media.desktop`
        padding: 5rem 3.5rem;
    `}

    ${media.large`
        padding: 5rem;
    `}
`;

export const Item = styled.article`
    width: 100%;
    float: left;
    position: relative;
    z-index: 5;
    display: flex;
`;

export const LeftCol = styled.div`
    width: 25%;
    min-width: 20rem;
    max-width: 25rem;
    margin-right: 3rem;
    display: none;

    ${media.tablet`
        display:flex;
    `}
`;

export const RightCol = styled.div`
    flex: 1;
    position: relative;
    display: flex;
    flex-direction: column;
`;
