import getBaseUrl from './getBaseUrl';
import canPlayCodec from './canPlayCodec';

const getVideoSource = (isIOS, stream, response) => {
    const baseUrl = getBaseUrl();
    const playableCodecs = response.checkCodecs.filter(canPlayCodec);
    const streamPath = isIOS ? stream.hlsStreamingPath : stream.dashStreamingPath;
    const mimetype = isIOS ? 'application/x-mpegURL' : 'application/dash+xml';
    const queryParams = playableCodecs.map((c) => `playableCodecs=${encodeURIComponent(c)}`).join('&');

    const sourceData = {
        source: `${baseUrl}${streamPath}?${queryParams}`,
        mimetype,
    };

    return sourceData;
};

export default getVideoSource;
