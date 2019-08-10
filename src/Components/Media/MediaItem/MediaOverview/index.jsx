import React, { Fragment } from 'react';

import MediaInfo from './MediaInfo';
import MediaFiles from './MediaFiles';
import MediaSubtitles from './MediaSubtitles';
import MediaAudio from './MediaAudio';

const MediaOverview = (props) => {
    const { mediaInfo, selectedFile, files, fileChange } = props;

    return (
        <Fragment>
            <MediaInfo {...mediaInfo} selectedFile={selectedFile} />
            <MediaFiles files={files} selectedFile={selectedFile} fileChange={fileChange} />
            <MediaSubtitles selectedFile={selectedFile} />
            <MediaAudio selectedFile={selectedFile} />
        </Fragment>
    );
};

export default MediaOverview;
