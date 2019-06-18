import { CONTENT_SCROLL, SIDEBAR_SCROLL } from '../Actions/viewportActions';

const initialState = {
    content: {
        top: 0,
        left: 0,
        clientWidth: 0,
        clientHeight: 0,
        scrollWidth: 0,
        scrollHeight: 0,
        scrollLeft: 0,
        scrollTop: 0,
    },
    sidebar: {
        top: 0,
        left: 0,
        clientWidth: 0,
        clientHeight: 0,
        scrollWidth: 0,
        scrollHeight: 0,
        scrollLeft: 0,
        scrollTop: 0,
    }
};

const viewport = (state = initialState, { payload, type }) => {
    switch (type) {
        case CONTENT_SCROLL:
            return {
                ...state,
                content: payload,
            };
        case SIDEBAR_SCROLL:
            return {
                ...state,
                sidebar: payload,
            };
        default:
            return state;
    }
};

export default viewport;
