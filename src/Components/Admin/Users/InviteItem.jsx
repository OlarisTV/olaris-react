// @flow
import React from 'react';
import { useAlert } from 'react-alert';

import { copyToClipboard } from 'Helpers';

import { faCopy } from '@fortawesome/free-regular-svg-icons';
import * as S from './Styles';

type Props = {
    code: string,
};

const InviteItem = ({ code }: Props) => {
    const alert = useAlert();

    const handleClick = () => {
        copyToClipboard(code);
        alert.success('Copied invite to clipboard');
    };

    return (
        <S.UserListItem>
            {code}
            <S.CopyInvite icon={faCopy} onClick={() => handleClick()} />
        </S.UserListItem>
    );
};

export default InviteItem;
