import { LOCATION_CHANGE } from 'connected-react-router';
import { TOGGLE_SEARCH } from '../Actions/searchActions';

const initialState = {
    open: false,
};

const search = (state = initialState, action) => {
    switch (action.type) {
        case TOGGLE_SEARCH:
            return {
                ...state,
                open: action.payload.open,
            };
        case LOCATION_CHANGE:
            return initialState;
        default:
            return state;
    }
};

export default search;
