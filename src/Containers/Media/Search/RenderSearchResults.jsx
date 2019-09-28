import React from 'react';
import PropTypes from 'prop-types';
import { useQuery } from '@apollo/react-hooks';

import FETCH_SEARCH_RESULTS from 'Queries/fetchSearchResults';
import Loading from 'Components/Loading';
import MediaCard from 'Components/Media/Card';

import * as S from '../Styles';

const RenderSearchResults = ({ value }) => {
    const { loading, error, data } = useQuery(FETCH_SEARCH_RESULTS, {
        variables: { value },
    });

    if (loading) return <Loading />;
    if (error) return `Error! ${error.message}`;
    if (data.search.length) return `No Results Found For ${value}`;

    return data.search.map((r) => (
        <S.LibraryListItem key={r.uuid}>
            <MediaCard {...r} />
        </S.LibraryListItem>
    ));
};

RenderSearchResults.propTypes = {
    value: PropTypes.string.isRequired,
};

export default RenderSearchResults;
