// @flow
import React from 'react';

import { faStop } from '@fortawesome/free-solid-svg-icons';

import { PlayerButtonSmall, PlayerIcon } from './Styles';

type Props = {
    stop: Function,
}

const Stop = ({ stop }: Props) => (
    <PlayerButtonSmall type="button" onClick={() => stop()}>
        <PlayerIcon icon={faStop} />
    </PlayerButtonSmall>
);

export default Stop;
