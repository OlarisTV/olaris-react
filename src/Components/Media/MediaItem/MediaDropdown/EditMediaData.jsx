import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { showModal, EDITMEDIA_MODAL } from 'Redux/Actions/modalActions';

class EditMediaData extends Component {
    constructor(props) {
        super(props);

        this.state = {
            label: 'Fix Match',
        };
    }

    toggleModal = () => {
        const { sModal, name } = this.props;

        sModal(EDITMEDIA_MODAL, {
            title: `Edit: ${name}`,
        });
    };

    render() {
        const { label } = this.state;

        return (
            <button type="button" onClick={() => this.toggleModal()}>
                {label}
            </button>
        );
    }
}

EditMediaData.propTypes = {
    sModal: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
    sModal: (type, props) => dispatch(showModal(type, props)),
});

export default connect(
    null,
    mapDispatchToProps,
)(EditMediaData);
