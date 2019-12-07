// @flow
import React from 'react';

import { faUndo } from '@fortawesome/free-solid-svg-icons';
import { PlayerButtonSmall, PlayerIcon } from './Styles';

type Props = {
    seek: Function,
    playstate?: Object<{ playtime: number }>,
};

const BackThirty = ({ seek, playstate }: Props) => (
    <PlayerButtonSmall type="button" onClick={() => seek(playstate.playtime - 30)}>
        <PlayerIcon icon={faUndo} />
    </PlayerButtonSmall>
);

BackThirty.defaultProps = {
    playstate: {
        playtime: 0,
    },
};

export default BackThirty;
