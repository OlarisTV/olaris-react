// @flow
import React from 'react';
import { connect } from 'react-redux';
import { convertToMinutesSeconds } from 'Helpers';

import type { RouterHistory } from 'react-router';
import type { Dispatch } from 'redux';

import { hideModal } from 'Redux/Actions/modalActions';

import { Modal, ModalWrap, ModalBody, ModalHeader, ModalHeading } from 'Components/Modal/Styles';
import ModalClose from '../ModalClose';
import ResumeOption from './Styles';

type OwnProps = {
    playMedia: Function,
    url: string,
    history: RouterHistory,
    title: string,
    playState: Object,
};

type Props = {
    ...OwnProps,
    hModal: Function,
};

const ResumeModal = ({ hModal, playMedia, url, history, title, playState }: Props) => {
    const onPlay = (resume: boolean, autoplay: boolean) => {
        if (playMedia) {
            hModal();
            playMedia(resume);
        } else {
            history.push({
                pathname: url,
                state: { resume, autoplay },
            });
        }
    };

    return (
        <Modal>
            <ModalWrap>
                <ModalHeader>
                    <ModalHeading>
                        {title}
                        <ModalClose onClick={() => hModal()} />
                    </ModalHeading>
                </ModalHeader>
                <ModalBody>
                    <ResumeOption type="submit" href="#" onClick={() => onPlay(true, true)}>
                        {playState && `Resume video from ${convertToMinutesSeconds(playState.playtime)}`}
                    </ResumeOption>
                    <ResumeOption type="submit" onClick={() => onPlay(false, true)}>
                        From Start
                    </ResumeOption>
                </ModalBody>
            </ModalWrap>
        </Modal>
    );
};

const mapDispatchToProps = (dispatch: Dispatch<*>) => ({
    hModal: () => dispatch(hideModal()),
});

export default connect<Props, OwnProps, *, *, *, *>(null, mapDispatchToProps)(ResumeModal);
