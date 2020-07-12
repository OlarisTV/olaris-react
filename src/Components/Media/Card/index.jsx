/* eslint react/jsx-props-no-spreading: ["off"] */
import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import ReactRouterPropTypes from 'react-router-prop-types';

import { getBaseUrl, generateMediaUrl } from 'Helpers';
import { PlayState, File } from 'types/Media';

import Action from './Action';
import MediaInfo from './MediaInfo';
import MediaName from './MediaName';

import { Placeholder, placeholder } from './Placeholder';
import * as S from './Styles';

type Props = {
    type: string,
    uuid: string,
    playState: PlayState,
    wide: boolean,
    showText: boolean,
    history: ReactRouterPropTypes,
    name: string,
    posterPath?: string,
    stillPath?: string,
    totalDuration: number,
    files: File[],
};

const Card = ({
    type,
    uuid,
    playState,
    wide,
    showText,
    history,
    name,
    posterPath,
    stillPath,
    totalDuration,
    files,
    ...props
}: Props) => {
    const [url, setUrl] = useState('');
    const [hover, setHover] = useState(false);
    const showPlay = type === 'Movie' || type === 'Episode';
    const imgUrl = `${getBaseUrl()}/olaris/m/images/tmdb/w342`;

    useEffect(() => {
        setUrl(generateMediaUrl(type, uuid));
    }, []);

    return (
        <>
            <S.CardWrap
                onClick={() => history.push(url)}
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
            >
                <S.PosterWrap title={name}>
                    <S.Lazy
                        wide={wide}
                        height={0}
                        debounce={100}
                        offset={300}
                        placeholder={<Placeholder type={type} />}
                        overflow
                        resize
                    >
                        <S.CardPoster
                            hover={hover}
                            wide={wide}
                            bgimg={stillPath || posterPath ? `${imgUrl}/${stillPath || posterPath}` : placeholder}
                        >
                            <MediaInfo
                                playState={playState}
                                length={totalDuration && totalDuration}
                                showPlayStatus={showPlay}
                                {...props}
                            />
                        </S.CardPoster>
                    </S.Lazy>
                    {hover && (
                        <Action
                            name={name}
                            showPlay={showPlay}
                            playState={playState}
                            url={url}
                            selectedFile={files && files[0]}
                            history={history}
                            type={type}
                            uuid={uuid}
                        />
                    )}
                </S.PosterWrap>
                {showText && <MediaName name={name} type={type} {...props} />}
            </S.CardWrap>
        </>
    );
};

Card.defaultProps = {
    posterPath: null,
    stillPath: null,
};

export default withRouter(Card);
