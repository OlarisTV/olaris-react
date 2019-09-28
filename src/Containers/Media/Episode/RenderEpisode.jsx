import React from 'react';
import PropTypes from 'prop-types';
import { useQuery } from '@apollo/react-hooks';

import FETCH_EPISODE from 'Queries/fetchEpisode';
import Loading from 'Components/Loading';
import MediaItem from 'Components/Media/MediaItem';

const RenderEpisode = ({ uuid }) => {
    const { loading, error, data } = useQuery(FETCH_EPISODE, {
        variables: { uuid },
    });

    if (loading) return <Loading />;
    if (error) return `Error! ${error.message}`;

    return <MediaItem wide {...data.episode} />;
};

RenderEpisode.propTypes = {
    uuid: PropTypes.string.isRequired,
};

export default RenderEpisode;
