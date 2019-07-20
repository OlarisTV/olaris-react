import React from 'react';

import Empty from 'Components/Media/Card/Empty';
import GetMovies from './GetMovies';

import { LibraryListWrap } from '../Styles';

const MovieList = () => (
    <LibraryListWrap>
        <GetMovies />
        <Empty />
    </LibraryListWrap>
);

export default MovieList;
