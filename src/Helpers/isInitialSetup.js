import getBaseUrl from './getBaseUrl';

const isInitialSetup = async () => {
    const response = await fetch(`${getBaseUrl()}/olaris/m/v1/user/setup`);
    const data = await response.json();

    return data;
}

export default isInitialSetup;
