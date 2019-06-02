import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

import Loading from 'Components/Loading';
import { setLibraryStatus } from 'Redux/Actions/libraryActions';

import { LoadingWrap } from './Styles';

const GET_LIBRARY_STATUS = gql`
    {
        libraries {
            kind
            isRefreshing
        }
    }
`;

const Importing = ({ name, dispatch, importing }) => (
    <Query
        query={GET_LIBRARY_STATUS}
        fetchPolicy="network-only"
        pollInterval={500}
    >
        {({ loading, error, data }) => {
            if (loading) return false;
            if (error) return false;

            const kind = name === 'movies' ? 0 : 1;
            const showLoader = importing.indexOf(name) > -1;

            const setImportStatus = (name) => {
                if (!importing.includes(name)) {
                    dispatch(setLibraryStatus([...importing, name]));
                }
            };

            const removeImportStatus = (name) => {
                const filteredImport = importing.filter((i) => i !== name);

                if (importing.includes(name)) {
                    dispatch(setLibraryStatus(filteredImport));
                }
            };

            if (data.libraries) {
                const filteredLibrary = data.libraries.filter(
                    (l) => l.kind === kind,
                );
                let isImporting = false;
                if (filteredLibrary.length === 0) return false;

                for (let i = 0; i < filteredLibrary.length; i += 1) {
                    const obj = filteredLibrary[i];
                    if (obj.isRefreshing) {
                        isImporting = true;
                        break;
                    }
                }

                if (isImporting) {
                    setImportStatus(name);
                } else {
                    removeImportStatus(name);
                }
            }

            if (showLoader) {
                return (
                    <LoadingWrap>
                        <Loading relative size="1.2rem" />
                    </LoadingWrap>
                );
            }

            return false;
        }}
    </Query>
);

Importing.propTypes = {
    name: PropTypes.string.isRequired,
    importing: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
    const { library } = state;

    return {
        importing: library.importing,
    };
};

export default connect(
    mapStateToProps,
    null,
)(Importing);
