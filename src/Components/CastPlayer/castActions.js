/* eslint-disable */
import { store } from 'Redux/store';

import {
    setCastStatus,
    setCastPlayingStatus,
    setSourceData,
    setCastPlaystate,
    clearCastData,
} from 'Redux/Actions/castActions';

let remotePlayer;
let remotePlayerController;

export const castStatusCheck = (isCasting, isPlaying) => {
    const { framework } = cast;
    const context = framework.CastContext.getInstance();
    const castSession = context.getCurrentSession();

    if (context.getCastState() === 'CONNECTED' && !isCasting) {
        store.dispatch(setCastStatus(true));
    }

    if (castSession && castSession.getMediaSession() && !isPlaying) {
        store.dispatch(setCastPlayingStatus(true));
    }

    castEventListeners();
};

export const castEventListeners = () => {
    const eventType = cast.framework.RemotePlayerEventType;

    let totalDuration;

    remotePlayer = new cast.framework.RemotePlayer();
    remotePlayerController = new cast.framework.RemotePlayerController(remotePlayer);

    remotePlayerController.addEventListener(eventType.IS_CONNECTED_CHANGED, function(e) {
        store.dispatch(setCastStatus(e.value));
        store.dispatch(
            setCastPlaystate({
                volume: remotePlayer.volumeLevel,
            }),
        );

        if (!e.value) store.dispatch(clearCastData());
    });

    remotePlayerController.addEventListener(eventType.ANY_CHANGE, function(e) {
        console.log(e);
    });

    remotePlayerController.addEventListener(eventType.IS_MEDIA_LOADED_CHANGED, function(e) {
        const context = cast.framework.CastContext.getInstance();
        const castSession = context.getCurrentSession();

        if (castSession && castSession.getMediaSession() && castSession.getMediaSession().media) {
            const media = castSession.getMediaSession();
            const mediaInfo = media.media;

            if (mediaInfo.metadata) {
                const hasTracks = mediaInfo.tracks && mediaInfo.tracks.length > 0;

                const data = {
                    ...mediaInfo.metadata,
                    tracks: hasTracks ? mediaInfo.tracks : [],
                };

                store.dispatch(setCastPlayingStatus(e.value));
                store.dispatch(setSourceData(data));
                totalDuration = mediaInfo.metadata.totalDuration;
            }
        }
    });

    remotePlayerController.addEventListener(eventType.IS_PAUSED_CHANGED, function(e) {
        store.dispatch(
            setCastPlaystate({
                paused: e.value,
            }),
        );
    });

    remotePlayerController.addEventListener(eventType.IS_MUTED_CHANGED, function(e) {
        store.dispatch(
            setCastPlaystate({
                muted: e.value,
            }),
        );
    });

    remotePlayerController.addEventListener(eventType.CURRENT_TIME_CHANGED, function(e) {
        store.dispatch(
            setCastPlaystate({
                playtime: e.value,
                total: totalDuration,
            }),
        );
    });

    remotePlayerController.addEventListener(eventType.VOLUME_LEVEL_CHANGED, function(e) {
        store.dispatch(
            setCastPlaystate({
                volume: e.value,
            }),
        );
    });
};

export const PlayerControls = {
    playOrPause() {
        remotePlayerController.playOrPause();
    },
    muteOrUnmute() {
        remotePlayerController.muteOrUnmute();
    },
    stop() {
        remotePlayerController.stop();
    },
    setTrack(trackID) {
        const activeTrackIds = [trackID];
        const castSession = cast.framework.CastContext.getInstance().getCurrentSession();
        const media = castSession.getMediaSession();

        let tracksInfoRequest = new chrome.cast.media.EditTracksInfoRequest(activeTrackIds);

        const success = () => true;
        const failure = () => false;

        if (trackID === 9999) {
            tracksInfoRequest = new chrome.cast.media.EditTracksInfoRequest([]);
        }

        media.editTracksInfo(tracksInfoRequest, success, failure);
    },
    seek(time) {
        store.dispatch(
            setCastPlaystate({
                playtime: time,
            }),
        );

        remotePlayer.currentTime = time;
        remotePlayerController.seek();
    },
    setVolume(volume) {
        store.dispatch(
            setCastPlaystate({
                volume: volume,
            }),
        );

        remotePlayer.volumeLevel = volume;
        remotePlayerController.setVolumeLevel();
    },
};
