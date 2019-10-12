import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'lodash/fp';
import { graphql } from 'react-apollo';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { isIOS } from 'react-device-detect';

import REQUEST_STREAM from 'Mutations/requestStream';
import { generateFileList, getBaseUrl } from 'Helpers';
import { hideVideo } from 'Redux/Actions/videoActions';

import Breadcrumbs from 'Components/Breadcrumbs';
import MediaCard from 'Components/Media/Card';
import getVideoSource from './Video/getVideoSource';
import MediaItemHeader from '../MediaHeader/MediaItemHeader';
import MediaOverview from './MediaOverview';
import VideoController from './Video';

import { MediaFull } from './Styles';
import { MediaFullWrap, MediaLeftCol, MediaRightCol, MediaBackground } from '../Styles';

class MediaItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            source: '',
            resume: false,
            autoplay: false,
            fileList: [],
            selectedFile: {},
            mimeType: '',
            castsource: '',
        };
    }

    componentWillMount() {
        const { files, location } = this.props;
        const { state } = location;
        const fileList = generateFileList(files);
        const resume = state !== undefined ? state.resume : false;
        const autoplay = state && state.autoplay ? state.autoplay : false;

        this.setState({
            resume,
            autoplay,
            fileList,
            selectedFile: fileList[0],
        });
    }

    componentDidMount() {
        const { autoplay, resume } = this.state;

        if (autoplay) this.playMedia(resume);

        this.setState({
            mounted: true,
        });
    }

    componentWillUnmount() {
        this.setState({
            mounted: false,
        });
    }

    fileChange = (selectedFile) => this.setState({ selectedFile });

    closePlayer = () => {
        const { mounted } = this.state;
        const { dispatch, isPlaying } = this.props;

        if (isPlaying && mounted) {
            this.setState({ source: '' });
            dispatch(hideVideo());
        }
    };

    playMedia = (resume) => {
        const { files, mutate, isConnected } = this.props;
        const { selectedFile } = this.state;

        mutate({
            variables: { uuid: files[selectedFile.value].uuid },
        })
            .then((data) => {
                fetch(getBaseUrl() + data.createStreamingTicket.metadataPath)
                    .then((response) => response.json())
                    .then((response) => getVideoSource(isIOS, data, response))
                    .then((response) => {
                        this.setState({
                            mimeType: response.mimeType,
                            resume,
                        });

                        if (isConnected) {
                            this.setState({ castsource: response.source });
                        } else {
                            this.setState({ source: response.source });
                        }
                    })
                    .catch((err) => err);
            })
            .catch((err) => err);
    };

    render() {
        const { posterPath, season, type, wide, uuid, name, isConnected, playState, files, dispatch } = this.props;
        const { selectedFile, fileList, source, mimeType, resume, castsource } = this.state;
        const background = posterPath || season.series.posterPath;

        const mediaInfo = {
            ...this.props,
        };

        return (
            <MediaFullWrap>
                <MediaBackground bgimg={`${getBaseUrl()}/olaris/m/images/tmdb/w342/${background}`} />
                <Breadcrumbs type={type} name={name} season={season} />
                <MediaFull>
                    <MediaLeftCol>
                        <MediaCard
                            wide={wide}
                            playMedia={this.playMedia}
                            internalCard
                            text
                            files={files}
                            name={name}
                            playState={playState}
                            posterPath={posterPath}
                            type={type}
                            uuid={uuid}
                        />
                    </MediaLeftCol>
                    <MediaRightCol>
                        <MediaItemHeader
                            type={type}
                            file={files[0].filePath}
                            uuid={uuid}
                            name={name}
                            playMedia={this.playMedia}
                            playState={playState}
                            isConnected={isConnected}
                        />
                        <MediaOverview
                            mediaInfo={mediaInfo}
                            selectedFile={selectedFile}
                            files={fileList}
                            fileChange={this.fileChange}
                            isConnected={isConnected}
                        />
                    </MediaRightCol>
                </MediaFull>
                <VideoController
                    source={source}
                    files={files}
                    selectedFile={selectedFile}
                    resume={resume}
                    playState={playState}
                    type={type}
                    mimeType={mimeType}
                    uuid={uuid}
                    background={background}
                    castsource={castsource}
                    dispatch={dispatch}
                    closePlayer={() => this.closePlayer()}
                />
            </MediaFullWrap>
        );
    }
}

MediaItem.propTypes = {
    name: PropTypes.string.isRequired,
    isConnected: PropTypes.bool.isRequired,
    posterPath: PropTypes.string,
    dispatch: PropTypes.func.isRequired,
    mutate: PropTypes.func.isRequired,
    wide: PropTypes.bool,
    files: PropTypes.arrayOf(
        PropTypes.shape({
            fileName: PropTypes.string,
            filePath: PropTypes.string,
        }),
    ).isRequired,
    season: PropTypes.shape({
        series: PropTypes.shape({
            posterPath: PropTypes.string,
        }),
    }),
    location: PropTypes.shape({
        state: PropTypes.shape({
            autoplay: PropTypes.bool,
            resume: PropTypes.bool,
        }),
    }),
    uuid: PropTypes.string.isRequired,
    resume: PropTypes.bool,
    isPlaying: PropTypes.bool,
    playState: PropTypes.shape({}).isRequired,
    type: PropTypes.string.isRequired,
};

MediaItem.defaultProps = {
    resume: false,
    posterPath: false,
    isPlaying: false,
    wide: false,
    season: {},
    location: {},
};

const mapStateToProps = (state) => {
    const { video, cast } = state;

    return {
        isPlaying: video.playing,
        isConnected: cast.connected,
    };
};

export default compose(
    withRouter,
    graphql(REQUEST_STREAM),
    connect(mapStateToProps),
)(MediaItem);
