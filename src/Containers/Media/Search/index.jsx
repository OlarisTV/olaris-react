// @flow
import React from 'react';
import { useParams } from 'react-router';

import Empty from 'Components/Media/Card/Empty';
import RenderSearchResults from './RenderSearchResults';

import { LibraryListWrap } from '../Styles';

const Search = () => (
    <LibraryListWrap>
        <RenderSearchResults value={useParams().value} />
        <Empty />
    </LibraryListWrap>
);

export default Search;
