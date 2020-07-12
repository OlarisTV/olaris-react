import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { Auth, checkAuth } from 'Client/Auth';
import { playerState } from 'Redux/components/player/selectors';

import ContentWrap from 'Containers/ContentWrap';
import Header from 'Components/Header';
import Sidebar from 'Components/Sidebar';
import Routes from 'Routes';
import ModalContainer from 'Containers/ModalContainer';
import Player from 'Containers/Player';
import CastPlayer from 'Components/CastPlayer';

import * as S from './Styles';

const App = () => {
    const player = useSelector((state) => playerState(state));

    useEffect(() => {
        checkAuth();
    }, []);

    const LoggedIn = () => (
        <>
            <Sidebar />
            <ContentWrap>
                <>
                    <Header />
                    <Routes />
                </>
            </ContentWrap>
            <ModalContainer />
            <CastPlayer />
            {player && <Player />}
        </>
    );

    return (
        <S.AppWrap authed={Auth.isAuthenticated}>
            {Auth.isAuthenticated ? (
                <LoggedIn />
            ) : (
                <>
                    <Routes />
                    <CastPlayer />
                </>
            )}
        </S.AppWrap>
    );
};

export default withRouter(App);
