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

    return data.search.map((item) => {
        const { posterPath, type, name, playState, files, uuid } = item;

        return (
            <S.LibraryListItem key={uuid}>
                <MediaCard
                    files={files}
                    name={name}
                    playState={playState}
                    posterPath={posterPath}
                    type={type}
                    uuid={uuid}
                />
            </S.LibraryListItem>
        );
    });
};

RenderSearchResults.propTypes = {
    value: PropTypes.string.isRequired,
};

export default RenderSearchResults;
