import gql from 'graphql-tag';

export const FETCH_MOVIES_SUBSCRIPTION = gql`
    subscription movieAdded {
        movieAdded {
            movie {
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
                }
            }
        }
    }
`;

export const FETCH_MOVIES = gql`
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
            }
        }
    }
`;
