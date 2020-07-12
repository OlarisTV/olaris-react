import { isIOS } from 'react-device-detect';
import { getVideoSource } from 'Helpers';

export const getStreamData = (stream, payload) => {
    const { source, mimetype } = getVideoSource(isIOS, stream, payload);

    return {
        source,
        mimetype,
    };
};
