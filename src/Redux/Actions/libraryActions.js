export const ADD_LIBRARY = 'ADD_LIBRARY';
export const ADD_LIBRARY_SUCCESS = 'ADD_LIBRARY_SUCCESS';
export const ADD_LIBRARY_FAILURE = 'ADD_LIBRARY_FAILURE';
export const CLEAR_LIBRARY_ERROR = 'CLEAR_LIBRARY_ERROR';

export const addLibrary = filePath => ({
  type: ADD_LIBRARY,
  payload: {
    filePath,
  },
});

export const addLibrarySuccess = () => ({
  type: ADD_LIBRARY_SUCCESS,
});

export const addLibraryFailure = err => ({
  type: ADD_LIBRARY_FAILURE,
  payload: {
    err,
  },
});

export const clearLibraryError = filePath => ({
  type: CLEAR_LIBRARY_ERROR,
});
