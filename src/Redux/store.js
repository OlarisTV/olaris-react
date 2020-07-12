import { all } from 'redux-saga/effects';
import { applyMiddleware, compose, createStore } from 'redux';
import { createHashHistory } from 'history';
import createSagaMiddleware from 'redux-saga';
import { responsiveStoreEnhancer } from 'redux-responsive';
import { routerMiddleware } from 'connected-react-router';

import rootReducer from './Reducers';
import { watchCreateStream } from './components/player/sagas';

const sagaMiddleware = createSagaMiddleware();

function* rootSaga() {
    yield all([watchCreateStream()]);
}

const composeEnhancers =
    (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ &&
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({ trace: true, traceLimit: 25 })) ||
    compose;

export const history = createHashHistory();

export const store = createStore(
    rootReducer(history),
    composeEnhancers(compose(responsiveStoreEnhancer, applyMiddleware(routerMiddleware(history), sagaMiddleware))),
);

sagaMiddleware.run(rootSaga);
