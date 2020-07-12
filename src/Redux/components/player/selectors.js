import { createSelector } from '@reduxjs/toolkit';

export const getStream = (state) => state.player.stream;
export const playerState = (state) => state.player.play;

export const streamData = createSelector(
    (state) => state.player,
    ({ total, mimetype, source, uuid, type }) => {
        return {
            total,
            mimetype,
            source,
            uuid,
            type,
        };
    },
);
