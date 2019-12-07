// @flow
import React from 'react';

import { faRedo } from '@fortawesome/free-solid-svg-icons';
import { PlayerButtonSmall, PlayerIcon } from './Styles';

type Props = {
    seek: Function,
    playstate?: Object<{ playtime: number }>,
};

const ForwardThirty = ({ seek, playstate }: Props) => (
    <PlayerButtonSmall type="button" onClick={() => seek(playstate.playtime + 30)}>
        <PlayerIcon icon={faRedo} />
    </PlayerButtonSmall>
);

ForwardThirty.defaultProps = {
    playstate: {
        playtime: 0,
    },
};

export default ForwardThirty;
