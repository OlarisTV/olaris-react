// @flow
import React from 'react';
import { useQuery } from '@apollo/react-hooks';

import FETCH_EPISODE from 'Queries/fetchEpisode';
import Loading from 'Components/Loading';
import MediaItem from 'Components/Media/MediaItem';

type Props = {
    uuid: string,
};

const RenderEpisode = ({ uuid }: Props) => {
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

export default RenderEpisode;
