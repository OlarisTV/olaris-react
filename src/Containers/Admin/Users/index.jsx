// @flow
import React from 'react';
import { useMutation, useQuery } from 'react-apollo';

import CREATE_USER_INVITE from 'Mutations/createUserInvite';
import FETCH_INVITES from 'Queries/fetchInvites';

import * as S from 'Containers/Styles';

import Loading from 'Components/Loading';
import CreateInvite from 'Components/Admin/Users/CreateInvite';
import RenderUsers from './RenderUsers';
import RenderInvites from './RenderInvites';

const Users = () => {
    const { loading, error, data } = useQuery(FETCH_INVITES);
    const [generateInvite, { loading: loadingInvite }] = useMutation(CREATE_USER_INVITE, {
        refetchQueries: [{ query: FETCH_INVITES }],
    });

    if (loading) return <Loading />;
    if (error) return `Error! ${error.message}`;

    const invites = data.invites.filter((i) => i.user === null);

    return (
        <S.InnerContent>
            <S.PageHeading>User Management</S.PageHeading>
            <RenderUsers />
            {invites.length > 0 && <RenderInvites invites={invites} />}
            <CreateInvite generateInvite={() => generateInvite()} loading={loadingInvite} />
        </S.InnerContent>
    );
};

export default Users;
