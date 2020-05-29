import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose, isEmpty } from 'lodash/fp';
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
import { MediaFullWrap, MediaLeftCol, MediaRightCol } from '../Styles';

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
            .then((res) => {
                this.setState({ streams: res.data.createStreamingTicket.streams });

                fetch(getBaseUrl() + res.data.createStreamingTicket.metadataPath)
                    .then((response) => response.json())
                    .then((response) => getVideoSource(isIOS, res.data, response))
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
        const {
            posterPath,
            season,
            type,
            wide,
            uuid,
            name,
            overview,
            isConnected,
            playState,
            airDate,
            year,
            files,
            dispatch,
        } = this.props;
        const { selectedFile, fileList, source, mimeType, resume, castsource, streams } = this.state;
        const background = isEmpty(season) ? posterPath : season.series.posterPath;

        const mediaInfo = {
            ...this.props,
        };

        return (
            <MediaFullWrap>
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
                            file={selectedFile}
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
                            release={year || airDate}
                        />
                    </MediaRightCol>
                </MediaFull>
                <VideoController
                    source={source}
                    files={files}
                    selectedFile={selectedFile}
                    resume={resume}
                    name={name}
                    overview={overview}
                    playState={playState}
                    type={type}
                    mimeType={mimeType}
                    uuid={uuid}
                    background={background}
                    castsource={castsource}
                    dispatch={dispatch}
                    season={season && season}
                    streams={streams}
                    closePlayer={() => this.closePlayer()}
                />
            </MediaFullWrap>
        );
    }
}

const requiredPropsCheck = (props, propName, componentName) => {
    const { year, airDate } = props;
    if (!year && !airDate) {
        return new Error(`One of 'year' or 'airDate' is required by '${componentName}' component.`);
    }

    return null;
};

MediaItem.propTypes = {
    name: PropTypes.string.isRequired,
    overview: PropTypes.string.isRequired,
    isConnected: PropTypes.bool.isRequired,
    posterPath: PropTypes.string,
    dispatch: PropTypes.func.isRequired,
    mutate: PropTypes.func.isRequired,
    wide: PropTypes.bool,
    year: requiredPropsCheck,
    airDate: requiredPropsCheck,
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
    resume: null,
    posterPath: null,
    isPlaying: null,
    wide: null,
    year: null,
    airDate: null,
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

export default compose(withRouter, graphql(REQUEST_STREAM), connect(mapStateToProps))(MediaItem);
