// @flow
import React from 'react';
import { connect } from 'react-redux';
import { convertToMinutesSeconds } from 'Helpers';
import type { Dispatch } from 'redux';

import { hideModal } from 'Redux/Actions/modalActions';

import { Modal, ModalWrap, ModalBody, ModalHeader, ModalHeading } from 'Components/Modal/Styles';
import ModalClose from '../ModalClose';
import ResumeOption from './Styles';

type OwnProps = {
    playMedia: Function,
    title: string,
    playState: Object,
};

type Props = {
    ...OwnProps,
    hModal: Function,
};

const ResumeModal = ({ hModal, playMedia, title, playState }: Props) => (
    <Modal>
        <ModalWrap>
            <ModalHeader>
                <ModalHeading>
                    {title}
                    <ModalClose onClick={() => hModal()} />
                </ModalHeading>
            </ModalHeader>
            <ModalBody>
                <ResumeOption type="submit" href="#" onClick={() => playMedia(true)}>
                    {playState && `Resume video from ${convertToMinutesSeconds(playState.playtime)}`}
                </ResumeOption>
                <ResumeOption type="submit" onClick={() => playMedia(false)}>
                    From Start
                </ResumeOption>
            </ModalBody>
        </ModalWrap>
    </Modal>
);

const mapDispatchToProps = (dispatch: Dispatch<*>) => ({
    hModal: () => dispatch(hideModal()),
});

export default connect<Props, OwnProps, *, *, *, *>(null, mapDispatchToProps)(ResumeModal);
