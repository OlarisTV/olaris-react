import { LOCATION_CHANGE } from 'connected-react-router';
import { SHOW_MODAL, HIDE_MODAL } from '../Actions/modalActions';

const initialState = {
    type: null,
    props: {}
};

const modal = (state = initialState, action) => {
    switch (action.type) {
        case SHOW_MODAL:
            return {
                ...state,
                type: action.payload.type,
                props: action.payload.props
            };
        case HIDE_MODAL:
            return initialState;
        case LOCATION_CHANGE:
            return initialState;
        default:
            return state;
    }
};

export default modal;
