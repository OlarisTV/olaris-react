// @flow
import React, { useState } from 'react';
import { useQuery } from '@apollo/react-hooks';

import { SEARCH_MOVIES, SEARCH_SERIES } from 'Queries/tmdbSearch';

import Loading from 'Components/Loading';
import { TextInput } from 'Components/Form';
import MediaList from './MediaList';

import * as S from './Styles';

type Props = {
    uuid: string,
    type: string,
    name: string,
};

type DataProps = {
    tmdbSearchMovies?: string,
    tmdbSearchSeries?: string,
};

const FixMismatch = ({ uuid, type, name }: Props) => {
    const [searchVal, setSearchVal] = useState('');
    const { loading, error, data, refetch, networkStatus } = useQuery<DataProps>(
        (type === 'movie' && SEARCH_MOVIES) || SEARCH_SERIES,
        {
            variables: { query: name },
        },
    );

    if (error) return <p>Error Fetching Data</p>;
    if (loading && !data) return <Loading />;

    return (
        <>
            <S.SearchWrap>
                <TextInput
                    type="text"
                    name={name}
                    value={searchVal}
                    placeholder="Enter Search Term"
                    autoFocus
                    onChange={(e) => setSearchVal(e.target.value)}
                />
                <S.Button
                    type="submit"
                    onClick={() => refetch({ query: searchVal })}
                    disabled={searchVal.length <= 1 || loading}
                >
                    Search
                </S.Button>
            </S.SearchWrap>

            <MediaList
                uuid={uuid}
                searchVal={searchVal}
                items={data.tmdbSearchMovies || data.tmdbSearchSeries}
                networkStatus={networkStatus}
                type={type}
            />
        </>
    );
};

export default FixMismatch;
