// @flow
import React from 'react';
import { connect } from 'react-redux';
import { useQuery } from '@apollo/react-hooks';
import { orderBy } from 'lodash';

import FETCH_SERIES_LIST from 'Queries/fetchSeriesList';
import { showModal, LIBRARY_MODAL } from 'Redux/Actions/modalActions';

import InfiniteScroll from 'Components/InfiniteScroll';
import Loading from 'Components/Loading';
import MediaCard from 'Components/Media/Card';

import { NoResults } from 'Containers/Styles';
import * as S from '../Styles';

type Props = {
    sModal: Function,
};

const RenderSeriesList = ({ sModal }: Props) => {
    const toggleModal = () => {
        sModal(LIBRARY_MODAL, {
            title: 'Add TV Series folder',
            type: 'series',
        });
    };

    const seriesLimit = (window.innerHeight > 1100) ? 100 : 50;

    const { loading, error, data, fetchMore } = useQuery(FETCH_SERIES_LIST, {
        variables: {
            limit: seriesLimit,
            offset: 0,
        },
    });

    if (loading) return <Loading />;
    if (error) return `Error! ${error.message}`;

    if (data.series.length) {
        return (
            <InfiniteScroll
                id="content"
                threshold={500}
                onLoadMore={() =>
                    fetchMore({
                        variables: {
                            offset: data.series.length,
                        },
                        updateQuery: (prev, { fetchMoreResult }) => {
                            if (!fetchMoreResult) return prev;

                            return {
                                ...prev,
                                series: [
                                    ...prev.series,
                                    ...fetchMoreResult.series.filter(
                                        (item) => !prev.series.some((prevItem) => prevItem.uuid === item.uuid),
                                    ),
                                ],
                            };
                        },
                    })
                }
            >
                {() => {
                    return orderBy(data.series, ['name'], ['asc']).map((s) => {
                        const { name, posterPath, type, unwatchedEpisodesCount, uuid } = s;

                        return (
                            <S.LibraryListItem key={s.uuid}>
                                <MediaCard
                                    name={name}
                                    posterPath={posterPath}
                                    type={type}
                                    unwatchedEpisodesCount={unwatchedEpisodesCount}
                                    uuid={uuid}
                                />
                            </S.LibraryListItem>
                        );
                    });
                }}
            </InfiniteScroll>
        );
    }

    return (
        <NoResults>
            You currently have no Series.
            <button type="button" onClick={() => toggleModal()}>
                Add a Series folder
            </button>
        </NoResults>
    );
};

const mapDispatchToProps = (dispatch) => ({
    sModal: (type, props) => dispatch(showModal(type, props)),
});

export default connect(
    null,
    mapDispatchToProps,
)(RenderSeriesList);
