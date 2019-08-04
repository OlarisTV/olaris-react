import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Query } from 'react-apollo';
import { orderBy } from 'lodash';
import FETCH_SERIES_LIST from 'Queries/fetchSeriesList';

import { showModal, LIBRARY_MODAL } from 'Redux/Actions/modalActions';

import InfiniteScroll from 'Components/InfiniteScroll';
import Loading from 'Components/Loading';
import MediaCard from 'Components/Media/Card';

import { NoResults } from 'Containers/Styles';
import { LibraryListItem } from '../Styles';

class RenderSeriesList extends Component {
    toggleModal = () => {
        const { sModal } = this.props;

        sModal(LIBRARY_MODAL, {
            title: 'Add Series Library',
            type: 'series',
        });
    };

    render() {
        return (
            <Query
                query={FETCH_SERIES_LIST}
                variables={{
                    limit: 200,
                    offset: 0,
                }}
            >
                {({ loading, error, data, fetchMore }) => {
                    if (loading) return <Loading />;
                    if (error) return `Error! ${error.message}`;

                    if (data.series.length > 0) {
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
                                                        (item) =>
                                                            !prev.series.some(
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
                                    return orderBy(data.series, ['name'], ['asc']).map((s) => (
                                        <LibraryListItem key={s.uuid}>
                                            <MediaCard {...s} />
                                        </LibraryListItem>
                                    ));
                                }}
                            </InfiniteScroll>
                        );
                    }

                    return (
                        <NoResults>
                            You currently have no Series.
                            <button type="button" onClick={() => this.toggleModal()}>
                                Add a Series folder
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
)(RenderSeriesList);
