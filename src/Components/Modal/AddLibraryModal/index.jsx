import React, { Component } from 'react';
import { compose } from 'lodash/fp';
import { connect } from 'react-redux';
import { withAlert } from 'react-alert';
import { graphql } from 'react-apollo';
import PropTypes from 'prop-types';

import { ADD_LIBRARY } from 'Mutations/manageLibraries';
import { FetchLibraryList, FETCH_LIBRARIES } from 'Queries/fetchLibraries';
import {
    addLibrary,
    addLibrarySuccess,
    addLibraryFailure,
    clearLibraryError,
    setLibraryStatus,
} from 'Redux/Actions/libraryActions';
import { hideModal } from 'Redux/Actions/modalActions';

import { AlertInline } from 'Components/Alerts';
import {
    Modal,
    ModalWrap,
    ModalHeader,
    ModalHeading,
    ModalBody,
} from 'Components/Modal/Styles';
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
            filePath: '',
        };
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        return {
            error: nextProps.error !== prevState.error && nextProps.error,
            errorMessage:
                nextProps.errorMessage !== prevState.errorMessage &&
                nextProps.errorMessage,
            loading:
                nextProps.loading !== prevState.loading && nextProps.loading,
        };
    }

    componentDidMount() {
        const { type } = this.props;

        this.setState({
            kind: type === 'movies' ? 0 : 1,
        });
    }

    componentWillUnmount() {
        this.setState({ isMounted: false });
        clearTimeout(this.timeout);
    }

    closeModal = () => {
        const { hideModal } = this.props;

        hideModal();
    };

    modalClick = (e) => {
        if (e.target.id === 'modal-container') this.closeModal();
    };

    clearError = () => {
        const { isMounted } = this.state;
        const { clearLibraryError } = this.props;

        this.timeout = setTimeout(() => {
            if (isMounted) clearLibraryError();
            this.timeout = null;
        }, 2000);
    };

    updateFilePath = (filePath) => {
        this.setState({ filePath });
    };

    isRclone = (rclone) => {
        this.setState({ rclone });
    };

    createLibrary = async (kind, filePath) => {
        const {
            type,
            alert,
            mutate,
            importing,
            addLibrary,
            addLibrarySuccess,
            addLibraryFailure,
            setLibraryStatus,
        } = this.props;

        const { rclone } = this.state;

        const variables = {
            name: type,
            kind,
            filePath,
            backend: rclone ? 1 : 0,
        };

        addLibrary();

        mutate({
            variables,
            refetchQueries: [{ query: FETCH_LIBRARIES }],
        })
            .then((res) => {
                const { error } = res.data.createLibrary;

                if (error) {
                    addLibraryFailure(error.message);
                    this.clearError();
                } else {
                    addLibrarySuccess();
                    setLibraryStatus([...importing, type]);
                    this.setState({ filePath: '' });
                    alert.success('Library Added');
                }
            })
            .catch((error) => {
                addLibraryFailure(error.message);
                this.clearError();
            });
    };

    render() {
        const { title } = this.props;
        const { error, errorMessage, kind, filePath } = this.state;

        return (
            <Modal id="modal-container" onClick={(e) => this.modalClick(e)}>
                <ModalWrap>
                    <ModalHeader>
                        <ModalHeading>
                            {title}
                            <ModalClose onClick={() => this.closeModal()} />
                        </ModalHeading>
                    </ModalHeader>
                    <ModalBody>
                        {error && (
                            <AlertInline type="error">
                                {errorMessage}
                            </AlertInline>
                        )}
                        <FetchLibraryList kind={kind} />
                        <AddLibraryAction
                            createLibrary={() =>
                                this.createLibrary(kind, filePath)
                            }
                            updateFilePath={this.updateFilePath}
                            isRclone={this.isRclone}
                            filePath={filePath}
                        />
                    </ModalBody>
                </ModalWrap>
            </Modal>
        );
    }
}

AddLibraryModal.propTypes = {
    type: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    hideModal: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
    errorMessage: PropTypes.string,
    error: PropTypes.bool.isRequired,
    clearLibraryError: PropTypes.func.isRequired,
    importing: PropTypes.arrayOf(PropTypes.string).isRequired,
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
    hideModal: () => dispatch(hideModal()),
    addLibrary: () => dispatch(addLibrary()),
    addLibrarySuccess: () => dispatch(addLibrarySuccess()),
    addLibraryFailure: (props) => dispatch(addLibraryFailure(props)),
    clearLibraryError: () => dispatch(clearLibraryError()),
    setLibraryStatus: (importing) => dispatch(setLibraryStatus(importing)),
});

export default compose(
    connect(
        mapStateToProps,
        mapDispatchToProps,
    ),
    graphql(ADD_LIBRARY),
    withAlert,
)(AddLibraryModal);
