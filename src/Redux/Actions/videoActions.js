export const VIDEO_OPEN = 'VIDEO_OPEN';
export const VIDEO_CLOSE = 'VIDEO_CLOSE';

export const showVideo = () => ({
    type: VIDEO_OPEN,
});

export const hideVideo = () => ({
    type: VIDEO_CLOSE,
});
