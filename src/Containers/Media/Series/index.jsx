import React from 'react';
import { useParams } from 'react-router';

import RenderSeries from './RenderSeries';

const Series = () => <RenderSeries uuid={useParams().uuid} />;

export default Series;
