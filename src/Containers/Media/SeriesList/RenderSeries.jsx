import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { orderBy } from 'lodash';

import { showModal, LIBRARY_MODAL } from 'Redux/Actions/modalActions';

import InfiniteScroll from 'Components/InfiniteScroll';
import MediaCard from 'Components/Media/Card';
import { NoResults } from 'Containers/Styles';
import { LibraryListItem } from '../Styles';

class RenderSeries extends Component {
    componentDidMount() {
        const { subscribeToNewSeries } = this.props;

        subscribeToNewSeries();
    }

    toggleModal = () => {
        const { showModal } = this.props;

        showModal(LIBRARY_MODAL, {
            title: 'Add Series Library',
            type: 'series',
        });
    };

    render() {
        const { onLoadMore, series } = this.props;

        if (series.length > 0) {
            return (
                <InfiniteScroll
                    id="content"
                    threshold={500}
                    length={series.length}
                    onLoadMore={() => onLoadMore()}
                >
                    {() => {
                        return orderBy(series, ['name'], ['asc']).map((m) => (
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
                You currently have no Series.
                <button type="button" onClick={() => this.toggleModal()}>
                    Add a Series folder
                </button>
            </NoResults>
        );
    }
}

RenderSeries.propTypes = {
    showModal: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
    showModal: (type, props) => dispatch(showModal(type, props)),
});

export default connect(
    null,
    mapDispatchToProps,
)(RenderSeries);
