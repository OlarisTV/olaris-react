// Flow
import React, { useState, useEffect } from 'react';
import { compose } from 'lodash/fp';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { useHistory } from 'react-router-dom';
import ReactToolTip from 'react-tooltip';
import { Auth } from 'Client/Auth';

import { compileEpisodes, sortEpisodes, generateMediaUrl } from 'Helpers';
import { showModal } from 'Redux/Actions/modalActions';

import { faPlay, faRandom } from '@fortawesome/free-solid-svg-icons';
import MediaMismatch from './MediaMismatch';
import MarkWatched from './MarkWatched';

import * as S from './Styles';

type Props = {
    data: Object,
    type: string,
    name: string,
    uuid: string,
};

const MediaListHeader = ({ data, type, name, uuid }: Props) => {
    const history = useHistory();
    const [mediaState, setMediaState] = useState({
        episodes: [],
        nextEpisode: {},
        randomEpisode: {},
        finished: false,
    });

    const updateEpisodeList = () => {
        const episodes = type === 'series' ? compileEpisodes(data) : sortEpisodes(data);
        const nextEpisode = episodes.filter((episode) => !episode.playState.finished)[0];
        const finished = episodes.some((episode) => episode.playState.finished);
        const randomEpisode = episodes[Math.floor(Math.random() * (episodes.length - 1))];

        setMediaState({
            episodes,
            nextEpisode,
            finished,
            randomEpisode,
        });
    };

    useEffect(() => {
        if (data) updateEpisodeList();
    }, [data]);

    const playEpisode = (resume) => {
        history.push({
            pathname: generateMediaUrl('episode', uuid),
            state: {
                resume,
                autoplay: true,
            },
        });
    };

    const playSeries = () => {
        const resume = mediaState.nextEpisode.playState.playtime > 0;

        playEpisode(mediaState.nextEpisode.uuid, resume);
    };

    return (
        <S.Header>
            <ReactToolTip effect="solid" place="left" className="tooltip" />
            <S.HeaderIconWrap onClick={playSeries} data-tip={`Play ${type === 'series' ? 'Series' : 'Season'}`}>
                <S.HeaderIcon icon={faPlay} />
            </S.HeaderIconWrap>

            <S.HeaderIconWrap
                onClick={() => playEpisode(mediaState.randomEpisode.uuid, false)}
                data-tip="Play Random Episode"
            >
                <S.HeaderIcon icon={faRandom} />
            </S.HeaderIconWrap>

            <MarkWatched
                type={type}
                uuid={uuid}
                playState={{ finished: mediaState.finished }}
                episodes={mediaState.episodes}
            />

            {Auth.isAdmin.admin && type === 'series' && <MediaMismatch uuid={uuid} name={name} type={type} />}
        </S.Header>
    );
};

const mapDispatchToProps = (dispatch) => ({
    showModal: (type, props) => dispatch(showModal(type, props)),
});

export default compose(withRouter, connect(null, mapDispatchToProps))(MediaListHeader);
