export default {
    autoplay: true,
    techOrder: ['html5'],
    controls: true,
    controlBar: {
        volumePanel: {
            inline: false,
        },
    },
    userActions: {
        hotkeys: true,
    },
    html5: {
        hls: {
            enableLowInitialPlaylist: true,
            smoothQualityChange: true,
        },
        nativeAudioTracks: false,
    },
};
