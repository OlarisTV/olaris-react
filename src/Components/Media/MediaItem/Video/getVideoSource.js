import { canPlayCodec, getBaseUrl } from 'Helpers';

const getVideoSource = (isIOS, data, response) => {
    const playableCodecs = response.checkCodecs.filter(canPlayCodec);

    const streamPath = isIOS
        ? data.createStreamingTicket.hlsStreamingPath
        : data.createStreamingTicket.dashStreamingPath;

    const mimeType = isIOS ? 'application/x-mpegURL' : 'application/dash+xml';

    const queryParams = playableCodecs
        .map((c) => `playableCodecs=${encodeURIComponent(c)}`)
        .join('&');

    const sourceData = {
        source: `${getBaseUrl()}${streamPath}?${queryParams}`,
        mimeType,
    };

    return sourceData;
};

export default getVideoSource;
