import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const Header = styled.header`
    display: flex;
    width: 100%;
    margin: 0 0 3rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
`;

export const HeaderIconWrap = styled.div`
    width: 6rem;
    height: 6rem;
    text-align: center;
    border-right: 1px solid rgba(255, 255, 255, 0.05);
    position: relative;
    opacity: ${(props) => (props.disabled ? '0.5' : '1')};
    cursor: ${(props) => (props.disabled ? 'initial' : 'pointer')};

    &:nth-child(4) {
        margin-left: auto;
    }

    &:last-child {
        border-right: 0;
    }

    &:hover {
        svg {
            opacity: 1;
            color: ${(props) => (props.disabled ? '#FFF' : props.theme.primary)};
        }
    }
`;

export const HeaderIcon = styled(FontAwesomeIcon)`
    display: inline-block;
    opacity: 0.8;
    color: #fff;
    height: 6rem;
    text-align: center;
    transition: 0.2s all;
`;