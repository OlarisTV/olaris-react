import React from 'react';
import PropTypes from 'prop-types';
import { useQuery } from '@apollo/react-hooks';

import FETCH_EPISODE from 'Queries/fetchEpisode';
import Loading from 'Components/Loading';
import MediaItem from 'Components/Media/MediaItem';

const RenderEpisode = ({ uuid }) => {
    const { loading, error, data } = useQuery(FETCH_EPISODE, {
        variables: { uuid },
    });

    if (loading) return <Loading />;
    if (error) return `Error! ${error.message}`;

    const { stillPath, airDate, season, type, name, playState, files, overview } = data.episode;

    return (
        <MediaItem
            wide
            uuid={uuid}
            airDate={airDate}
            posterPath={stillPath}
            season={season}
            type={type}
            name={name}
            playState={playState}
            files={files}
            overview={overview}
        />
    );
};

RenderEpisode.propTypes = {
    uuid: PropTypes.string.isRequired,
};

export default RenderEpisode;
