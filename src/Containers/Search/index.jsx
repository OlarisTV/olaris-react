// @flow
import React from 'react';
import { connect } from 'react-redux';

import { toggleSearch } from 'Redux/Actions/searchActions';

import { faTimes } from '@fortawesome/free-solid-svg-icons';

import * as S from './Styles';

type OwnProps = {};

type Props = {
    ...OwnProps,
    open: boolean,
    dispatch: Function,
};

const Search = ({ open, dispatch }: Props) => {
    if (!open) return null;

    return (
        <S.SearchWrap>
            <S.CloseButton onClick={() => dispatch(toggleSearch(!open))}>
                <S.CloseIcon icon={faTimes} />
            </S.CloseButton>
        </S.SearchWrap>
    );
};

const mapStateToProps = (state) => {
    return {
        open: state.search.open,
    };
};

export default connect<Props, OwnProps, *, *, *, *>(mapStateToProps)(Search);
