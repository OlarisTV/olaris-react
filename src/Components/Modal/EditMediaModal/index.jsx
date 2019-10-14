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
        const { title } = this.props;

        return (
            <Modal>
                <ModalWrap>
                    <ModalHeader>
                        <ModalHeading>
                            {title}
                            <ModalClose onClick={() => this.closeModal()} />
                        </ModalHeading>
                    </ModalHeader>
                    <ModalBody />
                </ModalWrap>
            </Modal>
        );
    }
}

EditMediaModal.propTypes = {
    hModal: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
    hModal: () => dispatch(hideModal()),
});

export default connect(
    null,
    mapDispatchToProps,
)(EditMediaModal);
