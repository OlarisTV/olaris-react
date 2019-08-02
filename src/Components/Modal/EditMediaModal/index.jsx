import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { hideModal } from 'Redux/Actions/modalActions';

import { Modal, ModalWrap, ModalBody, ModalHeader, ModalHeading } from 'Components/Modal/Styles';
import ModalClose from '../ModalClose';

class EditMediaModal extends Component {
    closeModal = () => {
        const { hModal } = this.props;

        hModal();
    };

    render() {
        return (
            <Modal>
                <ModalWrap>
                    <ModalHeader>
                        <ModalHeading>
                            Edit Media
                            <ModalClose onClick={() => this.closeModal()} />
                        </ModalHeading>
                    </ModalHeader>
                    <ModalBody>
                        <h2>Editing</h2>
                    </ModalBody>
                </ModalWrap>
            </Modal>
        );
    }
}

EditMediaModal.propTypes = {
    hModal: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
    hModal: () => dispatch(hideModal()),
});

export default connect(
    null,
    mapDispatchToProps,
)(EditMediaModal);
