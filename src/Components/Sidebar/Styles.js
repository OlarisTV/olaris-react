import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

export const SidebarWrap = styled.nav`
    width: ${props => props.theme.layout.sidebar};
    position: fixed;
    top: ${props => props.theme.layout.header};
    left: 0;
    height: calc(100vh - ${props => props.theme.layout.header});
    background-image: linear-gradient(to bottom, rgba(0,0,0, .3) 0%, rgba(0,0,0, .2) 100%);
    z-index:2;
`;

export const HomeLink = styled(NavLink)`
    width: 6rem;
    height:6rem;
    padding:1.5rem;
    align-self: center;
    margin: auto;
`;

export const NavItemWrap = styled.section`
  float:left;
  width:100%;
  margin:0 0 3rem;
  padding:0 3rem;
  &:first-of-type {
    margin-top: 4rem;
  }
`;

export const NavItemHeading = styled.h5`
    font-size:1rem;
    letter-spacing:.2rem;
    font-weight:800;
    margin:0 0 1.5rem;
    text-transform:uppercase;
    color: ${props => props.theme.secondary};
    opacity: .25;
`;

export const NavItemLink = styled(NavLink)`
    font-size:1.4rem;
    letter-spacing: .1rem;
    line-height: 1.5;
    font-weight:400;
    margin:0 0 1rem;
    color: ${props => props.theme.light};
    opacity:.6;
    float:left;
    width:100%;
    transition:.2s all;

    &.active {
      opacity:1;
      color: ${props => props.theme.primary};
    }

    &:hover {
        opacity: 1;
    }
`;
