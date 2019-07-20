import axios from 'axios';
import { getBaseUrl } from 'Helpers';

const isInitialSetup = () => {
    const url = `${getBaseUrl()}/olaris/m/v1/user/setup`;

    return axios.post(url);
};

export default isInitialSetup;
