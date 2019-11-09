// @flow
import React, { useState, useEffect } from 'react';
import { useQuery } from 'react-apollo';
import gql from 'graphql-tag';

import Loading from 'Components/Loading';

import * as S from './Styles';

const LIBRARY_STATE = gql`
    query {
        libraries {
            kind
            isRefreshing
        }
    }
`;

type Props = {
    kind: number,
};

const Importing = ({ kind }: Props) => {
    const [importing, setImporting] = useState(false);
    const { loading, error, data, stopPolling } = useQuery(LIBRARY_STATE, { pollInterval: 5000 });

    useEffect(() => {
        if (data) {
            data.libraries.forEach((lib) => {
                if (kind === lib.kind) setImporting(lib.isRefreshing);
            });
        }
    }, [data]);

    if (error) return `Error! ${error}`;
    if (loading) return null;

    if (!importing) {
        stopPolling();

        return null;
    }

    return (
        <S.LoadingWrap>
            <Loading relative fsize="1rem" />
        </S.LoadingWrap>
    );
};

export default Importing;
