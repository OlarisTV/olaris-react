// @flow
import React, { useReducer, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useMutation } from '@apollo/react-hooks';
import { isIOS } from 'react-device-detect';

import REQUEST_STREAM from 'Mutations/requestStream';
import { generateFileList, getBaseUrl, getVideoSource } from 'Helpers';

import Breadcrumbs from 'Components/Breadcrumbs';
import Card from '../Card';
import ItemHeader from '../Header/ItemHeader';
import Overview from './Overview';
import Video from './Video';

import * as S from './Styles';

const init = (initialState) => {
    const { files } = initialState;
    const generatedFiles = generateFileList(files);

    return {
        resume: false,
        autoPlay: false,
        files: generatedFiles,
        selectedFile: generatedFiles[0],
        streams: null,
        mimetype: null,
        source: null,
    };
};

const reducer = (state, action) => {
    switch (action.type) {
        case 'PLAYER_STATE':
            return {
                ...state,
                resume: action.payload.resume,
                autoplay: action.payload.autoplay,
            };
        case 'SET_STREAM_DATA':
            return {
                ...state,
                mimetype: action.payload.mimetype,
                source: action.payload.source,
            };
        default:
            throw new Error();
    }
};

type File = {
    fileName: string,
    filePath: string,
};

type Item = {
    files: Array<File>,
};

type Props = {
    uuid: string,
    media: Object<Item>,
};

const MediaItem = ({ uuid, media }: Props) => {
    const location = useLocation();
    const [state, dispatch] = useReducer(reducer, { files: media.files }, init);
    const { files, selectedFile, resume, mimetype, source } = state;
    const [reqestStream] = useMutation(REQUEST_STREAM, {
        onCompleted({ createStreamingTicket: stream }) {
            fetch(getBaseUrl() + stream.metadataPath)
                .then((res) => res.json())
                .then((res) => getVideoSource(isIOS, stream, res))
                .then((data) =>
                    dispatch({
                        type: 'SET_STREAM_DATA',
                        payload: {
                            mimetype: data.mimetype,
                            source: data.source,
                        },
                    }),
                )
                .catch((err) => err);
        },
    });

    useEffect(() => {
        const { state: locationState } = location;

        if (locationState?.resume || locationState?.autoplay) {
            dispatch({
                type: 'PLAYER_STATE',
                payload: {
                    resume: locationState?.resume,
                    autoplay: locationState?.autoplay,
                },
            });
        }
    }, [location]);

    const buildStream = (resumeStream) => {
        dispatch({
            type: 'PLAYER_STATE',
            payload: { resume: resumeStream },
        });

        reqestStream({
            variables: {
                uuid: selectedFile.uuid,
            },
        });
    };

    return (
        <S.Wrap>
            <Breadcrumbs type={media.type} name={media.name} season={media.season} />
            <S.Item>
                <S.LeftCol>
                    <Card
                        totalDuration={selectedFile.totalDuration}
                        playMedia={buildStream}
                        wide={media.wide}
                        name={media.name}
                        playState={media.playState}
                        posterPath={media.posterPath}
                        type={media.type}
                        uuid={uuid}
                        text
                        internalCard
                    />
                </S.LeftCol>
                <S.RightCol>
                    <ItemHeader uuid={uuid} file={selectedFile} media={media} playMedia={buildStream} />
                    <Overview
                        media={media}
                        selectedFile={selectedFile}
                        files={files}
                        fileChange={() => console.log('File Change')}
                    />
                    <Video
                        resume={resume}
                        source={source}
                        mimetype={mimetype}
                        uuid={uuid}
                        files={files}
                        selectedFile={selectedFile}
                        media={media}
                        closePlayer={() => console.log('Close Player')}
                    />
                </S.RightCol>
            </S.Item>
        </S.Wrap>
    );
};

export default MediaItem;
