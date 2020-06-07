import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { aFadeIn } from 'Styles/Animations';

export const CloseVideo = styled(FontAwesomeIcon)`
    position: absolute;
    top: 0;
    right: 0.5rem;
    color: #fff;
    font-size: 1.6rem;
    cursor: pointer;
    z-index: 11;
    transition: 0.2s all;
    opacity: 0.9;
    width: 5rem !important;
    height: 5rem;
    padding: 1.5rem;

    &:hover {
        opacity: 1;
    }
`;

export const VideoWrap = styled.article`
    position: fixed;
    padding: 0;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 999;
    background: #00000090;
    width: 100%;
    animation: 0.4s ${aFadeIn} alternate;
`;
