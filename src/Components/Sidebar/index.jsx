import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import LogoIcon from 'Components/Logo/LogoIcon';
import Scroll from 'Components/Scroll';
import Navigation from './Navigation';

import { SidebarWrap, DashboardLink } from './Styles';

const Sidebar = (props) => {
    const { navHidden, videoOpen, castPlaying } = props;

    return (
        <SidebarWrap navHidden={navHidden} videoOpen={videoOpen} castPlaying={castPlaying}>
            <Scroll id="sidebar">
                <>
                    <DashboardLink to="/">
                        <LogoIcon height="30" />
                    </DashboardLink>

                    <Navigation />
                </>
            </Scroll>
        </SidebarWrap>
    );
};

const mapStateToProps = (state) => ({
    navHidden: state.navigation.hidden,
    videoOpen: state.video.playing,
    castPlaying: state.cast.playing,
});

Sidebar.propTypes = {
    navHidden: PropTypes.bool.isRequired,
    videoOpen: PropTypes.bool.isRequired,
    castPlaying: PropTypes.bool.isRequired,
};

export default connect(
    mapStateToProps,
    null,
)(Sidebar);
