export const SHOW_MODAL = 'SHOW_MODAL';
export const HIDE_MODAL = 'HIDE_MODAL';

export const LIBRARY_MODAL = 'LIBRARY_MODAL';
export const RESUME_MODAL = 'RESUME_MODAL';
export const WARNING_MODAL = 'WARNING_MODAL';
export const FIX_MISMATCH_MODAL = 'FIX_MISMATCH_MODAL';

export const showModal = (type, props) => ({
    type: SHOW_MODAL,
    payload: {
        type,
        props,
    },
});

export const hideModal = () => ({
    type: HIDE_MODAL,
});
