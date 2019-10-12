import React from 'react';
import PropTypes from 'prop-types';
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

    const { posterPath, airDate, season, type, name, playState, files, overview } = data.movies[0];

    return (
        <MediaItem
            uuid={uuid}
            airDate={airDate}
            posterPath={posterPath}
            season={season}
            type={type}
            name={name}
            playState={playState}
            files={files}
            overview={overview}
        />
    );
};

RenderMovie.propTypes = {
    uuid: PropTypes.string.isRequired,
};

export default RenderMovie;
