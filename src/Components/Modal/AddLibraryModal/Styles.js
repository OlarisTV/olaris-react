import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { placeholder } from 'polished';

export const SubmitLibrary = styled(FontAwesomeIcon)`
    font-size: 2rem;
    height: 5rem;
    cursor: pointer;
    border: 0;
    background: 0;
    position: absolute;
    right: 0;
    border-radius: 0 0.2rem 0.2rem 0;
    bottom: 0;
    width: 5rem !important;
    padding: 0 1.8rem;
    color: #fff;
    pointer-events: ${(props) => (props.disabled ? 'none' : 'initial')};
    background: ${(props) =>
        props.disabled ? '#000' : props.theme.alerts.success};
    opacity: ${(props) => (props.disabled ? '.2' : 1)};
`;

export const AddLibraryWrap = styled.article`
    float: left;
    width: 100%;
    position: relative;
`;

export const AddLibraryInput = styled.input`
    padding: 0 6.5rem 0 1.5rem;
    line-height: 5rem;
    background: #0000001c;
    border-radius: 0.2rem 0 0 0.2rem;
    color: #737382;
    display: block;
    float: left;
    width: calc(100% - 5rem);
    border: 0;
    transition: 0.2s;
    font-weight: 600;
    font-size: 1.5rem;

    ${placeholder({ color: 'rgba(255,255,255,.1)' })}

    &:focus {
        outline: none;
        background: rgba(0, 0, 0, 0.2);
        color: #fff;
    }
`;

export const LibraryItemWrap = styled.article`
    float: left;
    width: 100%;
    margin: 0 0 1rem;
    display: flex;
    position: relative;
    background: rgba(0, 0, 0, 0.2);
`;

export const LibraryItemFilePath = styled.span`
    padding: 1.3rem 1.5rem;
    line-height: 1.8;
    border-radius: 0.2rem;
    color: #737382;
    display: block;
    float: left;
    font-size: 1.4rem;
    font-weight: 600;
    flex: 1;
    max-width: calc(100% - 5rem);
    word-break: break-all;
    word-break: break-word;
`;

export const LibraryItemDelete = styled(FontAwesomeIcon)`
    position: absolute;
    top: 50%;
    right: 0;
    transform: translateY(-50%);
    float: right;
    color: ${(props) => props.theme.alerts.error};
    font-size: 2rem;
    height: 5rem;
    width: 5rem !important;
    cursor: pointer;
    padding: 1.65rem;
    opacity: 0.5;
    transition: 0.2s opacity;

    &:hover {
        opacity: 1;
    }
`;
