import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';

import { hideModal } from 'Redux/Actions/modalActions';

import {
  Modal,
  ModalWrap,
  ModalBody,
  ModalHeader,
  ModalHeading,
} from 'Components/Modal/Styles';
import ModalClose from '../ModalClose';
import ResumeOption from './Styles';

class ResumeModal extends Component {
  closeModal = () => {
    const { hideModal } = this.props;

    hideModal();
  };

  handlePlayRequest = (resume, autoplay) => {
    const { playMedia, url, history } = this.props;

    if (playMedia) {
      this.closeModal();
      playMedia(resume);
    } else {
      history.push({
        pathname: url,
        state: { resume, autoplay },
      });
    }
  };

  convertPlaystate = () => {
    const { playState } = this.props;

    const date = new Date(null);
    date.setHours(0, 0, 0);
    date.setSeconds(playState.playtime);

    const hours = (date.getHours() > 0 ? `${date.getHours()} Hrs` : '');
    const minutes = (date.getMinutes() > 0 ? `${date.getMinutes()} Mins` : '');
    const seconds = (date.getSeconds() > 0 ? `${date.getSeconds()} Secs` : '');

    const resumeTimeStamp = `${hours} ${minutes} ${seconds}`;

    return `Resume video from ${resumeTimeStamp}`;
  };

  render() {
    const { playState, title } = this.props;

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
            <ResumeOption type="submit" href="#" onClick={() => (this.handlePlayRequest(true, true))}>
              {playState && this.convertPlaystate()}
            </ResumeOption>
            <ResumeOption type="submit" onClick={() => (this.handlePlayRequest(false, true))}>From Start</ResumeOption>
          </ModalBody>
        </ModalWrap>
      </Modal>
    );
  }
}

ResumeModal.propTypes = {
  url: PropTypes.string,
  playMedia: PropTypes.func,
  history: ReactRouterPropTypes.history,
  hideModal: PropTypes.func.isRequired,
  title: PropTypes.string,
  playState: PropTypes.shape({
    finished: PropTypes.bool,
    playtime: PropTypes.number,
  }),
};

ResumeModal.defaultProps = {
  playMedia: null,
  history: null,
  url: '',
  title: 'Resume Media',
  playState: {
    finished: false,
    playtime: 0,
  },
};

const mapDispatchToProps = dispatch => ({
  hideModal: () => dispatch(hideModal()),
});

export default connect(null, mapDispatchToProps)(ResumeModal);
