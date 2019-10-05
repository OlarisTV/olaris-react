import axios from 'axios';
import getBaseUrl from './getBaseUrl';

const isInitialSetup = () => {
    const url = `${getBaseUrl()}/olaris/m/v1/user/setup`;
    let result = false;

    axios.post(url).then((res) => {
        result = res.data;
    });

    return result;
};

export default isInitialSetup;
