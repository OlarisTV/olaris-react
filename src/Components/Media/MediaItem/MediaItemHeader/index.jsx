import React, { Component } from 'react';
import { compose } from 'lodash/fp';
import { graphql } from 'react-apollo';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import ReactToolTip from 'react-tooltip';
import PropTypes from 'prop-types';

import { showModal } from 'Redux/Actions/modalActions';

import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { Header, HeaderIconWrap, HeaderIcon } from './Styles';

class MediaItemHeader extends Component {
    playSeries = () => {};

    render() {
        const { type } = this.props;

        return (
            <Header>
                <ReactToolTip effect="solid" place="bottom" className="tooltip" />
                <HeaderIconWrap onClick={this.playSeries} data-tip={`Play ${type}`}>
                    <HeaderIcon icon={faPlay} />
                </HeaderIconWrap>
            </Header>
        );
    }
}

MediaItemHeader.propTypes = {
    type: PropTypes.string.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
    sModal: (type, props) => dispatch(showModal(type, props)),
});

export default compose(
    withRouter,
    connect(
        null,
        mapDispatchToProps,
    ),
)(MediaItemHeader);
