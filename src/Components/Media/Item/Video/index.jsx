// @flow
import React from 'react';

import useVideoJs from './useVideoJs';
import videoJsOptions from './videoJsOptions';

import * as S from './Styles';

type Props = {
    source: string,
    mimetype: string,
    uuid: string,
    type: string,
    selectedFile: Object,
};

const Video = ({ source, mimetype, uuid, type, selectedFile }: Props) => {
    const player = useVideoJs(
        { ...videoJsOptions, sources: [{ src: source, type: mimetype }] },
        uuid,
        selectedFile.length,
        type,
    );

    return (
        <>
            <S.VideoWrap>{player}</S.VideoWrap>
        </>
    );
};

export default Video;
