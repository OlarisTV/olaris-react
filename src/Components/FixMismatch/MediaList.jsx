// @flow
import React from 'react';
import { useMutation } from '@apollo/react-hooks';
import { connect } from 'react-redux';
import { useAlert } from 'react-alert';
import { Redirect } from 'react-router';

import { UPDATE_MOVIE, UPDATE_SERIES } from 'Mutations/fixMismatch';
import { hideModal } from 'Redux/Actions/modalActions';

import Loading from 'Components/Loading';
import { AlertInline } from 'Components/Alerts';
import Scrollbars from 'react-custom-scrollbars';

import * as S from './Styles';

type Result = {
    tmdbID: string,
    name?: string,
    title?: string,
    releaseYear?: string,
    firstAirYear?: string,
};

type OwnProps = {
    uuid: string,
    type: string,
    searchVal?: string,
    networkStatus?: number,
    items: Array<Result>,
};

type Props = {
    ...OwnProps,
    hModal: () => void,
};

const MediaList = ({ hModal, uuid, searchVal, items, networkStatus, type }: Props) => {
    const [fixMismatch, { data, error }] = useMutation(type === 'movie' ? UPDATE_MOVIE : UPDATE_SERIES);
    const alert = useAlert();

    if (networkStatus === 4) return <Loading />;
    if (items.length === 0) return <AlertInline>No results found for {searchVal}</AlertInline>;

    if (data) {
        hModal();
        alert.success('Successfully fixed mismatch');

        return <Redirect to={{ pathname: `/${type === 'movie' ? 'movies' : 'series'}` }} />;
    }

    const mutationHandler = (item) => {
        let input = {
            tmdbID: item.tmdbID,
        };

        if (type === 'movie') {
            input = {
                ...input,
                movieFileUUID: uuid,
            };
        } else {
            input = {
                ...input,
                seriesUUID: uuid,
            };
        }

        fixMismatch({ variables: { input } });
    };

    return (
        <>
            {error && <AlertInline type="error">There was a problem with your request please try again</AlertInline>}
            <Scrollbars
                autoHide
                autoHeight
                autoHeightMax={300}
                renderThumbVertical={S.renderThumb}
                renderTrackVertical={S.renderTrack}
            >
                <S.MediaList>
                    {items.map((item) => (
                        <button type="button" key={item.tmdbID} onClick={() => mutationHandler(item)}>
                            {item.name || item.title} <span>{item.releaseYear || item.firstAirYear}</span>
                        </button>
                    ))}
                </S.MediaList>
            </Scrollbars>
        </>
    );
};

const mapDispatchToProps = (dispatch) => ({
    hModal: () => dispatch(hideModal()),
});

export default connect<Props, OwnProps, _, _, _, _>(null, mapDispatchToProps)(MediaList);
