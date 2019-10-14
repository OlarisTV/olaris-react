import React from 'react';
import PropTypes from 'prop-types';
import { useQuery } from '@apollo/react-hooks';

import { SEARCH_MOVIES, SEARCH_SERIES } from 'Queries/tmdbSearch';

const FixMismatch = ({ type, name }) => {
    const { loading, error, data } = useQuery((type === 'movie' && SEARCH_MOVIES) || SEARCH_SERIES, {
        variables: { name },
    });

    if (error) return <p>Error Fetching Data</p>;
    if (loading) return <p>Loading</p>;

    return (
        <p>
            {type} {name}
        </p>
    );
};

FixMismatch.propTypes = {
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
};

export default FixMismatch;
