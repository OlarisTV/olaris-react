import {
    SET_AUTH_DATA,
    IS_CASTING,
    SET_VIDEO_DATA,
} from '../Actions/castActions';

const initialState = {
    isCasting: false,
    auth: {},
    metadata: {},
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
        case IS_CASTING:
            return {
                ...state,
                isCasting: payload.status,
            };
        case SET_VIDEO_DATA:
            return {
                ...state,
                metadata: {
                    ...payload.metadata,
                },
            };
        default:
            return state;
    }
};

export default cast;
