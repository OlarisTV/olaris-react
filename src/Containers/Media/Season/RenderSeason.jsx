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

    const episodeList = orderBy(data.season.episodes, ['episodeNumber'], ['asc']).map((s) => (
        <S.LibraryListItemWide key={s.uuid}>
            <MediaCard {...s} wide showText />
        </S.LibraryListItemWide>
    ));

    return (
        <Season {...data.season}>
            {episodeList}
            <Empty wide />
        </Season>
    );
};

RenderSeason.propTypes = {
    uuid: PropTypes.string.isRequired,
};

export default RenderSeason;
