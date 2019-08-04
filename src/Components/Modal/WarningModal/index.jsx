import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { hideModal } from 'Redux/Actions/modalActions';

import { Modal, ModalWrap, ModalBody, ModalHeader, ModalHeading } from 'Components/Modal/Styles';
import ModalClose from '../ModalClose';

class WarningModal extends Component {
    closeModal = () => {
        const { hModal } = this.props;

        hModal();
    };

    render() {
        const { title, message, confirm, cancel } = this.props;

        return (
            <Modal>
                <ModalWrap>
                    <ModalHeader>
                        <ModalHeading>
                            {title}
                            <ModalClose onClick={() => this.closeModal()} />
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
    }
}

WarningModal.propTypes = {
    title: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
    confirm: PropTypes.func.isRequired,
    cancel: PropTypes.func.isRequired,
    hModal: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
    hModal: () => dispatch(hideModal()),
});

export default connect(
    null,
    mapDispatchToProps,
)(WarningModal);
