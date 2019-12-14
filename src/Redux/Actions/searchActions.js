export const TOGGLE_SEARCH = 'TOGGLE_SEARCH';

export const toggleSearch = (open) => ({
    type: TOGGLE_SEARCH,
    payload: {
        open,
    },
});
