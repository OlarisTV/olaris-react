import React from 'react';
import PropTypes from 'prop-types';
import { useAlert } from 'react-alert';

import { copyToClipboard } from 'Helpers';

import { faCopy } from '@fortawesome/free-regular-svg-icons';
import { UserListItem, CopyInvite } from './Styles';

const InviteItem = ({ code }) => {
    const alert = useAlert();

    const handleClick = () => {
        copyToClipboard(code);
        alert.success('Copied invite to clipboard');
    };

    return (
        <UserListItem>
            {code}
            <CopyInvite icon={faCopy} onClick={() => handleClick()} />
        </UserListItem>
    );
};

InviteItem.propTypes = {
    code: PropTypes.string.isRequired,
};

export default InviteItem;
