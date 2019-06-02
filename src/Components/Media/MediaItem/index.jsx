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
import MediaDropdown from './MediaDropdown';
import MediaOverview from './MediaOverview';
import VideoController from './Video';

import { MediaFull } from './Styles';
import {
    MediaFullWrap,
    MediaLeftCol,
    MediaRightCol,
    MediaBackground,
} from '../Styles';

class MediaItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            source: '',
            resume: false,
            files: [],
            selectedFile: {},
            mimeType: '',
        };
    }

    componentWillMount() {
        const { files } = this.props;
        const fileList = generateFileList(files);

        this.setState({
            files: fileList,
            selectedFile: fileList[0],
        });
    }

    componentDidMount() {
        const { location } = this.props;
        const resume =
            location.state !== undefined ? location.state.resume : false;

        if (location.state && location.state.autoplay === true)
            this.playMedia(resume);
    }

    fileChange = (selectedFile) => this.setState({ selectedFile });

    closePlayer = () => {
        const { dispatch } = this.props;

        this.setState({ source: '' });
        dispatch(hideVideo());
    };

    playMedia = (resume) => {
        const { files, mutate } = this.props;
        const { selectedFile } = this.state;

        mutate({
            variables: { uuid: files[selectedFile.value].uuid },
        })
            .then(({ data }) => {
                fetch(getBaseUrl() + data.createStreamingTicket.metadataPath)
                    .then((response) => response.json())
                    .then((response) => getVideoSource(isIOS, data, response))
                    .then((response) => {
                        this.setState({
                            source: response.source,
                            mimeType: response.mimeType,
                            resume,
                        });
                    })
                    .catch((err) => err);
            })
            .catch((err) => err);
    };

    render() {
        const { posterPath, season, type, uuid, playState } = this.props;
        const { files, selectedFile } = this.state;
        const background = posterPath || season.series.posterPath;

        const mediaInfo = {
            ...this.props,
            playState,
        };

        return (
            <MediaFullWrap>
                <MediaBackground
                    bgimg={`${getBaseUrl()}/olaris/m/images/tmdb/w342/${background}`}
                />
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
                        <MediaDropdown uuid={uuid} />
                        <MediaOverview
                            mediaInfo={mediaInfo}
                            selectedFile={selectedFile}
                            files={files}
                            fileChange={this.fileChange}
                            playMedia={this.playMedia}
                        />
                    </MediaRightCol>
                </MediaFull>

                <VideoController
                    {...this.props}
                    {...this.state}
                    closePlayer={() => this.closePlayer()}
                />
            </MediaFullWrap>
        );
    }
}

export default compose(
    withRouter,
    graphql(REQUEST_STREAM),
    connect(),
)(MediaItem);
