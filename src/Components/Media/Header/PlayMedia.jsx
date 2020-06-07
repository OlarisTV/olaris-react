import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { faPlay } from '@fortawesome/free-solid-svg-icons';

import { showModal, RESUME_MODAL } from 'Redux/Actions/modalActions';

import { HeaderIconWrap, HeaderIcon } from './Styles';

const PlayMedia = ({ isConnected, type, playState, sModal, playMedia }) => {
    const playText = `${isConnected ? 'Cast' : 'Play'} ${type}`;

    const resumeModal = () => {
        if (playState.playtime === 0) {
            playMedia();
            return false;
        }

        sModal(RESUME_MODAL, {
            title: 'Resume media',
            playMedia,
            playState,
        });

        return false;
    };

    return (
        <HeaderIconWrap onClick={() => resumeModal()} data-tip={playText}>
            <HeaderIcon icon={faPlay} />
        </HeaderIconWrap>
    );
};

PlayMedia.propTypes = {
    playState: PropTypes.shape({
        finished: PropTypes.bool,
        playtime: PropTypes.number,
    }).isRequired,
    type: PropTypes.string.isRequired,
    isConnected: PropTypes.bool.isRequired,
    playMedia: PropTypes.func.isRequired,
    sModal: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
    sModal: (type, props) => dispatch(showModal(type, props)),
});

export default connect(
    null,
    mapDispatchToProps,
)(PlayMedia);
