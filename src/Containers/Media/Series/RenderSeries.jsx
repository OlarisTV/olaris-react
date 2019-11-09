// @flow
import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { orderBy } from 'lodash';

import FETCH_SERIES from 'Queries/fetchSeries';

import Empty from 'Components/Media/Card/Empty';
import Loading from 'Components/Loading';
import Series from 'Components/Media/Series';
import MediaCard from 'Components/Media/Card';

import * as S from '../Styles';

type Props = {
    uuid: string,
};

const RenderSeries = ({ uuid }: Props) => {
    const { loading, error, data } = useQuery(FETCH_SERIES, {
        variables: { uuid },
    });

    if (loading) return <Loading />;
    if (error) return `Error! ${error.message}`;

    const { name, posterPath, firstAirDate, overview, seasons, type } = data.series[0];

    const seasonList = orderBy(seasons, ['seasonNumber'], ['asc']).map((item) => {
        const {
            posterPath: sPosterPath,
            type: sType,
            name: sName,
            playState,
            files,
            uuid: sUuid,
            unwatchedEpisodesCount,
            episodes,
        } = item;

        return (
            <S.LibraryListItemWide key={sUuid}>
                <MediaCard
                    files={files}
                    name={sName}
                    playState={playState}
                    posterPath={sPosterPath}
                    type={sType}
                    uuid={sUuid}
                    episodes={episodes}
                    unwatchedEpisodesCount={unwatchedEpisodesCount}
                    showText
                />
            </S.LibraryListItemWide>
        );
    });

    return (
        <Series
            name={name}
            firstAirDate={firstAirDate}
            overview={overview}
            uuid={uuid}
            posterPath={posterPath}
            type={type}
            seasons={seasons}
        >
            {seasonList}
            <Empty wide />
        </Series>
    );
};

export default RenderSeries;
