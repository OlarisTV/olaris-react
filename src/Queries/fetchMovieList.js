import gql from 'graphql-tag';

const FETCH_MOVIES = gql`
    query Movies($offset: Int, $limit: Int) {
        movies(offset: $offset, limit: $limit) {
            type: __typename
            name
            posterPath
            uuid
            year

            playState {
                finished
                playtime
            }

            files {
                totalDuration
                uuid
            }
        }
    }
`;

export default FETCH_MOVIES;
