export const IS_CASTING = 'IS_CASTING';
export const SET_AUTH_DATA = 'SET_AUTH_TOKEN';
export const SET_VIDEO_DATA = 'SET_VIDEO_DATA';

export const setCastStatus = status => ({
  type: IS_CASTING,
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

export const setSourceData = metadata => ({
  type: SET_VIDEO_DATA,
  payload: {
    metadata,
  },
});
