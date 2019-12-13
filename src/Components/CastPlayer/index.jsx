// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Script from 'react-load-script';

import CastControls from './CastControls';
import { castStatusCheck } from './castActions';

type Props = {
    isCasting: boolean,
    castPlaying: boolean,
    castSending: boolean,
    metadata: Object,
    playstate: Object,
};

declare var cast: Function;
declare var chrome: Function;

class CastPlayer extends Component<Props> {
    handleScriptLoad = () => {
        const { isCasting, castPlaying } = this.props;

        const initializeCastApi = () => {
            cast.framework.CastContext.getInstance().setOptions({
                receiverApplicationId: '3CCE45F7',
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

const mapStateToProps = (state) => {
    return {
        isCasting: state.cast.connected,
        castPlaying: state.cast.playing,
        castSending: state.cast.sending,
        metadata: state.cast.metadata,
        playstate: state.cast.playstate,
    };
};

export default connect<Props, Props, _, _, _, _>(mapStateToProps, null)(CastPlayer);

