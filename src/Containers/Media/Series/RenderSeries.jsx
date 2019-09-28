import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { orderBy } from 'lodash';
import FETCH_SERIES from 'Queries/fetchSeries';

import Empty from 'Components/Media/Card/Empty';
import Loading from 'Components/Loading';
import Series from 'Components/Media/Series';
import MediaCard from 'Components/Media/Card';

import * as S from '../Styles';

const RenderSeries = ({ uuid }) => {
    const { loading, error, data } = useQuery(FETCH_SERIES, {
        variables: { uuid },
    });

    if (loading) return <Loading />;
    if (error) return `Error! ${error.message}`;

    const series = { ...data.series[0] };
    const seasonList = orderBy(series.seasons, ['seasonNumber'], ['asc']).map((s) => (
        <S.LibraryListItem key={s.uuid}>
            <MediaCard {...s} showText />
        </S.LibraryListItem>
    ));

    return (
        <Season {...series}>
            {seasonList}
            <Empty wide />
        </Season>
    );
};

export default RenderSeries;
