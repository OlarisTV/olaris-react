import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { placeholder } from 'polished';

export const SubmitLibrary = styled.button`
    font-size: 1.4rem;
    height: 4rem;
    cursor: pointer;
    border: 0;
    background: 0;
    border-radius: 0.2rem;
    padding: 0 1.8rem;
    color: #fff;
    pointer-events: ${(props) => (props.disabled ? 'none' : 'initial')};
    background: ${(props) =>
        props.disabled ? '#000' : props.theme.alerts.success};
    opacity: ${(props) => (props.disabled ? '.2' : 1)};
    transition: 0.2s background;
    font-weight: 600;
    float: right;

    &:hover {
        background: ${(props) =>
            props.disabled ? '#000' : props.theme.alerts.darken.success};
    }
`;

export const AddLibraryWrap = styled.article`
    float: left;
    width: 100%;
    position: relative;
    border-top: 1px solid rgba(0, 0, 0, 0.2);
    padding-top: 1rem;
`;

export const RcloneInput = styled.div`
    float: left;

    label {
        line-height: 4rem;
        color: #fff;
        font-size: 1.2rem;
        font-weight: 600;
        padding-left: 3.5rem;
        height: 4rem;
        display: block;
        position: relative;
        cursor: pointer;

        &:before {
            content: '';
            position: absolute;
            top: 1rem;
            left: 0rem;
            width: 2rem;
            height: 2rem;
            border: 1px solid rgba(0, 0, 0, 0.1);
            background: rgba(0, 0, 0, 0.2);
            border-radius: 0.2rem;
        }

        &:after {
            content: '✔';
            width: 2rem;
            height: 2rem;
            text-align: center;
            position: absolute;
            top: 1rem;
            left: 0rem;
            line-height: 2.1rem;
            opacity: 0.1;
            transition: 0.2s opacity;
            opacity: ${(props) => (props.rclone ? '1' : '0.1')};
        }

        &:hover {
            &:after {
                opacity: ${(props) => (props.rclone ? '1' : '0.5')};
            }
        }

        input {
            position: absolute;
            top: 50%;
            left: 0;
            visibility: hidden;
            opacity: 0;
            margin: 0;
            transform: translateY(-50%);
        }
    }
`;

export const AddLibraryInput = styled.input`
    padding: 0 6.5rem 0 1.5rem;
    line-height: 5rem;
    border-radius: 0.2rem;
    color: #737382;
    display: block;
    float: left;
    width: 100%;
    border: 0;
    transition: 0.2s;
    font-weight: 600;
    font-size: 1.5rem;
    background: rgba(0, 0, 0, 0.2);
    ${placeholder({ color: 'rgba(255,255,255,.1)' })}
    margin: 0 0 1rem;

    &:focus {
        outline: none;
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
