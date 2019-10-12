import React from 'react';
import PropTypes from 'prop-types';
import { useQuery } from '@apollo/react-hooks';
import { orderBy } from 'lodash';

import FETCH_SEASON from 'Queries/fetchSeason';

import Empty from 'Components/Media/Card/Empty';
import Loading from 'Components/Loading';
import Season from 'Components/Media/Season';
import MediaCard from 'Components/Media/Card';

import * as S from '../Styles';

const RenderSeason = ({ uuid }) => {
    const { loading, error, data } = useQuery(FETCH_SEASON, {
        variables: { uuid },
    });

    if (loading) return <Loading />;
    if (error) return `Error! ${error.message}`;

    const { name, posterPath, airDate, overview, episodes, series, type } = data.season;

    const episodeList = orderBy(data.season.episodes, ['episodeNumber'], ['asc']).map((item) => {
        const { stillPath, type: etype, name: ename, playState, files, uuid: euuid } = item;

        return (
            <S.LibraryListItemWide key={euuid}>
                <MediaCard
                    files={files}
                    name={ename}
                    playState={playState}
                    posterPath={stillPath}
                    type={etype}
                    uuid={euuid}
                    wide
                    showText
                />
            </S.LibraryListItemWide>
        );
    });

    return (
        <Season
            name={name}
            airDate={airDate}
            overview={overview}
            episodes={episodes}
            series={series}
            uuid={uuid}
            posterPath={posterPath}
            type={type}
        >
            {episodeList}
            <Empty wide />
        </Season>
    );
};

RenderSeason.propTypes = {
    uuid: PropTypes.string.isRequired,
};

export default RenderSeason;
