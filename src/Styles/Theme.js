import { darken } from 'polished'

const Theme = {
    primary: `#6b5697`,
    secondary: `#93A4B6`,
    text: `#5D6680`,
    dark: `#282137`,
    light: `#F5F7FA`,
    background: `#171B32`,
    darken: {
        primary: darken(0.2, '#6b5697'),
        dark: darken(0.2, '#282137'),
    },
    alerts: {
        success: `#81A35A`,
        error: `#E83C50`,
        info: `#4C6EAC`
    },
    layout: {
        header: '6rem',
        sidebar: '25rem'
    }
}

export default Theme