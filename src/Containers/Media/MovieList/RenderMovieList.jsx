import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Query } from 'react-apollo';
import { orderBy } from 'lodash';
import FETCH_MOVIES from 'Queries/fetchMovieList';

import { showModal, LIBRARY_MODAL } from 'Redux/Actions/modalActions';

import InfiniteScroll from 'Components/InfiniteScroll';
import Loading from 'Components/Loading';
import MediaCard from 'Components/Media/Card';

import { NoResults } from 'Containers/Styles';
import { LibraryListItem } from '../Styles';

class RenderMovieList extends Component {
    toggleModal = () => {
        const { sModal } = this.props;

        sModal(LIBRARY_MODAL, {
            title: 'Add Movies Library',
            type: 'movies',
        });
    };

    render() {
        return (
            <Query
                query={FETCH_MOVIES}
                variables={{
                    limit: 200,
                    offset: 0,
                }}
            >
                {({ loading, error, data, fetchMore }) => {
                    if (loading) return <Loading />;
                    if (error) return `Error! ${error.message}`;

                    if (data.movies.length > 0) {
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
                                                        (item) =>
                                                            !prev.movies.some(
                                                                (prevItem) =>
                                                                    prevItem.uuid === item.uuid,
                                                            ),
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
                            <button type="button" onClick={() => this.toggleModal()}>
                                Add a Movies folder
                            </button>
                        </NoResults>
                    );
                }}
            </Query>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    sModal: (type, props) => dispatch(showModal(type, props)),
});

export default connect(
    null,
    mapDispatchToProps,
)(RenderMovieList);
