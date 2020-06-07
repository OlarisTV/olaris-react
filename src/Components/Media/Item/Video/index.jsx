import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

import { canPlayCodec } from 'Helpers';

import CastVideo from './CastVideo';
import Player from './Player';

import * as S from './Styles';

class Video extends Component {
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
        const { source, mimetype, isCasting } = this.props;

        if (source && isCasting) {
            this.castMedia(source, mimetype);
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

    castMedia = (source, mimetype) => {
        const { message } = this.state;
        const data = {
            ...this.props,
            message,
            source,
            mimetype,
        };

        CastVideo(data).catch(() => false);
    };

    render() {
        const { source, selectedFile, resume, mimetype, uuid, closePlayer, dispatch, isCasting, media } = this.props;
        const { playState, type } = media;

        const videoCodec = selectedFile.streams.filter((s) => s.streamType === 'video').map((s) => s.codecMime)[0];
        const transmuxed = canPlayCodec(videoCodec);

        if (source && !isCasting) {
            console.log(mimetype);

            return (
                <>
                    <S.VideoWrap>
                        <S.CloseVideo icon={faTimes} onClick={closePlayer} />
                        <Player
                            source={source}
                            mimetype={mimetype}
                            transmuxed={transmuxed}
                            resume={resume}
                            playState={playState}
                            uuid={uuid}
                            length={selectedFile.totalDuration}
                            type={type}
                            dispatch={dispatch}
                        />
                    </S.VideoWrap>
                </>
            );
        }

        return null;
    }
}

Video.propTypes = {
    dispatch: PropTypes.func.isRequired,
    isCasting: PropTypes.bool.isRequired,
    closePlayer: PropTypes.func.isRequired,
    source: PropTypes.string,
    selectedFile: PropTypes.shape({
        totalDuration: PropTypes.number,
        value: PropTypes.number,
        streams: PropTypes.arrayOf(
            PropTypes.shape({
                streamType: PropTypes.string,
            }),
        ).isRequired,
    }).isRequired,
    media: PropTypes.shape({
        playState: PropTypes.shape({}).isRequired,
        type: PropTypes.string.isRequired,
    }).isRequired,
    uuid: PropTypes.string.isRequired,
    auth: PropTypes.shape({}).isRequired,
    resume: PropTypes.bool,
    mimetype: PropTypes.string,
};

Video.defaultProps = {
    resume: false,
    source: null,
    mimetype: null,
};

const mapStateToProps = (state) => {
    const { cast } = state;

    return {
        auth: cast.auth,
        isCasting: cast.connected,
        isSending: cast.sending,
    };
};

export default connect(mapStateToProps, null)(Video);
