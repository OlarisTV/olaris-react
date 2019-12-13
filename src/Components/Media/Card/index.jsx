// @flow
/* eslint react/jsx-props-no-spreading: ["off"] */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { getBaseUrl, generateMediaUrl } from 'Helpers';
import { showModal, RESUME_MODAL } from 'Redux/Actions/modalActions';
import type { HashHistory } from 'history/createHashHistory';

import { faPlay, faSearch } from '@fortawesome/free-solid-svg-icons';
import MediaInfo from './MediaInfo';
import MediaName from './MediaName';

import { Placeholder, placeholder } from './Placeholder';
import { CardPoster, CardWrap, CardPopup, PosterWrap, PopupLink, PopupIcon, Lazy } from './Styles';

type OwnProps = {
    playMedia?: Function,
    name: string,
    airDate?: string,
    posterPath?: string,
    stillPath?: string,
    type: string,
    uuid?: string,
    files?: Array<Object>,
    playState: Object,
    internalCard?: boolean,
    history: HashHistory,
    hover?: boolean,
    wide?: boolean,
    showText?: boolean,
};

type Props = {
    ...OwnProps,
    loadModal: Function,
};

type State = {
    url: string,
};

class MediaCard extends Component<Props, State> {
    constructor() {
        super();

        this.state = {
            url: '',
        };
    }

    componentDidMount() {
        const { type, uuid } = this.props;

        this.setState({
            url: generateMediaUrl(type, uuid),
        });
    }

    resumeModal = () => {
        const { url } = this.state;

        const { loadModal, history, playMedia, playState } = this.props;

        loadModal(RESUME_MODAL, {
            title: 'Resume Media',
            url,
            history,
            playMedia,
            playState,
        });
    };

    cardClick = (e, url, history, showPlayStatus) => {
        const { playState, playMedia, internalCard, hover } = this.props;

        if (!hover) return false;

        if (showPlayStatus) {
            if ((e.target.tagName === 'DIV' || e.target.tagName === 'H3') && !internalCard) {
                history.push(url);
                return true;
            }

            if (playState.playtime > 0 && !playState.finished) {
                this.resumeModal();
            } else if (internalCard) {
                playMedia();
            } else {
                history.push({
                    pathname: url,
                    state: { autoplay: true },
                });
            }
        } else {
            history.push(url);
        }

        return false;
    };

    render() {
        const { wide, showText, history, name, posterPath, stillPath, type, files, hover } = this.props;
        const { url } = this.state;

        const showPlayStatus = type === 'Movie' || type === 'Episode';
        const bgImage =
            stillPath || posterPath
                ? `${getBaseUrl()}/olaris/m/images/tmdb/w342/${stillPath || posterPath}`
                : placeholder;

        let length;
        if (typeof files === 'undefined' || !(files instanceof Array)) {
            length = 0;
        } else if (files[0]) {
            length = files[0].totalDuration;
        }

        return (
            <>
                <CardWrap onClick={(e) => this.cardClick(e, url, history, showPlayStatus)}>
                    <PosterWrap>
                        <Lazy wide={wide} height={0} debounce={100} placeholder={<Placeholder />} overflow resize>
                            <CardPoster hover={hover} wide={wide} bgimg={bgImage}>
                                <MediaInfo {...this.props} length={length} showPlayStatus={showPlayStatus} />
                            </CardPoster>
                        </Lazy>
                        {hover && (
                            <CardPopup>
                                <PopupLink>
                                    <PopupIcon icon={showPlayStatus ? faPlay : faSearch} />
                                </PopupLink>
                            </CardPopup>
                        )}
                    </PosterWrap>
                    {showText && <MediaName name={name} {...this.props} />}
                </CardWrap>
            </>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    loadModal: (type, props) => dispatch(showModal(type, props)),
});

MediaCard.defaultProps = {
    airDate: null,
    hover: true,
    posterPath: null,
    stillPath: null,
    wide: null,
    playMedia: null,
    showText: null,
    internalCard: null,
    playState: null,
    uuid: '',
    files: [
        {
            totalDuration: 0,
        },
    ],
};

export default withRouter(connect<Props, OwnProps, _, _, _, _>(null, mapDispatchToProps)(MediaCard));
