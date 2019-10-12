import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

import { canPlayCodec } from 'Helpers';
import { setCastSendingStatus } from 'Redux/Actions/castActions';
import CastVideo from './CastVideo';

import Player from './Player';

import { VideoWrap, CloseVideo } from '../Styles';

class VideoController extends Component {
    constructor() {
        super();

        this.state = {
            message: {},
        };
    }

    componentDidMount() {
        document.addEventListener('keydown', this.escapeClose, false);

        this.setCastData();
    }

    componentDidUpdate() {
        const { castsource, mimeType, isCasting, setSendingStatus } = this.props;

        if (castsource.length > 0 && isCasting) {
            setSendingStatus(true);
            this.castMedia(castsource, mimeType);
        }
    }

    componentWillUnmount() {
        document.removeEventListener('keydown', this.escapeClose, false);
    }

    escapeClose = (e) => {
        const { closePlayer } = this.props;

        if (e.key === 'Escape') closePlayer();
    };

    setCastData = () => {
        const { uuid, auth } = this.props;

        const message = { ...auth, uuid };

        this.setState({
            message,
        });
    };

    castMedia = (source, mimeType) => {
        const { message } = this.state;

        const data = {
            ...this.props,
            message,
            source,
            mimeType,
        };

        CastVideo(data).catch(() => false);
    };

    render() {
        const {
            source,
            files,
            selectedFile,
            resume,
            playState,
            type,
            mimeType,
            uuid,
            closePlayer,
            dispatch,
            isCasting,
        } = this.props;

        const videoCodec = files[selectedFile.value].streams
            .filter((s) => s.streamType === 'video')
            .map((s) => s.codecMime)[0];
        const transmuxed = canPlayCodec(videoCodec);

        if (source.length > 0 && !isCasting) {
            return (
                <>
                    <VideoWrap>
                        <CloseVideo icon={faTimes} onClick={closePlayer} />
                        <Player
                            source={source}
                            mimeType={mimeType}
                            transmuxed={transmuxed}
                            resume={resume}
                            playState={playState}
                            uuid={uuid}
                            length={selectedFile.totalDuration}
                            type={type}
                            dispatch={dispatch}
                        />
                    </VideoWrap>
                </>
            );
        }

        return null;
    }
}

VideoController.propTypes = {
    setSendingStatus: PropTypes.func.isRequired,
    dispatch: PropTypes.func.isRequired,
    isCasting: PropTypes.bool.isRequired,
    closePlayer: PropTypes.func.isRequired,
    source: PropTypes.string.isRequired,
    castsource: PropTypes.string.isRequired,
    files: PropTypes.arrayOf(
        PropTypes.shape({
            fileName: PropTypes.string,
        }),
    ).isRequired,
    selectedFile: PropTypes.shape({
        totalDuration: PropTypes.number,
        value: PropTypes.number,
    }).isRequired,
    uuid: PropTypes.string.isRequired,
    auth: PropTypes.shape({}).isRequired,
    resume: PropTypes.bool,
    playState: PropTypes.shape({}).isRequired,
    type: PropTypes.string.isRequired,
    mimeType: PropTypes.string.isRequired,
};

VideoController.defaultProps = {
    resume: false,
};

const mapStateToProps = (state) => {
    const { cast } = state;

    return {
        auth: cast.auth,
        isCasting: cast.connected,
    };
};

const mapDispatchToProps = (dispatch) => ({
    setSendingStatus: (status) => dispatch(setCastSendingStatus(status)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(VideoController);
