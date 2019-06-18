import gql from 'graphql-tag';

const FETCH_SERIES_LIST = gql`
    query Series($offset: Int, $limit: Int) {
        series(offset: $offset, limit: $limit) {
            type: __typename
            name
            posterPath
            uuid
            unwatchedEpisodesCount
        }
    }
`;

export default FETCH_SERIES_LIST;
