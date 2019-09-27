import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { faWrench } from '@fortawesome/free-solid-svg-icons';

import { showModal, FIXMISMATCH_MODAL } from 'Redux/Actions/modalActions';

import { HeaderIconWrap, HeaderIcon } from './Styles';

const FixMismatch = ({ sModal, name, file, type }) => {
    const toggleModal = () => {
        sModal(FIXMISMATCH_MODAL, {
            name,
            file,
            type,
        });
    };

    return (
        <HeaderIconWrap onClick={() => toggleModal()} data-tip="Fix Mismatch">
            <HeaderIcon icon={faWrench} />
        </HeaderIconWrap>
    );
};

FixMismatch.propTypes = {
    sModal: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    file: PropTypes.string,
};

FixMismatch.defaultProps = {
    file: null,
};

const mapDispatchToProps = (dispatch) => ({
    sModal: (type, props) => dispatch(showModal(type, props)),
});

export default connect(
    null,
    mapDispatchToProps,
)(FixMismatch);
