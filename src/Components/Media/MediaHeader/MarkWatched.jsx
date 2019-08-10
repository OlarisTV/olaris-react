import React, { useState } from 'react';
import { graphql } from 'react-apollo';
import PropTypes from 'prop-types';

import { faCheckCircle as faCheckCircleSolid } from '@fortawesome/free-solid-svg-icons';
import { faCheckCircle } from '@fortawesome/free-regular-svg-icons';

import UPDATE_PLAYSTATE from 'Mutations/updatePlaystate';
import {
    updatePlayStateEpisode,
    updatePlayStateMovie,
} from 'Components/Media/Actions/updatePlayState';

import { HeaderIconWrap, HeaderIcon } from './Styles';

const MarkWatched = ({ playState, type, uuid, mutate }) => {
    const [watched, toggleWatched] = useState(playState.finished);

    const toggleWatchedState = () => {
        if (type === 'Episode') {
            updatePlayStateEpisode(mutate, uuid, 0, !playState.finished);
        } else {
            updatePlayStateMovie(mutate, uuid, 0, !playState.finished);
        }

        toggleWatched(!playState.finished);
    };

    return (
        <HeaderIconWrap
            onClick={() => toggleWatchedState()}
            data-tip={watched ? 'Mark As Unwatched' : 'Mark As Watched'}
        >
            <HeaderIcon icon={watched ? faCheckCircleSolid : faCheckCircle} />
        </HeaderIconWrap>
    );
};

MarkWatched.propTypes = {
    mutate: PropTypes.func.isRequired,
    playState: PropTypes.shape({
        finished: PropTypes.bool,
        playtime: PropTypes.number,
    }).isRequired,
    type: PropTypes.string.isRequired,
    uuid: PropTypes.string.isRequired,
};

export default graphql(UPDATE_PLAYSTATE)(MarkWatched);
