import {
    SET_AUTH_DATA,
    SET_VIDEO_DATA,
    CAST_CONNECTED,
    CAST_PLAYING,
    CAST_SET_PLAYSTATE,
    CLEAR_CAST_DATA,
} from '../Actions/castActions';

const initialState = {
    connected: false,
    playing: false,
    sending: false,
    auth: {},
    metadata: {},
    playstate: {
        paused: false,
        muted: false,
        playtime: 0,
        total: 0,
        volume: 1,
    },
};

const cast = (state = initialState, { payload, type }) => {
    switch (type) {
        case SET_AUTH_DATA:
            return {
                ...state,
                auth: {
                    data: payload.data,
                    token: payload.token,
                    baseUrl: payload.baseUrl,
                },
            };
        case CAST_CONNECTED:
            return {
                ...state,
                connected: payload.status,
            };
        case CAST_PLAYING:
            return {
                ...state,
                playing: payload.status,
                sending: false,
            };
        case CAST_SET_PLAYSTATE: {
            return {
                ...state,
                playstate: {
                    ...state.playstate,
                    ...payload.playstate,
                },
            };
        }
        case SET_VIDEO_DATA:
            return {
                ...state,
                metadata: {
                    ...payload.metadata,
                },
            };
        case CLEAR_CAST_DATA:
            return {
                ...state,
                playing: false,
                metadata: {},
                playstate: {},
            };
        default:
            return state;
    }
};

export default cast;
