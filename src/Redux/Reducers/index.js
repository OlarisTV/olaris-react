import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { createResponsiveStateReducer } from 'redux-responsive';

import player from '../components/player';
import modal from './modalReducer';
import navigation from './navigationReducer';
import historyLocation from './historyReducer';
import video from './videoReducer';
import library from './libraryReducer';
import cast from './castReducer';
import viewport from './viewportReducer';

const responsiveBreakpoints = {
    extraSmall: 500,
    small: 768,
    medium: 1023,
    large: 1280,
};

export default (history) =>
    combineReducers({
        router: connectRouter(history),
        browser: createResponsiveStateReducer(responsiveBreakpoints, {
            extraFields: () => ({
                width: window.innerWidth,
                height: window.innerHeight,
            }),
        }),
        player,
        modal,
        navigation,
        historyLocation,
        video,
        library,
        cast,
        viewport,
    });
