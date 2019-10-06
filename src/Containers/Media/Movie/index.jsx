import React from 'react';
import { useParams } from 'react-router';

import RenderMovie from './RenderMovie';

const Movie = () => <RenderMovie uuid={useParams().uuid} />;

export default Movie;
