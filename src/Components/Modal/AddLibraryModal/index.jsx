import React, { Component } from 'react';
import { compose } from 'lodash/fp';
import { connect } from 'react-redux';
import { withAlert } from 'react-alert';
import { graphql } from 'react-apollo';
import PropTypes from 'prop-types';

import { ADD_LIBRARY } from 'Mutations/manageLibraries';
import FETCH_LIBRARIES from 'Queries/fetchLibraries';
import { addLibrary, addLibrarySuccess, addLibraryFailure, clearLibraryError } from 'Redux/Actions/libraryActions';
import { hideModal } from 'Redux/Actions/modalActions';

import LibraryList from 'Components/Libraries/LibraryList';
import { AlertInline } from 'Components/Alerts';
import { Modal, ModalWrap, ModalHeader, ModalHeading, ModalBody } from 'Components/Modal/Styles';
import ModalClose from '../ModalClose';
import AddLibraryAction from './AddLibraryAction';

class AddLibraryModal extends Component {
    constructor(props) {
        super(props);
        this.timeout = null;

        this.state = {
            error: props.error,
            errorMessage: props.errorMessage,
            loading: props.loading,
            kind: 0,
            isMounted: true,
        };
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        const { error, errorMessage, loading } = nextProps;

        return {
            error: error !== prevState.error && error,
            errorMessage: errorMessage !== prevState.errorMessage && errorMessage,
            loading: loading !== prevState.loading && loading,
        };
    }

    componentDidMount() {
        const { type } = this.props;

        document.addEventListener('keydown', this.escapeClose, false);

        this.setState({ kind: type === 'movies' ? 0 : 1 });
    }

    componentWillUnmount() {
        document.removeEventListener('keydown', this.escapeClose, false);

        clearTimeout(this.timeout);

        this.setState({ isMounted: false });
    }

    closeModal = () => {
        const { hModal } = this.props;

        hModal();
    };

    escapeClose = (e) => e.key === 'Escape' && this.closeModal();

    clearError = () => {
        const { isMounted } = this.state;
        const { cLibraryError } = this.props;

        this.timeout = setTimeout(() => {
            if (isMounted) cLibraryError();
            this.timeout = null;
        }, 5000);
    };

    createLibrary = async ({ backend, filePath, rcloneName }) => {
        const { kind } = this.state;
        const { type, alert, mutate, aLibrary, aLibrarySucess, aLibraryFailure } = this.props;

        let variables = {
            name: type,
            kind,
            filePath,
            backend,
        };

        if (rcloneName)
            variables = {
                ...variables,
                rcloneName,
            };

        aLibrary();

        mutate({
            variables,
            refetchQueries: [{ query: FETCH_LIBRARIES }],
        })
            .then((res) => {
                const { error } = res.data.createLibrary;

                if (error) {
                    aLibraryFailure(error.message);
                    this.clearError();
                } else {
                    this.closeModal();
                    aLibrarySucess();
                    alert.success('Library Added');
                }
            })
            .catch((error) => {
                aLibraryFailure(error.message);
                this.clearError();
            });
    };

    render() {
        const { title } = this.props;
        const { error, errorMessage, kind } = this.state;

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
                        {error && <AlertInline type="error">{errorMessage}</AlertInline>}
                        <LibraryList kind={kind} />
                        <AddLibraryAction createLibrary={(props) => this.createLibrary(props)} />
                    </ModalBody>
                </ModalWrap>
            </Modal>
        );
    }
}

AddLibraryModal.propTypes = {
    type: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    hModal: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
    errorMessage: PropTypes.string,
    error: PropTypes.bool.isRequired,
    cLibraryError: PropTypes.func.isRequired,
    mutate: PropTypes.func.isRequired,
    aLibrary: PropTypes.func.isRequired,
    aLibrarySucess: PropTypes.func.isRequired,
    aLibraryFailure: PropTypes.func.isRequired,
    alert: PropTypes.shape({
        success: PropTypes.func.isRequired,
    }).isRequired,
};

AddLibraryModal.defaultProps = {
    errorMessage: '',
};

const mapStateToProps = (state) => {
    const { library } = state;

    return {
        loading: library.loading,
        error: library.error,
        errorMessage: library.errorMessage,
        importing: library.importing,
    };
};

const mapDispatchToProps = (dispatch) => ({
    hModal: () => dispatch(hideModal()),
    aLibrary: () => dispatch(addLibrary()),
    aLibrarySuccess: () => dispatch(addLibrarySuccess()),
    aLibraryFailure: (props) => dispatch(addLibraryFailure(props)),
    cLibraryError: () => dispatch(clearLibraryError()),
});

export default compose(
    connect(
        mapStateToProps,
        mapDispatchToProps,
    ),
    graphql(ADD_LIBRARY),
    withAlert,
)(AddLibraryModal);
