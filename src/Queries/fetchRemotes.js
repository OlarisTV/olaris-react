import gql from 'graphql-tag';

const FETCH_REMOTES = gql`
    query {
        remotes
    }
`;

export default FETCH_REMOTES;
