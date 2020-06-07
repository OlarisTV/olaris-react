// @flow
import React from 'react';
import { useQuery } from '@apollo/react-hooks';

import FETCH_EPISODE from 'Queries/fetchEpisode';
import Loading from 'Components/Loading';
import Item from 'Components/Media/Item';

type Props = {
    uuid: ?string,
};

type Episode = {
    episode: Object,
};

const RenderEpisode = ({ uuid }: Props) => {
    const { loading, error, data } = useQuery<Episode, Props>(FETCH_EPISODE, {
        variables: { uuid },
    });

    if (loading) return <Loading />;
    if (error) return `Error! ${error && error.message}`;
    if (!data) return `Error fetching data for this episde.`;

    return <Item wide uuid={uuid} media={data.episode} />;
};

export default RenderEpisode;
