import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const UserListItem = styled.li`
    width: 100%;
    padding: 0 0 0 2rem;
    line-height: 4rem;
    color: #fff;
    font-size: 1.4rem;
    font-weight: 600;
    background: ${(props) => (props.success ? props.theme.alerts.success : '#222332')};
    text-align: ${(props) => (props.success ? 'center' : 'left')};

    &:last-child {
        border: 0;
    }
`;

export const AdminUser = styled(FontAwesomeIcon)`
    font-size: 1rem;
    color: ${(props) => props.theme.primary};
    margin-left: 0.5rem;
    transform: translateY(-0.2rem);
`;

export const DeleteUser = styled(FontAwesomeIcon)`
    font-size: 1.4rem;
    color: ${(props) => props.theme.alerts.error};
    cursor: pointer;
    float: right;
    transition: 0.2s all;
    height: 4rem;
    opacity: 0.6;
    padding: 1.4rem;
    width: 4rem !important;

    &:hover {
        opacity: 1;
    }
`;

export const CopyInvite = styled(FontAwesomeIcon)`
    font-size: 1.4rem;
    color: #666;
    cursor: pointer;
    float: right;
    transition: 0.2s all;
    height: 4rem;
    opacity: 0.5;
    padding: 1.4rem;
    width: 4rem !important;

    &:hover {
        opacity: 1;
    }
`;

export const GenerateInvite = styled.button`
    font-size: 1.4rem;
    color: #fff;
    cursor: pointer;
    float: right;
    transition: 0.2s all;
    line-height: 5rem;
    opacity: 1;
    padding: 0 2.5rem;
    float: left;
    border: none;
    border-radius: 4rem;
    background: ${(props) => props.theme.background};
    transition: 0.2s all;
    font-weight: 600;

    :disabled {
        pointer-events: none;
        opacity: 0.2;
    }

    :hover {
        background: ${(props) => props.theme.darken.background};
    }
`;
