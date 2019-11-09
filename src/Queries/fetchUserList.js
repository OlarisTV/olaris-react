import gql from 'graphql-tag';

const FETCH_USERS = gql`
    {
        users {
            id
            username
            admin
        }
    }
`;

export default FETCH_USERS;
