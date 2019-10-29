import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

import { showModal, LIBRARY_MODAL } from 'Redux/Actions/modalActions';

import Importing from './ImportingData';
import { NavItemWrap, NavItemHeading, NavItemLink, AddFolder, SubNavItemLink } from './Styles';

class NavItem extends Component {
    handleClick = (e, type) => {
        const { loadModal } = this.props;
        const linkDisabled = e.target.nodeName === 'svg' || e.target.nodeName === 'path';

        if (linkDisabled) {
            e.preventDefault();

            loadModal(LIBRARY_MODAL, {
                title: `Add ${type} folder`,
                type,
            });
        }
    };

    render() {
        const { name, links } = this.props;

        const LinkList = links.map((link) => {
            const types = ['movies', 'series'];

            const SubNav = () => {
                if (link.submenu.length > 0) {
                    return link.submenu.map((item) => (
                        <SubNavItemLink exact onClick={(e) => this.handleClick(e, item.id)} to={item.to} key={item.id}>
                            {item.name}
                        </SubNavItemLink>
                    ));
                }

                return false;
            };

            if (types.indexOf(link.id) > -1) {
                return (
                    <>
                        <NavItemLink exact onClick={(e) => this.handleClick(e, link.id)} to={link.to} key={link.id}>
                            <Importing kind={link.name === 'Movies' ? 0 : 1} />
                            {link.name}

                            <AddFolder id={`add-${link.id}`} icon={faPlus}>
                                +
                            </AddFolder>
                        </NavItemLink>
                        <SubNav />
                    </>
                );
            }

            return (
                <NavItemLink to={link.to} key={link.id}>
                    {link.name}
                </NavItemLink>
            );
        });

        return (
            <NavItemWrap>
                <NavItemHeading>{name}</NavItemHeading>
                {LinkList}
            </NavItemWrap>
        );
    }
}

NavItem.propTypes = {
    name: PropTypes.string.isRequired,
    loadModal: PropTypes.func.isRequired,
    links: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
            id: PropTypes.string.isRequired,
            to: PropTypes.string.isRequired,
            submenu: PropTypes.arrayOf(),
        }),
    ).isRequired,
};

const mapDispatchToProps = (dispatch) => ({
    loadModal: (type, props) => dispatch(showModal(type, props)),
});

export default connect(
    null,
    mapDispatchToProps,
)(NavItem);
