/**
 * Generate base url using current window.location
 * @return {String} String containing the base url
 */
export const getBaseUrl = () => {
    let path;

    if (process && process.env && process.env.REACT_APP_GRAPHQL_URL) {
        path = process.env.REACT_APP_GRAPHQL_URL;
    } else if (typeof window !== 'undefined') {
        path = `${window.location.protocol}//${window.location.host}`;
    } else {
        return false;
    }

    return path;
};

export const getWebsocketUrl = () => {
    let path;

    if (process && process.env && process.env.REACT_APP_GRAPHQL_WS) {
        path = process.env.REACT_APP_GRAPHQL_WS;
    } else if (typeof window !== 'undefined') {
        path = `ws://${window.location.host}`;
    } else {
        return false;
    }

    return path;
};
