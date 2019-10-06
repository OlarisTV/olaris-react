import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { onError } from 'apollo-link-error';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloLink, from } from 'apollo-link';
import Cookies from 'universal-cookie';
import { getBaseUrl } from 'Helpers';
import fragmentMatcher from './fragmentMatcher';

// eslint-disable-next-line
import { Auth } from './Auth';

const cookies = new Cookies();

const httpLink = new HttpLink({
    uri: `${getBaseUrl()}/olaris/m/query`,
});

const authMiddleware = new ApolloLink((operation, forward) => {
    if (document.cookie.indexOf('jwt') >= 0) {
        const token = cookies.get('jwt');

        operation.setContext(({ headers = {} }) => ({
            headers: {
                ...headers,
                authorization: token.jwt ? `Bearer ${token.jwt}` : '',
            },
        }));
    }

    return forward(operation);
});

const errorLink = onError(({ networkError }) => {
    if (networkError && networkError.statusCode === 401) {
        Auth.logout();
    }

    if (networkError && networkError.statusCode === 403) {
        Auth.logout();
    }
});

const cache = new InMemoryCache({
    fragmentMatcher,
    dataIdFromObject: (object) => object.uuid || null,
});

const client = new ApolloClient({
    cache,
    link: from([errorLink, authMiddleware, httpLink]),
});

export default client;
