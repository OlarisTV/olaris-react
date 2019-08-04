import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Scrollbars } from 'react-custom-scrollbars';

import { scrolled, CONTENT_SCROLL, SIDEBAR_SCROLL } from 'Redux/Actions/viewportActions';

import { throttle } from 'lodash';

const renderThumb = ({ style, ...props }) => {
    const thumbStyle = {
        background: '#191a28',
        borderRadius: '2px',
    };

    return <div style={{ ...style, ...thumbStyle }} {...props} />;
};

const renderTrack = ({ style, ...props }) => {
    const trackStyle = {
        width: '1rem',
        right: '.5rem',
        top: '0',
        padding: '.5rem 0',
        height: '100%',
    };

    return <div style={{ ...style, ...trackStyle }} {...props} />;
};

class Scroll extends Component {
    constructor(props) {
        super(props);

        this.handleScroll = throttle(this.handleScroll.bind(this), 50);
    }

    handleScroll(values) {
        const { id, scrollFinished } = this.props;

        let type;

        if (id === 'content') {
            type = CONTENT_SCROLL;
        } else if (id === 'sidebar') {
            type = SIDEBAR_SCROLL;
        }
        scrollFinished(type, values);
    }

    render() {
        const { children } = this.props;

        return (
            <Scrollbars
                autoHide
                autoHeightMin="100%"
                renderThumbVertical={renderThumb}
                renderTrackVertical={renderTrack}
                onScrollFrame={this.handleScroll}
            >
                {children}
            </Scrollbars>
        );
    }
}

Scroll.propTypes = {
    children: PropTypes.element.isRequired,
    id: PropTypes.string.isRequired,
    scrollFinished: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
    scrollFinished: (type, props) => dispatch(scrolled(type, props)),
});

export default connect(
    null,
    mapDispatchToProps,
)(Scroll);
