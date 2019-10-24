import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useQuery } from '@apollo/react-hooks';

import { SEARCH_MOVIES, SEARCH_SERIES } from 'Queries/tmdbSearch';

import Loading from 'Components/Loading';
import { TextInput } from 'Components/Form';
import MediaList from './MediaList';

import * as S from './Styles';

const FixMismatch = ({ uuid, type, name }) => {
    const [searchVal, setSearchVal] = useState(name);

    const { loading, error, data, refetch, networkStatus } = useQuery(
        (type === 'movie' && SEARCH_MOVIES) || SEARCH_SERIES,
        {
            variables: { query: name },
        },
    );

    if (error) return <p>Error Fetching Data</p>;
    if (loading && !data) return <Loading />;

    const items = data.tmdbSearchMovies || data.tmdbSearchSeries;

    return (
        <>
            <S.SearchWrap>
                <TextInput
                    type="text"
                    name={name}
                    value={searchVal}
                    placeholder="Enter Search Term"
                    onChange={(e) => setSearchVal(e.target.value)}
                />
                <S.Button
                    type="button"
                    onClick={() => refetch({ query: searchVal })}
                    disabled={searchVal.length <= 1 || loading}
                >
                    Search
                </S.Button>
            </S.SearchWrap>

            <MediaList uuid={uuid} searchVal={searchVal} items={items} networkStatus={networkStatus} type={type} />
        </>
    );
};

FixMismatch.propTypes = {
    name: PropTypes.string.isRequired,
    uuid: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
};

export default FixMismatch;
