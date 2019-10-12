import React from 'react';
import PropTypes from 'prop-types';
import { useQuery } from '@apollo/react-hooks';

import Loading from 'Components/Loading';
import { AlertInline } from 'Components/Alerts';
import LibraryItem from 'Components/Modal/AddLibraryModal/LibraryItem';

import FETCH_LIBRARIES from 'Queries/fetchLibraries';

const LibraryList = ({ kind }) => {
    const { loading, error, data } = useQuery(FETCH_LIBRARIES);

    if (loading) return <Loading />;
    if (error) return `Error! ${error.message}`;

    const filteredLibrary = data.libraries.filter((l) => l.kind === kind);

    if (!filteredLibrary.length) {
        return <AlertInline>No active folders within library</AlertInline>;
    }

    return filteredLibrary.map((li) => {
        const { filePath, id, backend, healthy } = li;

        return <LibraryItem key={id} filePath={filePath} id={id} backend={backend} healthy={healthy} />;
    });
};

LibraryList.propTypes = {
    kind: PropTypes.number.isRequired,
};

export default LibraryList;
