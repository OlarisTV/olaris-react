import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { faEdit } from '@fortawesome/free-solid-svg-icons';

import { showModal, EDITMEDIA_MODAL } from 'Redux/Actions/modalActions';

import { HeaderIconWrap, HeaderIcon } from './Styles';

const EditMediaData = ({ sModal, name, type }) => {
    const toggleModal = () => {
        sModal(EDITMEDIA_MODAL, {
            title: `Edit: ${name}`,
        });
    };

    return (
        <HeaderIconWrap onClick={() => toggleModal()} data-tip={`Edit ${type}`} right>
            <HeaderIcon icon={faEdit} />
        </HeaderIconWrap>
    );
};

EditMediaData.propTypes = {
    sModal: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
    sModal: (type, props) => dispatch(showModal(type, props)),
});

export default connect(
    null,
    mapDispatchToProps,
)(EditMediaData);
