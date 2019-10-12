import styled, { css } from 'styled-components';
import { aFadeIn, aFadeOut } from 'Styles/Animations';
import { media } from 'Styles/Utils';

const fadeIn = () => css`
    .5s ${aFadeIn} alternate;
`;

const fadeOut = () => css`
    .25s ${aFadeOut} forwards;
`;

export const UserFormWrap = styled.section`
    display: flex;
    width: 100%;
    margin: 0 auto;
    height: 100vh;
    align-self: center;
    flex-direction: column;
    background: #fff;
    animation: ${(props) => (props.success ? fadeOut : fadeIn)};

    ${media.tablet`
        background:none;
        height:auto;
        max-width: 50rem;
    `};
`;
