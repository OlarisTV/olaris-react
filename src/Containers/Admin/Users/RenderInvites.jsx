import React from 'react';
import { useQuery } from 'react-apollo';

import FETCH_INVITES from 'Queries/fetchInvites';
import Loading from 'Components/Loading';
import InviteItem from 'Components/Admin/Users/InviteItem';

const RenderInvites = () => {
    const { loading, error, data } = useQuery(FETCH_INVITES);

    if (loading) return <Loading />;
    if (error) return `Error! ${error.message}`;

    const invites = data.invites.filter((i) => i.user === null);

    return invites.map((i) => <InviteItem key={i.code} code={i.code} />);
};

export default RenderInvites;
