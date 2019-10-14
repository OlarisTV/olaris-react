<<<<<<< HEAD
import React from 'react';
=======
import React, { Component } from 'react';
>>>>>>> develop
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useQuery } from 'react-apollo';

import RECENTLY_ADDED from 'Queries/fetchRecentlyAdded';
import { showModal, LIBRARY_MODAL } from 'Redux/Actions/modalActions';

import Carousel from 'Components/Carousel';
import Loading from 'Components/Loading';
import MediaCard from 'Components/Media/Card';

import { NoResults } from 'Containers/Styles';
import { MediaCardWrap } from './Styles';

const RenderRecentEpisodes = ({ sModal }) => {
    const { loading, error, data } = useQuery(RECENTLY_ADDED, {
        fetchPolicy: 'cache-and-network',
    });

    if (loading) return <Loading />;
    if (error) return `Error! ${error.message}`;

    const toggleModal = () =>
        sModal(LIBRARY_MODAL, {
            title: 'Add TV Series folder',
            type: 'series',
        });

    const episodes = data.recentlyAdded.filter((m) => m.type === 'Episode');

    const RecentlyAddedEpisodes = episodes.map((item) => {
        if (item.name.length === 0) return false;

        const { files, name, playState, type, uuid, season } = item;
        const { posterPath } = season;

        return (
            <MediaCardWrap key={uuid}>
                <MediaCard
                    showText
                    files={files}
                    name={name}
                    playState={playState}
                    posterPath={posterPath}
                    type={type}
                    uuid={uuid}
                />
            </MediaCardWrap>
        );
    });

    if (episodes.length === 0) {
        return (
            <NoResults alignLeft>
                {'You currently have no Series.'}
                <button type="button" onClick={() => toggleModal()}>
                    Add a Series folder
                </button>
            </NoResults>
        );
    }

    return <Carousel>{RecentlyAddedEpisodes}</Carousel>;
};

RenderRecentEpisodes.propTypes = {
    sModal: PropTypes.func.isRequired,
};

RenderRecentEpisodes.propTypes = {
    sModal: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
    sModal: (type, props) => dispatch(showModal(type, props)),
});

export default connect(
    null,
    mapDispatchToProps,
)(RenderRecentEpisodes);
