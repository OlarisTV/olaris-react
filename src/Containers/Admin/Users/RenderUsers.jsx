// @flow
import React from 'react';
import { useQuery } from 'react-apollo';

import FETCH_USERS from 'Queries/fetchUserList';

import Loading from 'Components/Loading';
import UserInvite from 'Components/Admin/Users/UserItem';

import * as S from './Styles';

const RenderUsers = () => {
    const { loading, error, data } = useQuery(FETCH_USERS, {
        fetchPolicy: 'cache-and-network',
    });

    if (loading) return <Loading />;
    if (error) return `Error! ${error.message}`;

    return (
        <S.List>
            <S.ListHeading>Userlist</S.ListHeading>
            {data.users.map((u) => <UserInvite key={u.id} username={u.username} id={u.id} admin={u.admin} />)}
        </S.List>
    );
};

export default RenderUsers;
