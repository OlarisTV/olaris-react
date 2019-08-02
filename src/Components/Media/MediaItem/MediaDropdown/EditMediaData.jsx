import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'lodash/fp';
import { graphql } from 'react-apollo';
import { withAlert } from 'react-alert';

import REFRESH_METADATA from 'Mutations/refreshMetadata';

class RefreshMetadata extends Component {
    constructor(props) {
        super(props);
        this.state = {
            label: 'Fix Match',
        };
    }

    render() {
        const { label } = this.state;

        return (
            <button type="button" onClick={() => this.refreshMetadata()}>
                {label}
            </button>
        );
    }
}

export default compose(
    withAlert,
    graphql(REFRESH_METADATA),
)(RefreshMetadata);
