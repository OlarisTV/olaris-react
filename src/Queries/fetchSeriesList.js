import gql from 'graphql-tag';

export const FETCH_SERIES_SUBSCRIPTION = gql`
    subscription seriesAdded {
        seriesAdded {
            series {
                type: __typename
                name
                posterPath
                uuid
                unwatchedEpisodesCount
            }
        }
    }
`;

export const FETCH_SERIES = gql`
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
