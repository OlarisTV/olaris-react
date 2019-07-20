import React from 'react';
import { Query } from 'react-apollo';

import {
    FETCH_MOVIES,
    FETCH_MOVIES_SUBSCRIPTION,
} from 'Queries/fetchMovieList';

import Loading from 'Components/Loading';
import RenderMovies from './RenderMovies';

const GetMovies = () => {
    const subscribeToMovies = (subscribeToMore) => {
        subscribeToMore({
            document: FETCH_MOVIES_SUBSCRIPTION,
            updateQuery: (prev, { subscriptionData }) => {
                if (!subscriptionData.data) return prev;
                const { data } = subscriptionData;
                const updatedMovie = data.movieAdded.movie;

                return {
                    ...prev,
                    movies: [...prev.movies, updatedMovie],
                };
            },
        });
    };

    const loadMoreMovies = (fetchMore, data) => {
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
                                    (prevItem) => prevItem.uuid === item.uuid,
                                ),
                        ),
                    ],
                };
            },
        });
    };

    return (
        <Query
            query={FETCH_MOVIES}
            variables={{
                limit: 200,
                offset: 0,
            }}
        >
            {({ subscribeToMore, loading, error, data, fetchMore }) => {
                if (loading) return <Loading />;
                if (error) return `Error! ${error.message}`;

                return (
                    <RenderMovies
                        subscribeToNewMovies={() =>
                            subscribeToMovies(subscribeToMore)
                        }
                        onLoadMore={() => loadMoreMovies(fetchMore, data)}
                        movies={data.movies}
                    />
                );
            }}
        </Query>
    );
};

export default GetMovies;
