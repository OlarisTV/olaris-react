// @flow
import React from 'react';
import { useMutation } from '@apollo/react-hooks';

import DELETE_USER from 'Mutations/deleteUser';

import { faTrash, faCrown } from '@fortawesome/free-solid-svg-icons';
import * as S from './Styles';

type Props = {
    username: string,
    id: number,
    admin: boolean,
};

const UserItem = ({ username, id, admin }: Props) => {
    const [deleteUser, { data }] = useMutation(DELETE_USER);

    return (
        <S.UserListItem success={typeof data !== 'undefined'}>
            {data && `Successfully Deleted`} {username} {admin && <S.AdminUser icon={faCrown} />}
            {!data && !admin && <S.DeleteUser icon={faTrash} onClick={() => deleteUser({ variables: { id } })} />}
        </S.UserListItem>
    );
};

export default UserItem;
