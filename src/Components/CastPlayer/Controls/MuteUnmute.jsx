// @flow
import React from 'react';
import { PlayerIcon } from 'react-player-controls';

import { PlayerButtonSmall } from './Styles';

type Props = {
    isMuted?: boolean,
    muteUnmute: Function,
};

const MuteUnmute = ({ isMuted, muteUnmute }: Props) => (
    <PlayerButtonSmall type="button" onClick={() => muteUnmute()}>
        {isMuted ? (
            <PlayerIcon.SoundOff width={22} height={22} fill="#FFF" />
        ) : (
            <PlayerIcon.SoundOn width={22} height={22} fill="#FFF" />
        )}
    </PlayerButtonSmall>
);

MuteUnmute.defaultProps = {
    isMuted: false,
};

export default MuteUnmute;
