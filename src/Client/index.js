import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { WebSocketLink } from 'apollo-link-ws';
import { onError } from 'apollo-link-error';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloLink, from, split } from 'apollo-link';
import { getMainDefinition } from 'apollo-utilities';
import Cookies from 'universal-cookie';

import { Auth } from 'Client/Auth';
import { getBaseUrl, getWebsocketUrl } from 'Helpers';

import fragmentMatcher from './fragmentMatcher';

const cookies = new Cookies();
let token;

if (document.cookie.indexOf('jwt') >= 0) {
    token = cookies.get('jwt');
}

const httpLink = new HttpLink({
    uri: `${getBaseUrl()}/olaris/m/query`,
});

const wsLink = new WebSocketLink({
    uri: `${getWebsocketUrl()}/olaris/m/query?JWT=${token.jwt}`,
    options: {
        reconnect: true,
    },
});

const authMiddleware = new ApolloLink((operation, forward) => {
    operation.setContext(({ headers = {} }) => ({
        headers: {
            ...headers,
            authorization: token.jwt ? `Bearer ${token.jwt}` : '',
        },
    }));

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

const link = from([
    errorLink,
    authMiddleware,
    split(
        ({ query }) => {
            const { kind, operation } = getMainDefinition(query);
            return (
                kind === 'OperationDefinition' && operation === 'subscription'
            );
        },
        wsLink,
        httpLink,
    ),
]);

const client = new ApolloClient({
    cache,
    link,
});

export default client;
