// @flow
import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

type Props = {
    relative?: boolean,
    fsize?: string,
};

const LoadingSpinner = styled(FontAwesomeIcon)`
    color: ${(props) => props.theme.primary};
    font-size: ${(props) => props.fsize};
    position: ${(props) => (props.relative ? 'relative' : 'absolute')};
    top: 50%;
    left: 50%;
    margin-top: -${(props) => props.fsize.replace('rem', '') / 2}rem;
    margin-left: -${(props) => props.fsize.replace('rem', '') / 2}rem;
`;

const Loading = ({ relative, fsize }: Props) => (
    <LoadingSpinner icon={faSpinner} spin relative={relative ? 1 : 0} fsize={fsize} />
);

Loading.defaultProps = {
    relative: false,
    fsize: '1.8rem',
};

export default Loading;
