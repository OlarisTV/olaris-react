import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { useAlert } from 'react-alert';
import PropTypes from 'prop-types';
import { faSync } from '@fortawesome/free-solid-svg-icons';

import REFRESH_METADATA from 'Mutations/refreshMetadata';

import { HeaderIconWrap, HeaderIcon } from './Styles';

class RefreshMetadata extends Component {
    constructor(props) {
        super(props);
        this.state = {
            disabled: false,
        };
    }

    refreshMetadata = () => {
        const { uuid, mutate } = this.props;
        const alert = useAlert();

        mutate({
            variables: { uuid },
        })
            .then(() => {
                this.setState({
                    disabled: true,
                });

                alert.success('Refreshing Metadata, this may take a while');
            })
            .catch((err) => err);
    };

    render() {
        const { disabled } = this.state;

        return (
            <HeaderIconWrap
                disabled={disabled}
                onClick={() => this.refreshMetadata()}
                data-tip="Refresh Meta Data"
                right
            >
                <HeaderIcon icon={faSync} />
            </HeaderIconWrap>
        );
    }
}

RefreshMetadata.propTypes = {
    uuid: PropTypes.string.isRequired,
    mutate: PropTypes.func.isRequired,
};

export default graphql(REFRESH_METADATA)(RefreshMetadata);
