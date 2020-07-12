import styled from 'styled-components';

export const Player = styled.section`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.85);
    z-index: 10;
    justify-content: center;
    align-items: center;
    color: #fff;
    display: flex;

    > div {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
    }
`;
