import React from 'react';
import { useQuery } from '@apollo/react-hooks';

import FETCH_MOVIE from 'Queries/fetchMovie';
import Loading from 'Components/Loading';
import MediaItem from 'Components/Media/MediaItem';

const RenderMovie = ({ uuid }) => {
    const { loading, error, data } = useQuery(FETCH_MOVIE, {
        variables: { uuid },
    });

    if (loading) return <Loading />;
    if (error) return `Error! ${error.message}`;

    return <MediaItem wide {...data.movies[0]} />;
};

export default RenderMovie;
