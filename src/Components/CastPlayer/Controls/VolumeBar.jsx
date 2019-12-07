// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { setCastPlaystate } from 'Redux/Actions/castActions';

import { SeekBarWrap, SeekBarSlider, SliderHandle, SliderBar } from './Styles';

type State = {
    isEnabled: boolean,
    isSeeking: boolean,
    direction: string,
    value: number,
};

type OwnProps = {
    playstate?: Object<{ volume: number }>,
    setVolume: Function,
    isMuted?: boolean,
}

type Props = {
    ...OwnProps,
    setPlaystate: Function,
};

class VolumeBar extends Component<Props, State> {
    constructor(props) {
        super(props);
        this.state = {
            isEnabled: true,
            isSeeking: false,
            direction: 'HORIZONTAL',
            value: 0,
        };
    }

    componentDidMount() {
        const { playstate } = this.props;

        this.setState({ value: playstate.volume });
    }

    static getDerivedStateFromProps(nextProps) {
        const { volume } = nextProps.playstate;

        return {
            value: volume,
        };
    }

    volumeChange = (value) => {
        const { setPlaystate } = this.props;

        this.setState({
            value,
            isSeeking: true,
        });

        setPlaystate({
            volume: value,
        });
    };

    volumeEnd = (value) => {
        const { setVolume } = this.props;
        const { isSeeking } = this.state;

        if (isSeeking) setVolume(value);

        this.setState({
            value,
            isSeeking: false,
        });
    };

    render() {
        const { isMuted } = this.props;
        const { direction, isEnabled, value } = this.state;

        return (
            <SeekBarWrap maxWidth={10} marginLeft={1}>
                <SeekBarSlider
                    direction={direction}
                    isEnabled={isEnabled}
                    onChange={(newValue) => this.volumeChange(newValue)}
                    onChangeEnd={(endValue) => this.volumeEnd(endValue)}
                >
                    <SliderBar direction={direction} value={value} isMuted={isMuted} />
                    <SliderHandle direction={direction} value={value} />
                </SeekBarSlider>
            </SeekBarWrap>
        );
    }
}

VolumeBar.defaultProps = {
    playstate: {
        volume: 1,
    },
    isMuted: false,
};

const mapDispatchToProps = (dispatch) => ({
    setPlaystate: (playstate) => dispatch(setCastPlaystate(playstate)),
});

export default connect<Props, OwnProps, _, _, _, _>(null, mapDispatchToProps)(VolumeBar);
