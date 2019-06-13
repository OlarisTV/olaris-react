import gql from 'graphql-tag';

export const ADD_LIBRARY = gql`
    mutation createLibrary(
        $name: String!
        $kind: Int!
        $filePath: String!
        $backend: Int!
    ) {
        createLibrary(
            name: $name
            kind: $kind
            filePath: $filePath
            backend: $backend
        ) {
            error {
                hasError
                message
            }
        }
    }
`;

export const DELETE_LIBRARY = gql`
    mutation deleteLibrary($id: Int!) {
        deleteLibrary(id: $id) {
            error {
                hasError
                message
            }
        }
    }
`;
