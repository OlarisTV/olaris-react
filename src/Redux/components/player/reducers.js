import { createReducer } from '@reduxjs/toolkit';

import { play, close, createStream, createStreamSuccess, createStreamFailed } from './actions';
import { getStreamData } from './helpers';

const initialState = {
    loading: false,
    error: false,
    play: false,
    stream: null,
    playFrom: null,
    source: null,
    mimetype: null,
    type: null,
    selectedFile: null,
    uuid: null,
};

const playerReducer = createReducer(initialState, {
    [createStream]: (state, { payload: { stream, playFrom, type, selectedFile, uuid } }) => {
        return {
            ...state,
            loading: true,
            error: false,
            uuid,
            stream,
            playFrom,
            type,
            selectedFile,
        };
    },
    [createStreamSuccess]: (state, { payload }) => {
        return {
            ...state,
            ...getStreamData(state.stream, payload),
            loading: false,
        };
    },
    [createStreamFailed]: (state) => {
        return {
            ...state,
            loading: false,
            error: true,
        };
    },
    [play]: (state) => {
        return {
            ...state,
            play: true,
        };
    },
    [close]: (state) => {
        return {
            ...state,
            play: false,
        };
    },
});

export default playerReducer;
