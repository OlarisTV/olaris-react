/* eslint-disable jsx-a11y/media-has-caption */
// @flow
import React, { useLayoutEffect, useRef } from 'react';
import { useMutation } from '@apollo/react-hooks';
import videojs from 'video.js';
import qualitySelector from 'videojs-hls-quality-selector';
import contribQualityLevels from 'videojs-contrib-quality-levels';

import UPDATE_PLAYSTATE from 'Mutations/updatePlaystate';
import FETCH_EPISODE from 'Queries/fetchEpisode';
import FETCH_MOVIE from 'Queries/fetchMovie';

const useVideoJs = (videoJsOptions, uuid, length, type) => {
    const videoNode = useRef(null);
    const key = videoJsOptions.sources[0].src;
    const query = type === 'Episode' ? FETCH_EPISODE : FETCH_MOVIE;

    const [updatePlayState] = useMutation(UPDATE_PLAYSTATE, {
        update(cache, { data: { createPlayState } }) {
            const data = cache.readQuery({
                query,
                variables: { uuid },
            });

            const media = type === 'Episode' ? data.episode : data.movies[0];

            cache.writeQuery({
                query,
                variables: { uuid },
                data: {
                    [type.toLowerCase()]: {
                        ...media,
                        playState: {
                            ...media.playState,
                            ...createPlayState.playState,
                        },
                    },
                },
            });
        },
    });

    const playStateMutation = (playtime) => {
        const finished = playtime * (100 / length) > 98;
        const data = { variables: { uuid, playtime: !finished ? playtime : 0, finished } };

        return updatePlayState(data);
    };

    useLayoutEffect(() => {
        videojs.registerPlugin('qualityLevels', contribQualityLevels);
        videojs.registerPlugin('hlsQualitySelector', qualitySelector);

        const player = videojs(videoNode.current, videoJsOptions, () => {
            player.hlsQualitySelector({ displayCurrentQuality: true });
        });

        const playStateInterval = setInterval(() => {
            playStateMutation(Math.floor(player.currentTime()));
        }, 2000);

        return () => {
            clearInterval(playStateInterval);
            player.dispose();
        };
    }, [uuid]);

    return (
        <div>
            <div data-vjs-player key={key}>
                <video ref={videoNode} className="video-js" />
            </div>
        </div>
    );
};

export default useVideoJs;
