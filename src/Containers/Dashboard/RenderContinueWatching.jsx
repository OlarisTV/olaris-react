// @flow
import React from 'react';
import { useQuery } from 'react-apollo';

import CONTINUE_WATCHING from 'Queries/fetchContinueWatching';

import Carousel from 'Components/Carousel';
import Loading from 'Components/Loading';
import MediaCard from 'Components/Media/Card';

import { NoResults } from 'Containers/Styles';
import { MediaCardWrap } from './Styles';

const RenderContinueWatching = () => {
    const { loading, error, data } = useQuery(CONTINUE_WATCHING, {
        fetchPolicy: 'cache-and-network',
    });

    if (loading) return <Loading />;
    if (error) return `Error! ${error.message}`;

    if (data.upNext.length === 0) {
        return <NoResults alignLeft>Nothing here? Why not start watching something?</NoResults>;
    }

    const continueWatching = data.upNext.map((item) => {
        if (item.name.length === 0) return false;

        const { files, name, playState, type, uuid, episodeNumber, season } = item;
        const posterPath = item.posterPath || item.season.series.posterPath;
        const seasonNumber = season && season.seasonNumber;

        return (
            <MediaCardWrap key={uuid}>
                <MediaCard
                    showText
                    files={files}
                    episodeNumber={episodeNumber}
                    seasonNumber={seasonNumber}
                    name={name}
                    playState={playState}
                    posterPath={posterPath}
                    type={type}
                    uuid={uuid}
                />
            </MediaCardWrap>
        );
    });

    return <Carousel>{continueWatching}</Carousel>;
};

export default RenderContinueWatching;
