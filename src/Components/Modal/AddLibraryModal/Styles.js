import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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
    background: ${(props) => props.disabled ? '#000' : props.theme.alerts.success};
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

export const LibraryItemWrap = styled.article`
    float: left;
    width: 100%;
    margin: 0 0 1rem;
    display: flex;
    position: relative;
    background: rgba(0, 0, 0, 0.2);
`;

export const LibraryUnhealthy = styled(FontAwesomeIcon)`
    color: ${(props) => props.theme.alerts.error};
    font-size: 1.2rem;
    height: 4.5rem;
    float: left;
    margin-right: 1.5rem;
    min-width: 2.5rem;
    cursor: pointer;
    padding: 1.6rem 0;
    margin: 0 0 0 -1rem;
`;

export const LibraryItemFilePath = styled.span`
    line-height: 1.8;
    border-radius: 0.2rem;
    color: #737382;
    display: block;
    float: left;
    font-size: 1.2rem;
    font-weight: 600;
    flex: 1;
    max-width: calc(100% - 5rem);
    line-height: 4.5rem;
    padding: 0 1.5rem;

    p {
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
    }

    span {
        float: left;
        padding: 0 1.5rem;
        transform: translateX(-1.5rem);
        color: #fff;
        background: rgba(0, 0, 0, 0.1);
        border-radius: 0.2rem 0 0.2rem 0;
        border-right: 1px solid rgba(0, 0, 0, 0.3);
        text-transform: capitalize;
        max-width: 15rem;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-size: 1.2rem;
    }
`;

export const LibraryItemDelete = styled(FontAwesomeIcon)`
    position: absolute;
    top: 0;
    right: 0;
    float: right;
    color: ${(props) => (props.deleting ? props.theme.alerts.info : props.theme.alerts.error)};
    font-size: 2rem;
    height: 4.5rem;
    width: 4.5rem !important;
    cursor: pointer;
    padding: 1.5rem;
    opacity: ${(props) => (props.deleting ? 1 : 0.5)};
    transition: 0.2s opacity;

    &:hover {
        opacity: 1;
    }
`;
