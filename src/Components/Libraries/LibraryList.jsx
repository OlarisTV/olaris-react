import React from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';

import Loading from 'Components/Loading';
import { AlertInline } from 'Components/Alerts';
import LibraryItem from 'Components/Modal/AddLibraryModal/LibraryItem';

import FETCH_LIBRARIES from 'Queries/fetchLibraries';

const LibraryList = ({ kind }) => (
    <Query query={FETCH_LIBRARIES}>
        {({ loading, error, data }) => {
            if (loading) return <Loading relative />;
            if (error) return `Error! ${error.message}`;

            const filteredLibrary = data.libraries.filter((l) => l.kind === kind);

            if (filteredLibrary.length === 0) {
                return <AlertInline>No active folders within library</AlertInline>;
            }

            return filteredLibrary.map((li) => <LibraryItem key={li.id} {...li} />);
        }}
    </Query>
);

LibraryList.propTypes = {
    kind: PropTypes.number.isRequired,
};

export default LibraryList;
