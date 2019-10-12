import React from 'react';
import PropTypes from 'prop-types';

import { getBaseUrl } from 'Helpers';

import Breadcrumbs from 'Components/Breadcrumbs';
import Media from 'Components/Media/Card';
import MediaDescription from 'Components/Media/MediaItem/MediaOverview/MediaDescription';
import MediaListHeader from '../MediaHeader/MediaListHeader';

import {
    MediaFullWrap,
    MediaLeftCol,
    MediaRightCol,
    MediaName,
    SubTitle,
    MediaRelease,
    MediaBackground,
} from '../Styles';
import SeasonsWrap from './Styles';

const Series = (props) => {
    const { name, uuid, posterPath, overview, firstAirDate, seasons, children, type } = props;

    const releaseDate = `(${firstAirDate.split('-')[0]})`;

    return (
        <MediaFullWrap>
            <Breadcrumbs name={name} type={type} />
            <MediaBackground bgimg={`${getBaseUrl()}/olaris/m/images/tmdb/w342/${posterPath}`} />
            <MediaLeftCol>
                <Media size="large" hover={false} name={name} posterPath={posterPath} type={type} />
            </MediaLeftCol>
            <MediaRightCol>
                <MediaListHeader data={seasons} uuid={uuid} name={name} type="series" />
                <MediaName>
                    {name}
                    <MediaRelease>{releaseDate}</MediaRelease>
                </MediaName>
                {overview.length > 0 && <MediaDescription overview={overview} />}
                <SubTitle>Seasons</SubTitle>
                <SeasonsWrap>{children}</SeasonsWrap>
            </MediaRightCol>
        </MediaFullWrap>
    );
};

Series.propTypes = {
    uuid: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    posterPath: PropTypes.string,
    overview: PropTypes.string,
    firstAirDate: PropTypes.string,
    type: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
    seasons: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
            uuid: PropTypes.string.isRequired,
        }),
    ).isRequired,
};

Series.defaultProps = {
    posterPath: null,
    firstAirDate: null,
    overview: '',
};

export default Series;
