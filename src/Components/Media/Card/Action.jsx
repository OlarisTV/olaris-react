import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useMutation } from '@apollo/react-hooks';
import { faPlay, faSearch } from '@fortawesome/free-solid-svg-icons';
import ReactRouterPropTypes from 'react-router-prop-types';

import REQUEST_STREAM from 'Mutations/requestStream';
import { SHOW_MODAL, RESUME_MODAL } from 'Redux/Actions/modalActions';
import { types as player } from 'Redux/components/player';
import { PlayState, File } from 'types/Media';

import * as S from './Styles';

type Props = {
    playState: PlayState,
    showPlay: boolean,
    url: string,
    name: string,
    type: string,
    uuid: string,
    history: ReactRouterPropTypes,
    selectedFile: File,
};

const Action = ({ playState, showPlay, name, url, history, type, selectedFile, uuid }: Props) => {
    const [resume, setResume] = useState(false);
    const showResume = playState && playState.playtime > 0 && !playState.finished;
    const dispatch = useDispatch();

    const [reqestStream] = useMutation(REQUEST_STREAM, {
        onCompleted({ createStreamingTicket: stream }) {
            dispatch({
                type: player.CREATE_STREAM,
                payload: {
                    playFrom: resume ? playState.playtime : 0,
                    stream,
                    type,
                    selectedFile,
                    uuid,
                },
            });
        },
    });

    const playMedia = (resumeMedia) => {
        setResume(resumeMedia);

        reqestStream({
            variables: {
                uuid: selectedFile.uuid,
            },
        });
    };

    const resumeModal = () => {
        dispatch({
            type: SHOW_MODAL,
            payload: {
                type: RESUME_MODAL,
                props: {
                    title: `Resume ${name}`,
                    playMedia,
                    url,
                    playState,
                },
            },
        });
    };

    const handleClick = (e) => {
        e.stopPropagation();

        if (showResume) {
            resumeModal();
        } else {
            playMedia();
        }
    };

    return (
        <S.CardPopup>
            <S.PopupLink onClick={(e) => (showPlay ? handleClick(e) : history.push(url))}>
                <S.PopupIcon icon={showPlay ? faPlay : faSearch} />
            </S.PopupLink>
        </S.CardPopup>
    );
};

export default Action;
