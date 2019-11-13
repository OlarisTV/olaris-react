import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Script from 'react-load-script';

import CastControls from './CastControls';
import { castStatusCheck } from './castActions';

class CastPlayer extends Component {
    handleScriptLoad = () => {
        const { isCasting, castPlaying } = this.props;

        const initializeCastApi = () => {
            cast.framework.CastContext.getInstance().setOptions({
                receiverApplicationId: 'EA238E27',
                autoJoinPolicy: chrome.cast.AutoJoinPolicy.ORIGIN_SCOPED,
            });
        };

        // eslint-disable-next-line
        window['__onGCastApiAvailable'] = (isAvailable) => {
            if (isAvailable) {
                initializeCastApi();
                castStatusCheck(isCasting, castPlaying);
            }
        };
    };

    render() {
        const { metadata, playstate, castSending, castPlaying, isCasting } = this.props;

        return (
            <>
                <Script
                    url="https://www.gstatic.com/cv/js/sender/v1/cast_sender.js?loadCastFramework=1"
                    onLoad={() => this.handleScriptLoad()}
                />
                {isCasting && (
                    <CastControls
                        metadata={metadata}
                        playstate={playstate}
                        castSending={castSending}
                        castPlaying={castPlaying}
                    />
                )}
            </>
        );
    }
}

CastPlayer.propTypes = {
    isCasting: PropTypes.bool.isRequired,
    castPlaying: PropTypes.bool.isRequired,
    castSending: PropTypes.bool.isRequired,
    metadata: PropTypes.shape({}),
    playstate: PropTypes.shape({}).isRequired,
};

CastPlayer.defaultProps = {
    metadata: {},
};

const mapStateToProps = (state) => {
    const { cast } = state;

    return {
        isCasting: cast.connected,
        castPlaying: cast.playing,
        castSending: cast.sending,
        metadata: cast.metadata,
        playstate: cast.playstate,
    };
};

export default connect(mapStateToProps, null)(CastPlayer);
