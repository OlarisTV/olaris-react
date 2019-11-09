// @flow
import React from 'react';
import { connect } from 'react-redux';

import LogoIcon from 'Components/Logo/LogoIcon';
import Scroll from 'Components/Scroll';
import Navigation from './Navigation';

import * as S from './Styles';

type Props = {
    navHidden: boolean,
    videoOpen: boolean,
    castPlaying: boolean,
};

const Sidebar = ({ navHidden, videoOpen, castPlaying }: Props) => (
    <S.SidebarWrap navHidden={navHidden} videoOpen={videoOpen} castPlaying={castPlaying}>
        <Scroll id="sidebar">
            <>
                <S.DashboardLink to="/">
                    <LogoIcon height="30" />
                </S.DashboardLink>
                <Navigation />
            </>
        </Scroll>
    </S.SidebarWrap>
);

const mapStateToProps = (state) => ({
    navHidden: state.navigation.hidden,
    videoOpen: state.video.playing,
    castPlaying: state.cast.playing,
});

export default connect(
    mapStateToProps,
    null,
)(Sidebar);
