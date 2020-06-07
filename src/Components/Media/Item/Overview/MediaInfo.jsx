import React from 'react';
import PropTypes from 'prop-types';

import { convertToMinutes } from 'Helpers';

import { faExclamation } from '@fortawesome/free-solid-svg-icons';

import MediaDescription from './MediaDescription';
import { MediaInfoWrap, MediaDetails, LibraryUnhealthy } from './Styles';
import { MediaName, MediaRelease } from '../../Styles';

const MediaInfo = (props) => {
    const { name, release, playState, selectedFile, overview } = props;

    const renderPlayState = () => {
        let renderedState;

        if (playState.finished) {
            renderedState = 'Watched';
        } else if (playState.playtime < 60 && playState.playtime > 0) {
            renderedState = '< 1 minute watched';
        } else if (!playState.finished && playState.playtime > 0) {
            renderedState = `${convertToMinutes(playState.playtime)} watched`;
        } else {
            renderedState = 'Unwatched';
        }

        return renderedState;
    };

    const renderResolution = () => {
        const stream = selectedFile.streams.find((f) => f.resolution);
        if (!stream) return 'Unknown Resolution';

        const { resolution } = stream;

        return resolution;
    };

    const renderTotalD = () => {
        if (!selectedFile.totalDuration > 0) return 'Unknown Length';

        return convertToMinutes(selectedFile.totalDuration);
    };

    const renderHealth = () => {
        if (!selectedFile.healthy) {
            return (
                <li className="warning" data-tip="This file is on an unhealthy library, playback may be broken.">
                    <LibraryUnhealthy icon={faExclamation} />
                    Warning
                </li>
            );
        }

        return false;
    };

    return (
        <MediaInfoWrap>
            <MediaName>
                {name}
                <MediaRelease>{release}</MediaRelease>
            </MediaName>

            <MediaDetails unwatched={playState.finished}>
                {renderHealth()}
                <li>{renderTotalD()}</li>
                <li>{renderPlayState()}</li>
                <li>{selectedFile.streams && renderResolution()}</li>
            </MediaDetails>
            <MediaDescription overview={overview} />
        </MediaInfoWrap>
    );
};

MediaInfo.propTypes = {
    name: PropTypes.string.isRequired,
    overview: PropTypes.string.isRequired,
    release: PropTypes.string.isRequired,
    playState: PropTypes.shape({
        finished: PropTypes.bool,
        playtime: PropTypes.number,
    }).isRequired,
    selectedFile: PropTypes.shape({
        totalDuration: PropTypes.number,
        healthy: PropTypes.bool,
        streams: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    }).isRequired,
};

export default MediaInfo;
