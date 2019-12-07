// @flow
import React, { type Node } from 'react';
import { connect } from 'react-redux';
import Scroll from 'Components/Scroll';

import Content from './Styles';

type OwnProps = {
    children: Node,
};

type Props = {
    ...OwnProps,
    navHidden: boolean,
    isCasting: boolean,
};

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

export default connect<Props, OwnProps, _, _, _, _>(mapStateToProps, null)(ContentWrap);
