import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useQuery } from '@apollo/react-hooks';
import { orderBy } from 'lodash';

import FETCH_MOVIES from 'Queries/fetchMovieList';
import { showModal, LIBRARY_MODAL } from 'Redux/Actions/modalActions';

import InfiniteScroll from 'Components/InfiniteScroll';
import Loading from 'Components/Loading';
import MediaCard from 'Components/Media/Card';

import { NoResults } from 'Containers/Styles';
import { LibraryListItem } from '../Styles';

const RenderMovieList = ({ sModal }) => {
    const toggleModal = () => {
        sModal(LIBRARY_MODAL, {
            title: 'Add Movies Library',
            type: 'movies',
        });
    };

    const { loading, error, data, fetchMore } = useQuery(FETCH_MOVIES, {
        variables: {
            limit: 50,
            offset: 0,
        },
    });

    if (loading) return <Loading />;
    if (error) return `Error! ${error.message}`;

    if (data.movies.length) {
        return (
            <InfiniteScroll
                id="content"
                threshold={500}
                onLoadMore={() =>
                    fetchMore({
                        variables: {
                            offset: data.movies.length,
                        },
                        updateQuery: (prev, { fetchMoreResult }) => {
                            if (!fetchMoreResult) return prev;

                            return {
                                ...prev,
                                movies: [
                                    ...prev.movies,
                                    ...fetchMoreResult.movies.filter(
                                        (item) => !prev.movies.some((prevItem) => prevItem.uuid === item.uuid),
                                    ),
                                ],
                            };
                        },
                    })
                }
            >
                {() => {
                    return orderBy(data.movies, ['name'], ['asc']).map((m) => (
                        <LibraryListItem key={m.uuid}>
                            <MediaCard {...m} />
                        </LibraryListItem>
                    ));
                }}
            </InfiniteScroll>
        );
    }

    return (
        <NoResults>
            You currently have no Movies.
            <button type="button" onClick={() => toggleModal()}>
                Add a Movies folder
            </button>
        </NoResults>
    );
};

RenderMovieList.propTypes = {
    sModal: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
    sModal: (type, props) => dispatch(showModal(type, props)),
});

export default connect(
    null,
    mapDispatchToProps,
)(RenderMovieList);
