import { takeLatest, put, select, call } from 'redux-saga/effects';

import { getBaseUrl } from 'Helpers';
import * as types from './types';
import * as s from './selectors';

function* createStream() {
    try {
        const stream = yield select(s.getStream);
        const response = yield call(() =>
            fetch(getBaseUrl() + stream.metadataPath)
                .then((res) => res.json())
                .then((data) => data),
        );

        yield put({ type: types.CREATE_STREAM_SUCCESS, payload: response });
    } catch (error) {
        yield put({ type: types.CREATE_STREAM_FAILED, error });
    }

    yield put({ type: types.PLAY });
}

export function* watchCreateStream() {
    yield takeLatest([types.CREATE_STREAM], createStream);
}
