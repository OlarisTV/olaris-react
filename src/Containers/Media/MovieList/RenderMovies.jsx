import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { orderBy } from 'lodash';

import { showModal, LIBRARY_MODAL } from 'Redux/Actions/modalActions';

import InfiniteScroll from 'Components/InfiniteScroll';
import MediaCard from 'Components/Media/Card';
import { NoResults } from 'Containers/Styles';
import { LibraryListItem } from '../Styles';

class RenderMovies extends Component {
    componentDidMount() {
        const { subscribeToNewMovies } = this.props;

        subscribeToNewMovies();
    }

    toggleModal = () => {
        const { showModal } = this.props;

        showModal(LIBRARY_MODAL, {
            title: 'Add Movies Library',
            type: 'movies',
        });
    };

    render() {
        const { onLoadMore, movies } = this.props;

        if (movies.length > 0) {
            return (
                <InfiniteScroll
                    id="content"
                    threshold={500}
                    length={movies.length}
                    onLoadMore={() => onLoadMore()}
                >
                    {() => {
                        return orderBy(movies, ['name'], ['asc']).map((m) => (
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
    }
}

RenderMovies.propTypes = {
    showModal: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
    showModal: (type, props) => dispatch(showModal(type, props)),
});

export default connect(
    null,
    mapDispatchToProps,
)(RenderMovies);
