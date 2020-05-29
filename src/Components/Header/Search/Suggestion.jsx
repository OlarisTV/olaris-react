import React from 'react';
import PropTypes from 'prop-types';
import { getBaseUrl } from 'Helpers';

import { Suggestion, Poster, Name, Year } from './Styles';
import { placeholder } from '../../Media/Card/Placeholder';

const renderSuggestion = (suggestion) => {
    const year =
        suggestion.type === 'Movie'
            ? suggestion.year
            : suggestion.firstAirDate.split("-")[0];
    const poster =
        suggestion.posterPath
            ? `${getBaseUrl()}/olaris/m/images/tmdb/w342/${suggestion.posterPath}`
            : placeholder;

    return (
        <Suggestion to="/movies">
            <Poster src={poster} alt={suggestion.name} />

            <Name>{suggestion.name}</Name>
            {year && <Year>{year}</Year>}
        </Suggestion>
    );
};

renderSuggestion.propTypes = {
    suggestion: PropTypes.shape({
        poster_path: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        year: PropTypes.string,
        first_air_date: PropTypes.string,
    }).isRequired,
};

export default renderSuggestion;
