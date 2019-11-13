export const SET_AUTH_DATA = 'SET_AUTH_TOKEN';
export const SET_VIDEO_DATA = 'SET_VIDEO_DATA';
export const CAST_CONNECTED = 'CAST_CONNECTED';
export const CAST_PLAYING = 'CAST_PLAYING';
export const CAST_SET_PLAYSTATE = 'CAST_SET_PLAYSTATE';
export const CLEAR_CAST_DATA = 'CLEAR_CAST_DATA';

export const setCastStatus = (status) => ({
    type: CAST_CONNECTED,
    payload: {
        status,
    },
});

export const setCastPlayingStatus = (status) => ({
    type: CAST_PLAYING,
    payload: {
        status,
    },
});

export const setAuthData = ({ data, token, baseUrl }) => ({
    type: SET_AUTH_DATA,
    payload: {
        data,
        token,
        baseUrl,
    },
});

export const setSourceData = (metadata) => ({
    type: SET_VIDEO_DATA,
    payload: {
        metadata,
    },
});

export const setCastPlaystate = (playstate) => ({
    type: CAST_SET_PLAYSTATE,
    payload: {
        playstate,
    },
});

export const clearCastData = () => ({
    type: CLEAR_CAST_DATA,
});
