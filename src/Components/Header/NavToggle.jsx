// @flow
import React, { Component } from 'react';

import { connect } from 'react-redux';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import { hideNavigation, showNavigation } from 'Redux/Actions/navigationActions';

import { NavButton, NavIcon, ContentOverlay, HideNavIcon } from './Styles';

type OwnProps = {
    navHidden: boolean,
    browser: Object,
    sNavigation: Function,
    hNavigation: Function,
};

type Props = {
    ...OwnProps,
};

class NavToggle extends Component<Props> {
    componentDidMount() {
        window.addEventListener('resize', this.responsiveTrigger.bind(this));
        this.responsiveTrigger();
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.responsiveTrigger.bind(this));
    }

    toggleNav = () => {
        const { sNavigation, hNavigation, navHidden } = this.props;

        if (navHidden) {
            sNavigation();
        } else {
            hNavigation();
        }
    };

    responsiveTrigger() {
        const { hNavigation, browser } = this.props;

        if (browser.lessThan.large) hNavigation();
    }

    render() {
        const { navHidden, browser } = this.props;

        return (
            <>
                {browser.lessThan.large && !navHidden && (
                    <ContentOverlay onClick={this.toggleNav}>
                        <HideNavIcon icon={faTimes} />
                    </ContentOverlay>
                )}

                <NavButton onClick={this.toggleNav} alignLeft>
                    <NavIcon icon={navHidden ? faBars : faTimes} />
                </NavButton>
            </>
        );
    }
}

const mapStateToProps = (state) => {
    const { navigation, browser } = state;
    return {
        navHidden: navigation.hidden,
        browser,
    };
};

const mapDispatchToProps = (dispatch) => ({
    hNavigation: () => dispatch(hideNavigation()),
    sNavigation: () => dispatch(showNavigation()),
});

export default connect<Props, OwnProps, _, _, _, _>(mapStateToProps, mapDispatchToProps)(NavToggle);
