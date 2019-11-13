import { getBaseUrl } from 'Helpers';

const generateSubtitles = (streams) => {
    const subtitleArray = [];

    streams.forEach((stream) => {
        if (stream.streamType !== 'subtitle') return false;

        const subtitleObject = new chrome.cast.media.Track(stream.streamID, chrome.cast.media.TrackType.TEXT);
        subtitleObject.trackContentId = getBaseUrl() + stream.streamURL;
        subtitleObject.trackContentType = 'text/vtt';
        subtitleObject.subtype = chrome.cast.media.TextTrackType.SUBTITLES;
        subtitleObject.name = `${stream.title}`;
        subtitleObject.language = stream.language;
        subtitleObject.select = true;

        subtitleArray.push(subtitleObject);
        return true;
    });

    return subtitleArray;
};

const CastVideo = ({
    message,
    playState,
    name,
    season,
    background,
    overview,
    selectedFile,
    uuid,
    resume,
    source,
    mimeType,
    streams,
    type,
}) => {
    return new Promise((resolve, reject) => {
        const castSession = cast.framework.CastContext.getInstance().getCurrentSession();
        const namespace = 'urn:x-cast:com.auth';

        // Append media data to cast request
        const mediaInfo = new chrome.cast.media.MediaInfo(source, mimeType);

        // Set generic metadata
        if (type === 'Episode') {
            mediaInfo.metadata = new chrome.cast.media.GenericMediaMetadata();
            mediaInfo.metadata.subtitle = season.series.name;
        } else {
            mediaInfo.metadata = new chrome.cast.media.MovieMediaMetadata();
        }

        const img = new chrome.cast.Image(`${getBaseUrl()}/olaris/m/images/tmdb/w342/${background}`);
        mediaInfo.metadata.title = name;
        mediaInfo.metadata.overview = overview;
        mediaInfo.metadata.uuid = uuid;
        mediaInfo.metadata.images = [img];
        mediaInfo.metadata.totalDuration = selectedFile.totalDuration;

        // Generate Subtitles
        if (streams && streams.length > 0) {
            // Style Subtitles
            mediaInfo.textTrackStyle = new chrome.cast.media.TextTrackStyle();
            mediaInfo.textTrackStyle.fontFamily = 'Arial';
            mediaInfo.textTrackStyle.foregroundColor = '#FFFFFF';
            mediaInfo.textTrackStyle.backgroundColor = '#00000010';
            mediaInfo.textTrackStyle.fontScale = '1';
            mediaInfo.textTrackStyle.edgeColor = '#00000099';
            mediaInfo.textTrackStyle.edgeType = chrome.cast.media.TextTrackEdgeType.OUTLINE;

            // Generate Tracks
            const tracks = generateSubtitles(streams);
            mediaInfo.tracks = tracks;
        }

        // Build request to load mediaInfo
        const request = new chrome.cast.media.LoadRequest(mediaInfo);
        if (resume) request.currentTime = playState.playtime;

        const onLoadSuccess = () => {
            return resolve();
        };

        const onLoadError = () => {
            return reject();
        };

        castSession.sendMessage(namespace, message);
        castSession.loadMedia(request).then(onLoadSuccess, onLoadError);
    });
};

export default CastVideo;
