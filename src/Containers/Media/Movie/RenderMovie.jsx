// @flow
import React from 'react';
import { useQuery } from '@apollo/react-hooks';

import FETCH_MOVIE from 'Queries/fetchMovie';
import Loading from 'Components/Loading';
import MediaItem from 'Components/Media/MediaItem';

type Props = {
    uuid: string,
};

const RenderMovie = ({ uuid }: Props) => {
    const { loading, error, data } = useQuery(FETCH_MOVIE, {
        variables: { uuid },
    });

    if (loading) return <Loading />;
    if (error) return `Error! ${error.message}`;

    const { posterPath, season, type, name, playState, files, overview, year } = data.movies[0];

    return (
        <MediaItem
            uuid={uuid}
            posterPath={posterPath}
            season={season}
            type={type}
            name={name}
            playState={playState}
            files={files}
            overview={overview}
            year={year}
        />
    );
};

export default RenderMovie;
