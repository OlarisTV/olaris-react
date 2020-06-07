import React from 'react';
import { compose } from 'lodash/fp';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import ReactToolTip from 'react-tooltip';
import PropTypes from 'prop-types';
import { Auth } from 'Client/Auth';
import { showModal } from 'Redux/Actions/modalActions';

import PlayMedia from './PlayMedia';
import MarkWatched from './MarkWatched';
import RefreshMetadata from './RefreshMetadata';
import MediaMismatch from './MediaMismatch';

import * as S from './Styles';

const ItemHeader = ({ media, uuid, playMedia, file, isConnected }) => {
    const { name, type, playState } = media;

    return (
        <S.Header>
            <ReactToolTip effect="solid" place="left" className="tooltip" />
            <S.Actions>
                <PlayMedia type={type} isConnected={isConnected} playMedia={playMedia} playState={playState} />
                <MarkWatched playState={playState} type={type} uuid={uuid} />
            </S.Actions>
            {Auth.isAdmin.admin && (
                <S.Actions admin>
                    <RefreshMetadata uuid={uuid} />
                    {type === 'Movie' && (
                        <MediaMismatch uuid={file.uuid} name={name} type={type} file={file.filePath} />
                    )}
                </S.Actions>
            )}
        </S.Header>
    );
};

ItemHeader.propTypes = {
    uuid: PropTypes.string.isRequired,
    file: PropTypes.shape({
        uuid: PropTypes.string.isRequired,
        filePath: PropTypes.string.isRequired,
    }),
    media: PropTypes.shape({
        name: PropTypes.string.isRequired,
        playState: PropTypes.shape({
            finished: PropTypes.bool,
            playtime: PropTypes.number,
        }).isRequired,
        type: PropTypes.string.isRequired,
    }).isRequired,
    isConnected: PropTypes.bool,
    playMedia: PropTypes.func.isRequired,
};

ItemHeader.defaultProps = {
    file: null,
    isConnected: false,
};

const mapDispatchToProps = (dispatch) => ({
    sModal: (type, props) => dispatch(showModal(type, props)),
});

export default compose(withRouter, connect(null, mapDispatchToProps))(ItemHeader);
