// @flow
import React from 'react';
import { PlayerIcon } from 'react-player-controls';

import { PlayerButton } from './Styles';

type Props = {
    isPaused: boolean,
    playPause: Function,
};

const PlayPause = ({ isPaused, playPause }: Props) => (
    <PlayerButton type="button" onClick={() => playPause()}>
        {isPaused ? (
            <PlayerIcon.Play width={22} height={22} fill="#FFF" />
        ) : (
            <PlayerIcon.Pause width={22} height={22} fill="#FFF" />
        )}
    </PlayerButton>
);

export default PlayPause;
