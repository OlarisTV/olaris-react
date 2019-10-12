import React from 'react';
import PropTypes from 'prop-types';

import { getBaseUrl, generateMediaUrl } from 'Helpers';

import Breadcrumbs from 'Components/Breadcrumbs';
import Media from 'Components/Media/Card';
import MediaDescription from 'Components/Media/MediaItem/MediaOverview/MediaDescription';
import MediaListHeader from '../MediaHeader/MediaListHeader';

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

const Season = ({ name, uuid, posterPath, airDate, overview, children, episodes, series, type }) => {
    const releaseDate = `(${airDate.split('-')[0]})`;

    return (
        <MediaFullWrap>
            <Breadcrumbs name={name} series={series} type={type} />
            <MediaBackground bgimg={`${getBaseUrl()}/olaris/m/images/tmdb/w342/${posterPath}`} />
            <MediaLeftCol>
                <Media size="large" hover={false} name={name} posterPath={posterPath} type={type} />
            </MediaLeftCol>
            <MediaRightCol>
                <MediaListHeader data={episodes} type="season" uuid={uuid} />
                <MediaNameLink to={generateMediaUrl('series', series.uuid)}>{series.name}</MediaNameLink>
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
    uuid: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    posterPath: PropTypes.string,
    overview: PropTypes.string,
    airDate: PropTypes.string,
    type: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
    series: PropTypes.shape({
        uuid: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
    }).isRequired,
    episodes: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
            uuid: PropTypes.string.isRequired,
        }),
    ).isRequired,
};

Season.defaultProps = {
    posterPath: null,
    airDate: null,
    overview: '',
};

export default Season;
