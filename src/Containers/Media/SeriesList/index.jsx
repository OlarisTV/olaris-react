import React from 'react';

import Empty from 'Components/Media/Card/Empty';
import GetSeries from './GetSeries';

import { LibraryListWrap } from '../Styles';

const SeriesList = () => (
    <LibraryListWrap>
        <GetSeries />
        <Empty />
    </LibraryListWrap>
);

export default SeriesList;
