// @flow
import React from 'react';
import { connect } from 'react-redux';

import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { showModal, LIBRARY_MODAL } from 'Redux/Actions/modalActions';

import Importing from './ImportingData';
import * as S from './Styles';

type Link = {
    name: string,
    id: string,
    to: string,
};

type Props = {
    name: string,
    links: Array<Link>,
    loadModal: Function,
};

const NavItem = ({ name, links, loadModal }: Props) => {
    const onClick = (e, type) => {
        const linkDisabled = e.target.nodeName === 'svg' || e.target.nodeName === 'path';

        if (linkDisabled) {
            e.preventDefault();

            loadModal(LIBRARY_MODAL, {
                title: `Add ${type} folder`,
                type,
            });
        }
    };

    const LinkList = links.map((link) => {
        const types = ['movies', 'series'];

        if (types.indexOf(link.id) > -1) {
            return (
                <S.NavItemLink onClick={(e) => onClick(e, link.id)} to={link.to} key={link.id}>
                    <Importing kind={link.name === 'Movies' ? 0 : 1} />
                    {link.name}
                    <S.AddFolder id={`add-${link.id}`} icon={faPlus} />
                </S.NavItemLink>
            );
        }

        return (
            <S.NavItemLink to={link.to} key={link.id}>
                {link.name}
            </S.NavItemLink>
        );
    });

    return (
        <S.NavItemWrap>
            <S.NavItemHeading>{name}</S.NavItemHeading>
            {LinkList}
        </S.NavItemWrap>
    );
};

const mapDispatchToProps = (dispatch) => ({
    loadModal: (type, props) => dispatch(showModal(type, props)),
});

export default connect(
    null,
    mapDispatchToProps,
)(NavItem);
