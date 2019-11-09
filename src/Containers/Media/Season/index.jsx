// @flow
import React from 'react';
import { useParams } from 'react-router';

import RenderSeason from './RenderSeason';

const Season = () => <RenderSeason uuid={useParams().uuid} />;

export default Season;
