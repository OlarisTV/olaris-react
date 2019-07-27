import gql from 'graphql-tag';

const FETCH_LIBRARIES = gql`
    {
        libraries {
            id
            kind
            backend
            filePath
            healthy
        }
    }
`;

export default FETCH_LIBRARIES;
