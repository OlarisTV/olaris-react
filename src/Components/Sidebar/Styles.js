import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { transparentize } from 'polished';

export const SidebarWrap = styled.nav`
    width: ${(props) => props.theme.layout.sidebar};
    position: fixed;
    top: 0;
    left: 0;
    height: ${(props) => (props.castPlaying ? `calc(100vh - ${props.theme.layout.player})` : '100vh')};
    background: ${(props) => props.theme.sidebar && transparentize(0.5, props.theme.sidebar)};
    transition: 0.2s transform;
    transform: translateX(${(props) => (props.navHidden ? `-${props.theme.layout.sidebar}` : '0')});
    z-index: ${(props) => (props.videoOpen ? 4 : 5)};
`;

export const HomeLink = styled(NavLink)`
    width: 5rem;
    height: 5rem;
    padding: 1.5rem;
    align-self: center;
    margin: auto;
`;

export const NavItemWrap = styled.section`
    float: left;
    width: 100%;
    margin: 0 0 4rem;
    padding: 0 3rem 0 0;
    &:first-of-type {
        margin-top: 5rem;
    }
`;

export const NavItemHeading = styled.h5`
    font-size: 1rem;
    letter-spacing: 0.2rem;
    font-weight: 800;
    margin: 0 0 1.5rem;
    text-transform: uppercase;
    color: ${(props) => props.theme.secondary};
    opacity: 0.25;
    padding-left: 3rem;
`;

export const AddFolder = styled(FontAwesomeIcon)`
    position: absolute;
    top: 0;
    right: 0;
    font-size: 1.6rem;
    color: #fff;
    opacity: 0;
    width: 3rem !important;
    height: 3rem;
    transition: 0.2s all;
    padding: 0.9rem;
    border-radius: 3rem 0 0 3rem;
    background: ${(props) => props.theme.dark};
    transform: translateX(-0.5rem);
`;

export const DashboardLink = styled(NavLink)`
    float: left;
    padding: 1rem 2rem 0 0;
    margin: 3rem 3rem 0;
    position: relative;
`;

export const NavItemLink = styled(NavLink)`
    font-size: 1.4rem;
    letter-spacing: 0.1rem;
    line-height: 3rem;
    font-weight: 500;
    margin: 0;
    color: ${(props) => props.theme.light};
    opacity: 0.6;
    float: left;
    width: 100%;
    transition: 0.2s all;
    position: relative;
    overflow: hidden;
    padding-left: 3rem;
    border-radius: 0 3rem 3rem 0;

    &.active {
        opacity: 1;
        color: ${(props) => props.theme.primary};
    }

    &:hover {
        opacity: 1;
        background: rgba(0, 0, 0, 0.1);

        ${AddFolder} {
            opacity: 0.4;
            transform: translateX(0);
            background: rgba(0, 0, 0, 0.3);

            &:hover {
                opacity: 1;
            }
        }
    }
`;

export const SubNavItemLink = styled(NavLink)`
    font-size: 1.2rem;
    letter-spacing: 0.1rem;
    line-height: 2.6rem;
    font-weight: 500;
    margin: 0;
    color: ${(props) => props.theme.light};
    opacity: 0.6;
    float: left;
    width: 100%;
    transition: 0.2s all;
    position: relative;
    overflow: hidden;
    padding-left: 4.5rem;
    border-radius: 0 3rem 3rem 0;

    &.active {
        opacity: 1;
        color: ${(props) => props.theme.primary};
    }

    &:hover {
        opacity: 1;
        background: rgba(0, 0, 0, 0.1);

        ${AddFolder} {
            opacity: 0.4;
            transform: translateX(0);
            background: rgba(0, 0, 0, 0.3);

            &:hover {
                opacity: 1;
            }
        }
    }
`;

export const LoadingWrap = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 3rem;
    height: 3rem;
    align-items: center;
    justify-content: center;
    display: flex;

    svg {
        top: 50%;
        left: 50%;
        position: absolute;
        margin: -0.5rem;
    }
`;
