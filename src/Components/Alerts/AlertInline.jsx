// @flow
import React, { type Node } from 'react';

import { AlertInlineWrap } from './Styles';

type Props = {
    type?: 'info' | 'success' | 'error',
    children: Node,
};

const AlertInline = ({ type, children }: Props) => <AlertInlineWrap type={type}>{children}</AlertInlineWrap>;

AlertInline.defaultProps = {
    type: 'info',
};

export default AlertInline;
