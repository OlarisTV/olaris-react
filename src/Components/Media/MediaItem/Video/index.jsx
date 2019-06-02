/* eslint-disable */
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

import { setSourceData } from 'Redux/Actions/castActions';
import { canPlayCodec } from 'Helpers';

import Player from './Player';

import { VideoWrap, CloseVideo } from '../Styles';

class VideoController extends Component {
    componentDidMount() {
        const { isCasting } = this.props;

        if (!isCasting)
            document.addEventListener('keydown', this.escapeClose, false);
    }

    componentWillUnmount() {
        document.removeEventListener('keydown', this.escapeClose, false);
    }

    checkCastState = () => {
        if (typeof cast !== 'undefined') {
            const context = cast.framework.CastContext.getInstance();
            if (context.getCastState() === 'CONNECTED') return true;
        }

        return;
    };

    escapeClose = (e) => e.key === 'Escape' && this.props.closePlayer();

    render() {
        const {
            source,
            mimeType,
            files,
            name,
            selectedFile,
            resume,
            playState,
            uuid,
            type,
            closePlayer,
            isCasting,
            dispatch,
            auth,
        } = this.props;

        const videoCodec = files[selectedFile.value].streams
            .filter((s) => s.streamType === 'video')
            .map((s) => s.codecMime)[0];

        const videoSource = {
            src: source,
            type: mimeType,
        };
        const transmuxed = canPlayCodec(videoCodec);

        if (this.checkCastState() && source.length !== 0) {
            const sourceData = {
                source,
                name,
                playState,
            };

            dispatch(setSourceData(sourceData));

            const onSuccess = () => console.log('success');
            const onFailure = () => console.log('failure');
            const namespace = 'urn:x-cast:com.auth';
            const message = { ...auth, uuid };
            const mediaInfo = new chrome.cast.media.MediaInfo(
                videoSource.src,
                videoSource.type,
            );
            const request = new chrome.cast.media.LoadRequest(mediaInfo);
            request.currentTime = playState.playtime;

            function onMediaDiscovered(mediaSession) {
                console.log(
                    'new media session ID:' + mediaSession.mediaSessionId,
                );
            }

            function onMediaError(e) {
                console.log('media error');
            }

            const castSession = cast.framework.CastContext.getInstance().getCurrentSession();

            // Send Media Data & Auth
            castSession.sendMessage(namespace, message, onSuccess, onFailure);
            castSession.loadMedia(
                request,
                onMediaDiscovered.bind(this, 'loadMedia'),
                onMediaError,
            );

            return null;
        }

        if (source.length !== 0) {
            return (
                <Fragment>
                    <VideoWrap>
                        <CloseVideo icon={faTimes} onClick={closePlayer} />
                        <Player
                            source={videoSource}
                            transmuxed={transmuxed}
                            resume={resume}
                            playState={playState}
                            uuid={uuid}
                            length={selectedFile.totalDuration}
                            type={type}
                            dispatch={dispatch}
                        />
                    </VideoWrap>
                </Fragment>
            );
        } else {
            return null;
        }
    }
}

VideoController.propTypes = {
    dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
    const { cast } = state;

    return {
        isCasting: cast.isCasting,
        auth: cast.auth,
    };
};

export default connect(mapStateToProps)(VideoController);
