import styled from 'styled-components';
import { aFadeIn } from 'Styles/Animations';
import { media } from 'Styles/Utils';

const Content = styled.div`
    flex: 1 1 auto;
    max-width: calc(100% + ${(props) => props.theme.layout.sidebar});
    max-height: calc(100% - ${(props) => (props.isCasting ? `${props.theme.layout.playerMobile} + 1rem` : '0')});
    float: left;
    animation: 0.5s ${aFadeIn} alternate;
    margin: 0 0 0 ${(props) => (!props.navHidden ? `${props.theme.layout.sidebar}` : '0')};
    width: 100%;
    height: 100%;
    transition: 0.2s all;

    ${media.tablet`
        max-height: calc(100% - ${(props) => (props.isCasting ? props.theme.layout.player : '0')});
    `}

    ${media.desktop`
        width: calc(100% - ${(props) => (!props.navHidden ? `${props.theme.layout.sidebar} + 0.1rem` : '0')});
        padding: 0;
    `}
`;

export default Content;
