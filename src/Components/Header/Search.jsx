// @flow
import React from 'react';
import { connect } from 'react-redux';

import { toggleSearch } from 'Redux/Actions/searchActions';

import { faSearch } from '@fortawesome/free-solid-svg-icons';

import * as S from './Styles';

type OwnProps = {};

type Props = {
    ...OwnProps,
    open: boolean,
    dispatch: Function,
};

const Search = ({ open, dispatch }: Props) => {
    return (
        <S.NavButton onClick={() => dispatch(toggleSearch(!open))}>
            <S.NavIcon icon={faSearch} />
        </S.NavButton>
    );
};

const mapStateToProps = (state) => {
    return {
        open: state.search.open,
    };
};

export default connect<Props, OwnProps, *, *, *, *>(mapStateToProps)(Search);
