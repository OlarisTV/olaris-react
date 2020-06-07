import React from 'react';
import PropTypes from 'prop-types';

import MediaInfo from './MediaInfo';
import MediaFiles from './MediaFiles';
import MediaSubtitles from './MediaSubtitles';
import MediaAudio from './MediaAudio';

const Overview = ({ media, selectedFile, files, fileChange }) => {
    const { name, playState, overview, year, airDate } = media;

    return (
        <>
            <MediaInfo
                name={name}
                playState={playState}
                overview={overview}
                selectedFile={selectedFile}
                release={year || airDate}
            />
            <MediaFiles files={files} selectedFile={selectedFile} fileChange={fileChange} />
            <MediaSubtitles selectedFile={selectedFile} />
            <MediaAudio selectedFile={selectedFile} />
        </>
    );
};

Overview.propTypes = {
    media: PropTypes.shape({
        name: PropTypes.string.isRequired,
        overview: PropTypes.string.isRequired,
        year: PropTypes.string,
        airDate: PropTypes.string,
        playState: PropTypes.shape({
            finished: PropTypes.bool,
            playtime: PropTypes.number,
        }).isRequired,
    }).isRequired,
    files: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    selectedFile: PropTypes.shape({}).isRequired,
    fileChange: PropTypes.func.isRequired,
};

export default Overview;
