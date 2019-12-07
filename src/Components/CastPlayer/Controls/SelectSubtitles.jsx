// @flow
import React, { Component } from 'react';

import Select from 'react-select';
import { SelectStyle } from './Styles';

type Props = {
    menuIsOpen: boolean,
    onChange: Function,
    value: Object,
    options: Array<Object>,
}

type State = {
    menuIsOpen: boolean,
};

export default class SelectSubtitles extends Component<Props, State> {
    select: ?Select;

    constructor(props: Props) {
        super(props);
        this.state = {
            menuIsOpen: false,
        };
    }

    componentDidMount() {
        const { menuIsOpen } = this.props;

        this.setState({ menuIsOpen });
    }

    static getDerivedStateFromProps(nextProps: Props, prevState: State) {
        if (nextProps.menuIsOpen !== prevState.menuIsOpen) {
            return {
                menuIsOpen: nextProps.menuIsOpen,
            };
        }

        return null;
    }

    toggleMenuIsOpen = () => {
        const { menuIsOpen } = this.state;

        if (this.select) {
            return menuIsOpen ? this.select.focus() : this.select.blur();
        }

        return false;
    };

    generateSubtiles = (tracks: Array<Object>) => {
        const options = [];

        options.push({ value: 9999, label: 'None' });

        tracks.forEach((track) => {
            if (!track.select) return false;

            const subtitleTrack = {
                value: track.trackId,
                label: track.name,
            };

            options.push(subtitleTrack);
            return true;
        });

        return options;
    };

    render() {
        const { menuIsOpen } = this.state;
        const { onChange, value, options } = this.props;

        return (
            <>
                <Select
                    ref={(ref) => {
                        this.select = ref;
                    }}
                    value={value}
                    options={this.generateSubtiles(options)}
                    onChange={(val) => onChange(val)}
                    placeholder="Select Subtitles"
                    menuIsOpen={menuIsOpen}
                    styles={SelectStyle}
                    name="subtitles"
                    menuPlacement="top"
                />
            </>
        );
    }
}
