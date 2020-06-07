// @flow
import React from 'react';
import { useQuery } from '@apollo/react-hooks';

import FETCH_MOVIE from 'Queries/fetchMovie';
import Loading from 'Components/Loading';
import Item from 'Components/Media/Item';

type Props = {
    uuid: string,
};

const RenderMovie = ({ uuid }: Props) => {
    const { loading, error, data } = useQuery(FETCH_MOVIE, {
        variables: { uuid },
    });

    if (loading) return <Loading />;
    if (error) return `Error! ${error.message}`;

    return <Item uuid={uuid} media={data.movies[0]} />;
};

export default RenderMovie;
