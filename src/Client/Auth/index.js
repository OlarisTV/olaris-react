import axios from 'axios';
import PropTypes from 'prop-types';
import Cookies from 'universal-cookie';
import jwtDecode from 'jwt-decode';
import { getBaseUrl } from 'Helpers';
import { store, history } from 'Redux/store';

import { setAuthData } from 'Redux/Actions/castActions';

// eslint-disable-next-line
import client from '../index';

const cookies = new Cookies();

const propTypes = {
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
};

export const Auth = {
    isAuthenticated: false,
    isAdmin: false,

    authenticate() {
        const jwtDecoded = jwtDecode(cookies.get('jwt').jwt);
        const authData = {
            data: jwtDecoded,
            token: cookies.get('jwt'),
            baseUrl: getBaseUrl(),
        };

        if (!this.isAuthenticated) store.dispatch(setAuthData(authData));

        this.isAdmin = jwtDecoded;
        this.isAuthenticated = true;
    },
    logout() {
        history.push('/login');
        this.isAuthenticated = false;
        this.isAdmin = false;

        cookies.remove('jwt', { path: '/' });
        client.resetStore();
    },
};

export const checkAuth = () => {
    if (cookies.get('jwt') == null) return false;
    const jwt = jwtDecode(cookies.get('jwt').jwt);

    const currentTime = Date.now() / 1000;

    if (jwt.exp < currentTime) {
        return false;
    }

    return Auth.authenticate();
};

export const AUTH_REQUEST = (username, password) => {
    const url = `${getBaseUrl()}/olaris/m/v1/auth`;

    const data = {
        username,
        password,
    };

    return axios.post(url, data).then((response) => {
        cookies.set('jwt', response.data, { path: '/' });
        Auth.authenticate();
    });
};

AUTH_REQUEST.propTypes = propTypes;
