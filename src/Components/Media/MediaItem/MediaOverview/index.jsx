import React from 'react';
import PropTypes from 'prop-types';

import MediaInfo from './MediaInfo';
import MediaFiles from './MediaFiles';
import MediaSubtitles from './MediaSubtitles';
import MediaAudio from './MediaAudio';

// MediaOverview.PropTypes = {
//     mediaInfo: ,
//     selectedFile: ,
//     files: ,
//     fileChange: ,
// };

const MediaOverview = (props) => {
    const { mediaInfo, selectedFile, files, fileChange } = props;

    return (
        <>
            <MediaInfo {...mediaInfo} selectedFile={selectedFile} />
            <MediaFiles files={files} selectedFile={selectedFile} fileChange={fileChange} />
            <MediaSubtitles selectedFile={selectedFile} />
            <MediaAudio selectedFile={selectedFile} />
        </>
    );
};

export default MediaOverview;
