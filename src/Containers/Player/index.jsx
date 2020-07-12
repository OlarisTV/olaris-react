// @flow
import React from 'react';
import { useSelector } from 'react-redux';

import useVideojs from './useVideoJs';
import videoJsOptions from './videoJsOptions';
import { streamData } from '../../Redux/components/player/selectors';

import * as S from './Styles';

const Player = () => {
    const { total, mimetype, source, uuid, type } = useSelector((state) => streamData(state));
    const player = useVideojs({ ...videoJsOptions, sources: [{ src: source, type: mimetype }] }, uuid, total, type);

    return <S.Player>{player}</S.Player>;
};

export default Player;
