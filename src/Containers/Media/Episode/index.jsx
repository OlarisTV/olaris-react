// @flow
import React from 'react';
import { useParams } from 'react-router';

import RenderEpisode from './RenderEpisode';

const Episode = () => <RenderEpisode uuid={useParams().uuid} />;

export default Episode;
