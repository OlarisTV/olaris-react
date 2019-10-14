import React from 'react';
import { compose } from 'lodash/fp';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import ReactToolTip from 'react-tooltip';
import PropTypes from 'prop-types';

import { showModal } from 'Redux/Actions/modalActions';

import PlayMedia from './PlayMedia';
import MarkWatched from './MarkWatched';
import RefreshMetadata from './RefreshMetadata';
import MediaMismatch from './MediaMismatch';

import { Header } from './Styles';

const MediaItemHeader = ({ name, type, uuid, playMedia, playState, isConnected, file }) => (
    <Header>
        <ReactToolTip effect="solid" place="bottom" className="tooltip" />

        <PlayMedia type={type} isConnected={isConnected} playMedia={playMedia} playState={playState} />
        <MarkWatched playState={playState} type={type} uuid={uuid} />
        <RefreshMetadata uuid={uuid} />
        {type === 'Movie' && <MediaMismatch name={name} type={type} file={file} />}
    </Header>
);

MediaItemHeader.propTypes = {
    uuid: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    playState: PropTypes.shape({
        finished: PropTypes.bool,
        playtime: PropTypes.number,
    }).isRequired,
    isConnected: PropTypes.bool.isRequired,
    type: PropTypes.string.isRequired,
    playMedia: PropTypes.func.isRequired,
    file: PropTypes.string,
};

MediaItemHeader.defaultProps = {
    file: null,
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
