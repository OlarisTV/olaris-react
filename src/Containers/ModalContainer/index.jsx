import React from 'react';
import { connect } from 'react-redux';

import AddLibraryModal from 'Components/Modal/AddLibraryModal';
import ResumeMediaModal from 'Components/Modal/ResumeMediaModal';
import WarningModal from 'Components/Modal/WarningModal';
<<<<<<< HEAD
import FixMismatchModal from 'Components/Modal/FixMismatchModal';

import { LIBRARY_MODAL, RESUME_MODAL, WARNING_MODAL, FIXMISMATCH_MODAL } from 'Redux/Actions/modalActions';
=======
import EditMediaModal from 'Components/Modal/EditMediaModal';

import {
    LIBRARY_MODAL,
    RESUME_MODAL,
    WARNING_MODAL,
    EDITMEDIA_MODAL,
} from 'Redux/Actions/modalActions';
>>>>>>> develop

const MODAL_COMPONENTS = {
    [LIBRARY_MODAL]: AddLibraryModal,
    [RESUME_MODAL]: ResumeMediaModal,
    [WARNING_MODAL]: WarningModal,
<<<<<<< HEAD
    [FIXMISMATCH_MODAL]: FixMismatchModal,
=======
    [EDITMEDIA_MODAL]: EditMediaModal,
>>>>>>> develop
};

// eslint-disable-next-line
const ModalContainer = ({ type, props }) => {
    if (!type) {
        return null;
    }

    const Modal = MODAL_COMPONENTS[type];

    // eslint-disable-next-line
    return <Modal {...props} />;
};

const mapStateToProps = (state) => ({
    type: state.modal.type,
    props: state.modal.props,
});

export default connect(mapStateToProps)(ModalContainer);
