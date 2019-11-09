// @flow
import React, { type Node } from 'react';
import { connect } from 'react-redux';
import Scroll from 'Components/Scroll';

import Content from './Styles';

type Props = {
    children: Node,
    navHidden: boolean,
    isCasting: boolean,
}

const ContentWrap = ({ children, navHidden, isCasting }: Props) => (
    <Content navHidden={navHidden} isCasting={isCasting}>
        <Scroll navHidden={navHidden} id="content">
            {children}
        </Scroll>
    </Content>
);

const mapStateToProps = (state) => {
    const { navigation, cast } = state;

    return {
        navHidden: navigation.hidden,
        isCasting: cast.playing,
    };
};

export default connect(
    mapStateToProps,
    null,
)(ContentWrap);
