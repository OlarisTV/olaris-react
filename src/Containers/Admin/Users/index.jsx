import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';

import CREATE_USER_INVITE from 'Mutations/createUserInvite';
import FETCH_INVITES from 'Queries/fetchInvites';

import { InnerContent, PageHeading } from 'Containers/Styles';
import CreateInvite from 'Components/Admin/Users/CreateInvite';
import RenderUsers from './RenderUsers';
import RenderInvites from './RenderInvites';

import { List, ListHeading } from './Styles';

class Users extends Component {
    generateUserInvite = () => {
        const { mutate } = this.props;

        mutate({
            refetchQueries: [{ query: FETCH_INVITES }]
        }).catch((err) => err);
    };

    render() {
        return (
            <InnerContent>
                <PageHeading>User Management</PageHeading>
                <List>
                    <ListHeading>Userlist</ListHeading>
                    <RenderUsers />
                </List>
                <List>
                    <ListHeading>Invites</ListHeading>
                    <RenderInvites />
                    <CreateInvite
                        generateInvite={() => this.generateUserInvite()}
                    />
                </List>
            </InnerContent>
        );
    }
}

Users.propTypes = {
    mutate: PropTypes.func.isRequired
};

export default (Users = graphql(CREATE_USER_INVITE)(Users));
