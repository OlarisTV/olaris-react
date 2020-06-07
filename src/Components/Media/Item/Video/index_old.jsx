import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

import { canPlayCodec } from 'Helpers';
import CastVideo from './CastVideo';

import useVideoJs from './useVideoJs';

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
            mimetype,
            uuid,
            closePlayer,
            dispatch,
            isCasting,
            media,
        } = this.props;

        const videoCodec = files[selectedFile.value].streams
            .filter((s) => s.streamType === 'video')
            .map((s) => s.codecMime)[0];
        const transmuxed = canPlayCodec(videoCodec);

        if (source && !isCasting) {
            const player = useVideoJS({ sources: [{ src: source, type: mimetype }] });

            return (
                <>
                    <S.VideoWrap>
                        <S.CloseVideo icon={faTimes} onClick={closePlayer} />
                        {player}
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
    files: PropTypes.arrayOf(
        PropTypes.shape({
            fileName: PropTypes.string,
        }),
    ).isRequired,
    selectedFile: PropTypes.shape({
        totalDuration: PropTypes.number,
        value: PropTypes.number,
    }).isRequired,
    media: PropTypes.shape({
        type: PropTypes.string.isRequired,
        playState: PropTypes.shape({}).isRequired,
    }).isRequired,
    uuid: PropTypes.string.isRequired,
    auth: PropTypes.shape({}).isRequired,
    resume: PropTypes.bool,
    mimetype: PropTypes.string,
};

Video.defaultProps = {
    resume: false,
    mimetype: null,
    source: null,
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
