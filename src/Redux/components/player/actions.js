import { createAction } from '@reduxjs/toolkit';
import * as types from './types';

const play = createAction(types.PLAY);
const createStream = createAction(types.CREATE_STREAM);
const createStreamSuccess = createAction(types.CREATE_STREAM_SUCCESS);
const createStreamFailed = createAction(types.CREATE_STREAM_FAILED);
const close = createAction(types.CLOSE);

export { play, close, createStream, createStreamSuccess, createStreamFailed };
