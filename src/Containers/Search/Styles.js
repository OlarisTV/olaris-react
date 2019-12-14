import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const SearchWrap = styled.section`
    width: 100vw;
    height: 100%;
    position: fixed;
    background: ${(props) => props.theme.dark};
    z-index: 99;
`;

export const CloseIcon = styled(FontAwesomeIcon)`
    color: rgba(255, 255, 255, 0.5);
    font-size: 2rem;
    transition: 0.2s all;
`;

export const CloseButton = styled.button`
    background: none;
    border: none;
    transition: 0.2s background;
    width: ${(props) => props.theme.layout.header};
    height: ${(props) => props.theme.layout.header};

    &:hover {
        ${CloseIcon} {
            color: #fff;
        }
    }
`;
