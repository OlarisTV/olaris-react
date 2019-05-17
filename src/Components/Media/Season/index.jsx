import React from 'react';
import PropTypes from 'prop-types';

import { getBaseUrl, generateMediaUrl } from 'Helpers';

import Breadcrumbs from 'Components/Breadcrumbs';
import Media from 'Components/Media/Card';
import MediaDescription from 'Components/Media/MediaItem/MediaOverview/MediaDescription';
import MediaListHeader from '../MediaListHeader';

import {
  MediaFullWrap,
  MediaLeftCol,
  MediaRightCol,
  MediaNameLink,
  MediaRelease,
  SeasonNumber,
  SubTitle,
  MediaBackground,
} from '../Styles';
import EpisodesWrap from './Styles';

const Season = (props) => {
  const {
    name,
    uuid,
    posterPath,
    airDate,
    overview,
    children,
    episodes,
    series,
  } = props;

  const releaseDate = `(${(airDate.split('-')[0])})`;

  return (
    <MediaFullWrap>
      <Breadcrumbs props={props} />
      <MediaBackground bgimg={`${getBaseUrl()}/olaris/m/images/tmdb/w342/${posterPath}`} />
      <MediaLeftCol>
        <Media size="large" {...props} hover={false} />
      </MediaLeftCol>
      <MediaRightCol>
        <MediaListHeader data={episodes} type="season" uuid={uuid} />
        <MediaNameLink to={generateMediaUrl('series', series.uuid)}>
          {series.name}
        </MediaNameLink>
        <SeasonNumber>
          {name}
          <MediaRelease>{releaseDate}</MediaRelease>
        </SeasonNumber>
        {overview.length > 0 && <MediaDescription overview={overview} />}
        <SubTitle>Episodes</SubTitle>

        <EpisodesWrap>{children}</EpisodesWrap>
      </MediaRightCol>
    </MediaFullWrap>
  );
};

Season.propTypes = {
  name: PropTypes.string.isRequired,
  episodes: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      uuid: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

export default Season;
