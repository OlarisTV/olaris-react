// @flow
import React from 'react';
import { connect } from 'react-redux';

import { hideModal } from 'Redux/Actions/modalActions';

import { Modal, ModalWrap, ModalBody, ModalHeader, ModalHeading } from 'Components/Modal/Styles';
import ModalClose from '../ModalClose';

type OwnProps = {
    title: string,
    message: string,
    confirm: Function,
    cancel: Function,
};

type Props = {
    ...OwnProps,
    hModal: Function,
};

const WarningModal = ({ hModal, title, message, confirm, cancel }: Props) => (
    <Modal>
        <ModalWrap>
            <ModalHeader>
                <ModalHeading>
                    {title}
                    <ModalClose onClick={() => hModal()} />
                </ModalHeading>
            </ModalHeader>
            <ModalBody>
                <h2>{message}</h2>
                <button type="button" onClick={() => cancel()}>
                    Cancel
                </button>
                <button type="button" onClick={() => confirm()}>
                    Confirm
                </button>
            </ModalBody>
        </ModalWrap>
    </Modal>
);

const mapDispatchToProps = (dispatch) => ({
    hModal: () => dispatch(hideModal()),
});

export default connect<Props, OwnProps, *, *, *, *>(null, mapDispatchToProps)(WarningModal);
