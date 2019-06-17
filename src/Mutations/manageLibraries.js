import gql from 'graphql-tag';

export const ADD_LIBRARY = gql`
    mutation createLibrary(
        $name: String!
        $kind: Int!
        $filePath: String!
        $backend: Int!
        $rcloneName: String!
    ) {
        createLibrary(
            name: $name
            kind: $kind
            filePath: $filePath
            backend: $backend
            rcloneName: $rcloneName
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
