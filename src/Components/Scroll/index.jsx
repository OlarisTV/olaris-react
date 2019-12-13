// @flow
import React, { useRef, type Node } from 'react';
import { connect } from 'react-redux';
import { throttle } from 'lodash';
import ScrollBars from 'react-custom-scrollbars';

import { scrolled, CONTENT_SCROLL, SIDEBAR_SCROLL } from 'Redux/Actions/viewportActions';

import * as S from './Styles';

type OwnProps = {
    children: Node,
    id: string,
};

type Props = {
    ...OwnProps,
    scrollFinished: Function,
};

const Scroll = ({ children, id, scrollFinished }: Props) => {
    const handleScroll = (values) => {
        let type;

        if (id === 'content') {
            type = CONTENT_SCROLL;
        } else if (id === 'sidebar') {
            type = SIDEBAR_SCROLL;
        }
        scrollFinished(type, values);
    };

    return (
        <ScrollBars
            autoHide
            autoHeightMin="100%"
            renderThumbVertical={S.renderThumb}
            renderTrackVertical={S.renderTrack}
            onScrollFrame={useRef(throttle((values) => handleScroll(values), 100)).current}
        >
            {children}
        </ScrollBars>
    );
}

const mapDispatchToProps = (dispatch) => ({
    scrollFinished: (type, props) => dispatch(scrolled(type, props)),
});

export default connect<Props, OwnProps, *, *, *, *>(null, mapDispatchToProps)(Scroll);
