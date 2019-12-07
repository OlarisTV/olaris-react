// @flow
import React from 'react';
import { getBaseUrl } from 'Helpers';

import * as S from './Styles';

type Suggestion = {
    posterPath: string,
    name: string,
    typename?: string,
    first_air_date?: string,
    year?: string,
};

const renderSuggestion = (suggestion: Suggestion) => {
    const year = suggestion.typename === 'Movie' ? suggestion.year : suggestion.first_air_date;

    return (
        <S.Suggestion to="/movies">
            <S.Poster
                src={`${getBaseUrl()}/olaris/m/images/tmdb/w342/${suggestion.posterPath}`}
                alt={suggestion.name}
            />
            <S.Name>{suggestion.name}</S.Name>
            {year && <S.Year>{year}</S.Year>}
        </S.Suggestion>
    );
};

export default renderSuggestion;
