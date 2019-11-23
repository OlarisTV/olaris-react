// @flow
/* eslint react/jsx-props-no-spreading: ["off"] */
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import type { HashHistory } from 'history/createHashHistory';

import { faSpinner, faSearch } from '@fortawesome/free-solid-svg-icons';

import { InputWrap, LoadingIcon, SearchIcon, NoResultsError } from './Styles';

type Props = {
    history: HashHistory,
    loading: boolean,
    toggleFocus: Function,
    hasSuggestions: boolean,
    value?: string,
    location: {
        pathname: string,
    },
    unmount: Function,
    inputProps: {
        onFocus?: Function,
        onBlur?: Function,
        onChange?: Function,
    },
};

type State = {
    hasFocus: boolean,
    value: string,
};

class SearchInput extends Component<Props, State> {
    constructor() {
        super();

        this.state = {
            hasFocus: false,
            value: '',
        };
    }

    setFocus = (e, hasFocus) => {
        const { toggleFocus, inputProps } = this.props;

        this.setState({ hasFocus }, () => {
            toggleFocus(hasFocus);
            if (hasFocus) {
                inputProps.onFocus(e);
            } else {
                inputProps.onBlur(e);
            }
        });
    };

    setSearch = (e) => {
        const { inputProps } = this.props;

        this.setState({ value: e.target.value });
        inputProps.onChange(e);
    };

    checkKey = (e) => {
        const { location, history, unmount } = this.props;
        const { value } = this.state;

        const splitloc = location.pathname.split('/');
        const currentLocation = splitloc.pop() || splitloc.pop();

        if (e.key === 'Enter' && value.replace(/\s*$/, '') !== currentLocation.replace(/\s*$/, '')) {
            unmount();

            history.push(`/search/${value}`);
        }
    };

    render() {
        const { hasFocus } = this.state;
        const { loading, hasSuggestions, value, inputProps } = this.props;

        const noResults = !hasSuggestions && hasFocus && !loading && value.length > 3;

        return (
            <InputWrap hasFocus={hasFocus}>
                {loading && <LoadingIcon icon={faSpinner} spin />}
                <SearchIcon icon={faSearch} />
                <input
                    {...inputProps}
                    onFocus={(e) => {
                        this.setFocus(e, true);
                    }}
                    onBlur={(e) => {
                        this.setFocus(e, false);
                    }}
                    onChange={(e) => {
                        this.setSearch(e);
                    }}
                    onKeyPress={(e) => {
                        this.checkKey(e);
                    }}
                />

                {noResults && <NoResultsError>No Results Found</NoResultsError>}
            </InputWrap>
        );
    }
}

SearchInput.defaultProps = {
    value: '',
};

export default withRouter(SearchInput);
