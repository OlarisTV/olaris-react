import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { aFadeIn } from 'Styles/Animations';

const animation = (props) =>
    css`
        ${aFadeIn} 0.2 infinite alternate;
    `;

export const Input = styled.input`
    padding: 0 6.5rem 0 1.5rem;
    line-height: 5rem;
    border-radius: 0.2rem;
    color: #fff;
    display: block;
    float: left;
    width: 100%;
    border: 0;
    transition: 0.2s;
    font-weight: 600;
    font-size: 1.5rem;
    background: rgba(0, 0, 0, 0.2);
    margin: 0 0 1rem;

    &:focus {
        outline: none;
        color: #fff;
        background: #0e0f18;
    }
`;

export const DropdownIcon = styled(FontAwesomeIcon)`
    color: #fff;
    font-size: 1.8rem;
    height: 5rem;
    width: 5rem;
`;

export const SelectStyle = {
    container: (base) => ({
        ...base,
        flex: 1,
        width: '100%',
        float: 'left',
    }),
    option: (base, { isDisabled }) => ({
        ...base,
        cursor: 'pointer',
        backgroundColor: '#0e0f18 !important',
        transition: '.2s all',
        color: '#FFF',
        opacity: isDisabled ? 0.2 : 1,

        '&:hover': {
            color: '#FF9B3D',
        },
    }),
    control: (base, { menuIsOpen }) => ({
        width: '100%',
        background: menuIsOpen ? '#0e0f18' : 'rgba(0,0,0,0.2)',
        cursor: 'pointer',
        color: '#FF9B3D',
        position: 'relative',
        float: 'left',
        padding: '0 1.5rem',
        height: '5rem',
        margin: '0 0 1rem',
        borderRadius: '0.2rem',
    }),
    placeholder: (base) => ({
        ...base,
        color: 'rgba(255,255,255,.1)',
    }),
    menu: (base) => ({
        ...base,
        width: 'auto',
        borderRadius: '0',
        overflow: 'hidden',
        cursor: 'pointer',
        animation: animation,
        margin: '0',
        width: '100%',
        boxShadow: 'none',
        borderRadius: '0.2rem',
    }),
    menuList: (base) => ({
        ...base,
        padding: '1rem',
        backgroundColor: '#0e0f18 !important',
        margin: '0',
        fontSize: '1.4rem',
        fontWeight: '600',
        whiteSpace: 'pre-wrap',
        wordBreak: 'break-all',
        overflow: 'hidden',
        lineHeight: '2rem',
        border: 'none',
        textTransform: 'capitalize',
    }),
    valueContainer: (base) => ({
        ...base,
        fontWeight: 600,
        fontSize: '1.4rem',
        lineHeight: '5rem',
        height: '5rem',
        float: 'left',
        width: '100%',
        display: 'inline-block',
        padding: '0',
    }),
    dropdownIndicator: (base) => ({
        ...base,
        padding: 0,
        marginLeft: '1rem',
        color: '#FF9B3D',
        height: '5rem',
        position: 'absolute',
        top: '0',
        right: '0',
        width: '5rem',
        display: 'flex',
        justifyContent: 'center',
        transition: '0.2s all',
    }),
    indicatorSeparator: () => ({
        display: 'none',
    }),
    singleValue: (base) => ({
        ...base,
        color: '#FFF',
        margin: 0,
        overflow: 'hidden',
        height: '5rem',
        width: '100%',
    }),
};
