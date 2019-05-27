/* eslint-disable */
import React from 'react';
import { connect } from 'react-redux';

import { setCastStatus } from 'Redux/Actions/castActions';

import { ReactComponent as ChromecastIcon } from './chromecast.svg';

import { NavButton } from './Styles';


const castMessage = (auth, session) => {
  const onSuccess = () => console.log('success');
  const onFailure = () => console.log('failure');
  const namespace = 'urn:x-cast:com.auth';
  const message = {...auth};

  return session.sendMessage(namespace, message, onSuccess, onFailure);
}

const Cast = ({setCastStatus, auth}) => {
  const startCast = () => {
    const sessionRequest = new chrome.cast.SessionRequest('EA238E27');
    const onLaunchError = () => (console.log('onLaunchError'));

    chrome.cast.requestSession(function onRequestSessionSuccess(session) {
        cast.session = session;
        setCastStatus(true);
        castMessage(auth, session);
      },
      onLaunchError(),
      sessionRequest,
    );
  };

  return (
    <NavButton onClick={() => startCast()}>
      <ChromecastIcon />
    </NavButton>
  );
};

const mapStateToProps = (state) => {
  const { cast } = state;
  return {
    auth: cast.auth,
  };
};

const mapDispatchToProps = dispatch => ({
  setCastStatus: (status) => dispatch(setCastStatus(status)),
});


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Cast);
