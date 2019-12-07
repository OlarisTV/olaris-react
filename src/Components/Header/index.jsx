// @flow
import React, { Component } from 'react';
import { compose } from 'lodash/fp';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

import type { HashHistory } from 'history/createHashHistory';

import Logout from './Logout';
import NavToggle from './NavToggle';
import Search from './Search';

import { HeaderWrap, BackButton, BackIcon } from './Styles';

type OwnProps = {
    history: HashHistory,
};

type Props = {
    ...OwnProps,
    previousLocation: string,
    currentLocation: string,
};

type State = {
    value: string,
};

class Header extends Component<Props, State> {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
        };
    }

    updateSearch = (value) => {
        this.setState({
            value,
        });
    };

    render() {
        const { value } = this.state;
        const { history, previousLocation, currentLocation } = this.props;

        return (
            <HeaderWrap>
                <NavToggle />
                {previousLocation !== null && currentLocation !== '/dashboard' && (
                    <BackButton onClick={() => history.goBack()}>
                        <BackIcon icon={faArrowLeft} />
                    </BackButton>
                )}
                <Search value={value} updateSearch={this.updateSearch} />

                <div className="right-menu">
                    <google-cast-launcher />
                    <Logout />
                </div>
            </HeaderWrap>
        );
    }
}

const mapStateToProps = (state) => {
    const { historyLocation } = state;

    return {
        previousLocation: historyLocation.previousLocation,
        currentLocation: historyLocation.currentLocation,
    };
};

export default compose(
    withRouter,
    connect<Props, OwnProps, _, _, _, _>(mapStateToProps, null)
)(Header);
