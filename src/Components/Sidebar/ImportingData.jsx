import React from 'react';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';

import Loading from 'Components/Loading';
import { LoadingWrap } from './Styles';

const LIBRARY_STATE = gql`
    query {
        libraries {
            kind
            isRefreshing
        }
    }
`;

const Importing = ({ kind }) => (
    <Query query={LIBRARY_STATE} pollInterval={1000}>
        {({ loading, error, data, stopPolling }) => {
            if (loading) return null;
            if (error) return `Error! ${error}`;
            if (!data.libraries) return null;

            let importing = false;

            data.libraries.forEach((lib) => {
                if (kind === lib.kind) {
                    importing = lib.isRefreshing;
                }
            });

            if (!importing) {
                stopPolling();

                return null;
            }

            return (
                <LoadingWrap>
                    <Loading relative fsize="1rem" />
                </LoadingWrap>
            );
        }}
    </Query>
);

Importing.propTypes = {
    kind: PropTypes.number.isRequired,
};

export default Importing;
