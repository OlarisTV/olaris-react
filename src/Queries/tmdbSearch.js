import gql from 'graphql-tag';

export const SEARCH_MOVIES = gql`
    query($query: String!) {
        tmdbSearchMovies(query: $query) {
            title
            tmdbID
        }
    }
`;

export const SEARCH_SERIES = gql`
    query($query: String!) {
        tmdbSearchMovies(query: $query) {
            title
            tmdbID
        }
    }
`;
