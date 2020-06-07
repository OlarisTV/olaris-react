import { darken, lighten } from 'polished';

const Theme = {
    primary: '#FF9B3D',
    secondary: '#C9CCD1',
    text: '#333545',
    dark: '#262737',
    light: '#F5F7FA',
    background: '#191a28',
    playbar: '#FF9B3D',
    sidebar: '#1f202f',
    color: {
        background: '#262737',
    },
    darken: {
        primary: darken(0.2, '#FF9B3D'),
        dark: darken(0.1, '#262737'),
        background: darken(0.1, '#191a28'),
    },
    lighten: {
        dark: lighten(0.2, '#262737'),
        background: lighten(0.1, '#191a28'),
    },
    alerts: {
        success: '#81A35A',
        error: '#E83C50',
        info: '#FFF',

        darken: {
            success: darken(0.1, '#81A35A'),
            error: darken(0.1, '#E83C50'),
        },
    },
    layout: {
        header: '5rem',
        sidebar: '27.4rem',
        search: '30rem',
        player: '9rem',
        playerMobile: '18rem',
    },
    fonts: {
        opensans: '"Open Sans", sans-serif',
        muli: '"Muli", sans-serif',
    },
    card: {
        width: '14rem',
        maxWidth: '18rem',
        margin: '0 1.5rem 3rem',
        paddingTop: 'calc(513 / 342 * 100%)',
    },
    wideCard: {
        width: '20rem',
        maxWidth: '30rem',
        margin: '0 1.5rem 3rem',
        paddingTop: '12rem',
    },
};

export default Theme;
