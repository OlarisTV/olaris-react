import React from 'react';
import { useQuery } from 'react-apollo';

import FETCH_USERS from 'Queries/fetchUserList';
import Loading from 'Components/Loading';
import UserInvite from 'Components/Admin/Users/UserItem';

const RenderUsers = () => {
    const { loading, error, data } = useQuery(FETCH_USERS, {
        fetchPolicy: 'cache-and-network',
    });

    if (loading) return <Loading />;
    if (error) return `Error! ${error.message}`;

    return data.users.map((u) => <UserInvite key={u.id} username={u.id} />);
};

export default RenderUsers;
