// @flow
import React, { useRef, type Node } from 'react';
import { connect } from 'react-redux';
import { throttle } from 'lodash';
import Scrollbars from 'react-custom-scrollbars';

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

const Scroll = ({ id, scrollFinished, children }: Props) => {
    const handleScroll = (values: Object) => {
        let type;

        if (id === 'content') {
            type = CONTENT_SCROLL;
        } else if (id === 'sidebar') {
            type = SIDEBAR_SCROLL;
        }

        scrollFinished(type, values);
    };

    const throttledScroll = useRef(throttle((values) => handleScroll(values), 100)).current;

    return (
        <Scrollbars
            autoHide
            autoHeightMin="100%"
            renderThumbVertical={S.renderThumb}
            renderTrackVertical={S.renderTrack}
            onScrollFrame={throttledScroll}
        >
            {children}
        </Scrollbars>
    );
};

const mapDispatchToProps = (dispatch) => ({
    scrollFinished: (type, props) => dispatch(scrolled(type, props)),
});

export default connect<Props, OwnProps, _, _, _, _>(null, mapDispatchToProps)(Scroll);
