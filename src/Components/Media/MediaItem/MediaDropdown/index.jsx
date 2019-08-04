import React from 'react';
import PropTypes from 'prop-types';

import { faEllipsisH } from '@fortawesome/free-solid-svg-icons';
import { MediaActionsDropdown } from '../Styles';

import RefreshMetadata from './RefreshMetadata';
import EditMediaData from './EditMediaData';

const MediaDropdown = ({ uuid, name, type }) => (
    <MediaActionsDropdown icon={faEllipsisH}>
        <RefreshMetadata uuid={uuid} />
        {type === 'Movie' && <EditMediaData name={name} />}
    </MediaActionsDropdown>
);

MediaDropdown.propTypes = {
    uuid: PropTypes.string.isRequired,
    name: PropTypes.string,
    type: PropTypes.string.isRequired,
};

MediaDropdown.defaultProps = {
    name: 'Media',
};

export default MediaDropdown;
