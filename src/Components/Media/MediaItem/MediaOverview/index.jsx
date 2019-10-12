import React from 'react';
import PropTypes from 'prop-types';

import MediaInfo from './MediaInfo';
import MediaFiles from './MediaFiles';
import MediaSubtitles from './MediaSubtitles';
import MediaAudio from './MediaAudio';

const MediaOverview = (props) => {
    const { mediaInfo, selectedFile, files, fileChange } = props;
    const { name, year, airDate, playState, overview } = mediaInfo;

    return (
        <>
            <MediaInfo
                name={name}
                year={year}
                airDate={airDate}
                playState={playState}
                overview={overview}
                selectedFile={selectedFile}
            />
            <MediaFiles files={files} selectedFile={selectedFile} fileChange={fileChange} />
            <MediaSubtitles selectedFile={selectedFile} />
            <MediaAudio selectedFile={selectedFile} />
        </>
    );
};

const requiredPropsCheck = (props, propName, componentName) => {
    const { year, airDate } = props;
    if (!year && !airDate) {
        return new Error(`One of 'year' or 'airDate' is required by '${componentName}' component.`);
    }

    return null;
};

MediaOverview.propTypes = {
    mediaInfo: PropTypes.shape({
        name: PropTypes.string.isRequired,
        overview: PropTypes.string.isRequired,
        year: requiredPropsCheck,
        airDate: requiredPropsCheck,
        playState: PropTypes.shape({
            finished: PropTypes.bool,
            playtime: PropTypes.number,
        }).isRequired,
    }).isRequired,
    files: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    selectedFile: PropTypes.shape({}).isRequired,
    fileChange: PropTypes.func.isRequired,
};

export default MediaOverview;
