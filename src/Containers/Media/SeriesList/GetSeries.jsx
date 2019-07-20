import React from 'react';
import { Query } from 'react-apollo';

import {
    FETCH_SERIES,
    FETCH_SERIES_SUBSCRIPTION,
} from 'Queries/fetchSeriesList';

import Loading from 'Components/Loading';
import RenderSeries from './RenderSeries';

const GetSeries = () => {
    const subscribeToSeries = (subscribeToMore) => {
        subscribeToMore({
            document: FETCH_SERIES_SUBSCRIPTION,
            updateQuery: (prev, { subscriptionData }) => {
                if (!subscriptionData.data) return prev;
                const { data } = subscriptionData;
                const updatedSeries = data.seriesAdded.series;

                return {
                    ...prev,
                    series: [...prev.series, updatedSeries],
                };
            },
        });
    };

    const loadMoreSeries = (fetchMore, data) => {
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
                            (item) =>
                                !prev.series.some(
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
            query={FETCH_SERIES}
            variables={{
                limit: 200,
                offset: 0,
            }}
        >
            {({ subscribeToMore, loading, error, data, fetchMore }) => {
                if (loading) return <Loading />;
                if (error) return `Error! ${error.message}`;

                return (
                    <RenderSeries
                        subscribeToNewSeries={() =>
                            subscribeToSeries(subscribeToMore)
                        }
                        onLoadMore={() => loadMoreSeries(fetchMore, data)}
                        series={data.series}
                    />
                );
            }}
        </Query>
    );
};

export default GetSeries;
