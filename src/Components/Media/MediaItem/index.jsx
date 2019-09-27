import React, { Component } from 'react';
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
            castsource: '',
            resume: false,
            autoplay: false,
            fileList: [],
            selectedFile: {},
            streams: [],
            mimeType: '',
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
            .then(({ data }) => {
                const { streams } = data.createStreamingTicket;
                this.setState({ streams });

                return data;
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
        const { posterPath, season, type, uuid, name, isConnected, playState, files } = this.props;
        const { selectedFile, fileList } = this.state;
        const background = posterPath || season.series.posterPath;

        const mediaInfo = {
            ...this.props,
        };

        return (
            <MediaFullWrap>
                <MediaBackground bgimg={`${getBaseUrl()}/olaris/m/images/tmdb/w342/${background}`} />
                <Breadcrumbs props={this.props} />
                <MediaFull>
                    <MediaLeftCol>
                        <MediaCard
                            size={type === 'Episode' ? 'largeWide' : 'large'}
                            playMedia={this.playMedia}
                            internalCard
                            text
                            {...mediaInfo}
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
                    {...this.props}
                    {...this.state}
                    background={background}
                    closePlayer={() => this.closePlayer()}
                />
            </MediaFullWrap>
        );
    }
}

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
