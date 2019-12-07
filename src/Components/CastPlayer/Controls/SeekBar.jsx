// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedTime } from 'react-player-controls';

import { setCastPlaystate } from 'Redux/Actions/castActions';

import { SeekBarWrap, SeekBarSlider, SliderHandle, SliderBar } from './Styles';


type OwnProps = {
    playstate?: Object,
    seek: Function,
    playPause: Function,
    isPaused: boolean,
};

type Props = {
    ...OwnProps,
    setPlaystate: Function,
}

type State = {
    isSeeking: boolean,
    isEnabled: boolean,
    direction: string,
    value: number,
};

class SeekBar extends Component<Props, State> {
    constructor(props) {
        super(props);

        this.state = {
            isSeeking: false,
            isEnabled: true,
            direction: 'HORIZONTAL',
            value: 0,
        };
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        const { isSeeking } = prevState;
        const { playtime, total } = nextProps.playstate;

        if (isSeeking) return {};

        if (typeof playtime !== 'undefined') {
            return {
                value: playtime === 0 ? 0 : (100 * playtime) / total / 100,
            };
        }

        return {};
    }

    seeking = (value) => {
        const { setPlaystate, playstate } = this.props;

        this.setState({ value });

        setPlaystate({
            playtime: value * playstate.total,
        });
    };

    seekStart = () => {
        const { playPause, isPaused } = this.props;

        this.setState({ isSeeking: true });

        if (!isPaused) playPause();
    };

    seekEnd = (val) => {
        const { seek } = this.props;
        const { isSeeking } = this.state;

        if (isSeeking) seek(val);

        this.setState({ isSeeking: false });
    };

    render() {
        const { playstate } = this.props;
        const { direction, isEnabled, value } = this.state;

        return (
            <SeekBarWrap>
                <FormattedTime numSeconds={playstate.playtime} />
                <SeekBarSlider
                    direction={direction}
                    isEnabled={isEnabled}
                    onChangeStart={() => this.seekStart()}
                    onChange={(newValue) => this.seeking(newValue)}
                    onChangeEnd={(endValue) => this.seekEnd(endValue * playstate.total)}
                >
                    <SliderBar direction={direction} value={value} />
                    <SliderHandle direction={direction} value={value} />
                </SeekBarSlider>

                <FormattedTime numSeconds={playstate.total} />
            </SeekBarWrap>
        );
    }
}

SeekBar.defaultProps = {
    playstate: {
        playtime: 0,
        total: 0,
        volume: 1,
    },
};


const mapDispatchToProps = (dispatch) => ({
    setPlaystate: (playstate) => dispatch(setCastPlaystate(playstate)),
});

export default connect<Props, OwnProps, _, _, _, _>(null, mapDispatchToProps)(SeekBar);
