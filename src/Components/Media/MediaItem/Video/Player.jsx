import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { throttle } from 'lodash';
import { graphql } from 'react-apollo';
import videojs from 'video.js';
import '@videojs/http-streaming';
import './DebugOverlay';

// NOTE(Leon Handreke): Ideally this should be imported from videojs-http-source-selector because
// the fact that it relies on this plugin is an implementation detail. However, the compilation
// setup for that plugin is a bit wonky, so it's easier to just do the plugin registration here.
import 'videojs-contrib-quality-levels';
import 'videojs-http-source-selector';

import UPDATE_PLAYSTATE from 'Mutations/updatePlaystate';
import { showVideo } from 'Redux/Actions/videoActions';
import { updatePlayStateEpisode, updatePlayStateMovie } from 'Components/Media/Actions/updatePlayState';

class Player extends Component {
    t = throttle(() => this.playStateMutation(Math.floor(this.player.currentTime())), 2000);

    componentDidMount() {
        const { resume, playState, source, mimeType, transmuxed, dispatch } = this.props;

        const videoSource = {
            src: source,
            type: mimeType,
        };

        dispatch(showVideo());

        // Put videojs in scope for debugging
        this.videojs = videojs;

        videojs.log.level('debug');
        // NOTE(Leon Handreke): This is an ugly hack because otherwise our SourceBuffer becomes full
        // with very large videos and starts throwing errors. Ideally, video.js would properly
        // handle this case and reduce its buffer by itself. See
        // https://github.com/videojs/http-streaming/issues/192
        videojs.Hls.GOAL_BUFFER_LENGTH = 30;
        videojs.Hls.MAX_GOAL_BUFFER_LENGTH = 30;

        const videoJsOptions = {
            sources: [videoSource],
            autoplay: true,
            techOrder: ['html5'],
            plugins: {
                httpSourceSelector: {
                    showAutoItem: true,
                },
            },
            controls: true,
            controlBar: {
                volumePanel: {
                    inline: false
                }
            },
            userActions: {
                hotkeys: true
            },
            html5: {
                hls: {
                    enableLowInitialPlaylist: true,
                    smoothQualityChange: true,
                },
                nativeAudioTracks: false,
            },
        };
        if (transmuxed) {
            // If transmuxed, all non-transmuxed representations are manually disabled in the
            // loadedmetadata handler to disable adaptive bitrate switching.
            videoJsOptions.plugins.httpSourceSelector.showAutoItem = false;
            videoJsOptions.html5.hls.enableLowInitialPlaylist = false;
            // Choose the transmuxed (= highest-bandwidth) version initially.
            videoJsOptions.html5.hls.bandwidth = 1e12;
        }
        this.player = videojs(this.videoNode, videoJsOptions, function onPlayerReady() {
            this.focus();
            this.debugOverlay();
            this.qualityLevels();
            this.httpSourceSelector();
        });

        this.player.on('timeupdate', () => {
            this.t();
        });

        this.player.on('loadedmetadata', this.enableQualityLevels);

        if (resume) {
            this.player.currentTime(playState.playtime);
        } else {
            this.player.currentTime(0);
        }

        window.player = this.player;
    }

    componentWillUnmount() {
        this.t.cancel();

        if (this.player) {
            this.player.dispose();
        }
    }

    playStateMutation = (playtime) => {
        const { uuid, length, mutate, type } = this.props;
        const finished = playtime * (100 / length) > 98;

        if (type === 'Episode') {
            updatePlayStateEpisode(mutate, uuid, playtime, finished);
        } else {
            updatePlayStateMovie(mutate, uuid, playtime, finished);
        }
    };

    enableQualityLevels = () => {
        const { transmuxed } = this.props;
        if (transmuxed) {
            for (let i = 1; i < this.player.qualityLevels().length; i += 1) {
                this.player.qualityLevels()[i].enabled = false;
            }
            // On iOS, qualityLevels is empty.
            if (this.player.qualityLevels().length > 0) {
                // TODO(Leon Handreke): This relies on transmuxed always being first in the playlist. See
                // comment below for more background on this hack.
                this.player.qualityLevels()[0].enabled = true;
            }
        }
    };

    render() {
        return (
            <>
                <div data-vjs-player>
                    {/* eslint-disable-next-line */}
                    <video
                        ref={(node) => {
                            this.videoNode = node;
                        }}
                        className="video-js vjs-theme-olaris"
                    />
                </div>
            </>
        );
    }
}

Player.propTypes = {
    // Video source, opaque as it gets passed directly to video.js
    // TODO(Leon Handreke): It should not be opaque to us, our caller should
    // not need to know about video.js
    // eslint-disable-next-line
    source: PropTypes.string.isRequired,
    dispatch: PropTypes.func.isRequired,
    uuid: PropTypes.string.isRequired,
    length: PropTypes.number.isRequired,
    mutate: PropTypes.func.isRequired,
    type: PropTypes.string.isRequired,
    mimeType: PropTypes.string.isRequired,
    playState: PropTypes.shape({
        finished: PropTypes.bool,
        playtime: PropTypes.number,
    }).isRequired,
    resume: PropTypes.bool,
    // TODO(Leon Handreke): This is an ugly hack. We'd like to change our
    // quality switching behavior based on whether the stream is transmuxed or not.
    // However, we don't have a way to detect this from this.player.representations()
    // because videojs/http-streaming doesn't pass through any metadata.
    // To avoid forking for now, do this.
    transmuxed: PropTypes.bool.isRequired,
};

Player.defaultProps = {
    resume: false,
};

export default graphql(UPDATE_PLAYSTATE)(Player);
