export const initialState = {
    success: false,
    error: false,
    username: '',
    password: '',
};

export const reducer = (state, action) => {
    switch (action.type) {
        case 'UPDATE_FORM':
            return {
                ...state,
                [action.payload.name]: action.payload.value,
            };
        case 'SUCCESS':
            return {
                ...state,
                error: false,
                success: true,
            };
        case 'ERROR':
            return {
                ...state,
                error: true,
                success: false,
            };
        default:
            return state;
    }
};
