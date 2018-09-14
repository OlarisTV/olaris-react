import React, { Component } from 'react';
import ReactRouterPropTypes from 'react-router-prop-types';
import Cookies from 'universal-cookie';
import { withRouter } from 'react-router-dom';

import { faSignOut } from '@fortawesome/pro-regular-svg-icons';

import { Auth } from 'Client/Auth';
import { LogoutButton, LogoutIcon } from './Styles';

class Logout extends Component {
  handleLogout = () => {
    const { history } = this.props;

    const cookies = new Cookies();
    cookies.remove('jwt', { path: '/' });

    Auth.logout();
    history.push('/login');
  }

  render() {
    return (
      <LogoutButton onClick={this.handleLogout}>
        <LogoutIcon icon={faSignOut} />
      </LogoutButton>
    );
  }
}

Logout.propTypes = {
  history: ReactRouterPropTypes.history.isRequired,
};

export default withRouter(Logout);