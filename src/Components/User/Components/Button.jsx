// @flow
import React, { useState, type Node } from 'react';

import * as S from '../Styles';

type Props = {
    children: Node,
    callback: Function,
};

const Button = ({ children, callback }: Props) => {
    const [throttle, setThrottle] = useState(false);

    const onClick = () => {
        setThrottle(true);
        callback();

        setTimeout(() => {
            setThrottle(false);
        }, 500);
    };

    return (
        <S.FormButton type="submit" onClick={() => onClick()} disabled={throttle}>
            {children}
        </S.FormButton>
    );
};

export default Button;
