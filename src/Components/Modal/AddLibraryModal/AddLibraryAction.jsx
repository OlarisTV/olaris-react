import React, { Component } from 'react';
import { withApollo } from 'react-apollo';
import PropTypes from 'prop-types';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

import FETCH_REMOTES from 'Queries/fetchRemotes';

import { SingleSelect, TextInput } from 'Components/Form';

import { AddLibraryWrap, SubmitLibrary } from './Styles';

class AddLibraryAction extends Component {
    constructor(props) {
        super(props);

        this.state = {
            disabled: true,
            type: null,
            filepath: '',
            remotes: [],
            remote: null,
        };
    }

    handleChange = (e) => {
        if (e.name === 'filepath') {
            this.setState({
                disabled: !e.value.length > 0,
            });
        }

        this.setState({
            [e.name]: e.value,
        });
    };

    selectChange = (val, name) => {
        const { client } = this.props;

        if (name === 'type' && val.value === '1') {
            client
                .query({
                    query: FETCH_REMOTES,
                })
                .then((res) => {
                    const remotes = [];
                    res.data.remotes.forEach((remote) => {
                        remotes.push({
                            value: remote.filePath,
                            label: remote.filePath,
                        });
                    });

                    return remotes;
                })
                .then((remotes) => {
                    this.setState({ remotes });
                });
        }

        this.setState({
            [name]: val,
        });
    };

    handleSubmit = () => {
        const { type, filepath, remote } = this.state;
        const { createLibrary } = this.props;

        const data = {
            backend: parseInt(type.value, 10),
            filePath: filepath.length > 0 ? filepath : remote.value,
        };

        createLibrary(data);
    };

    render() {
        const { disabled, type, filepath, remotes, remote } = this.state;
        let remotesPlaceholder = 'Select Remote Path';
        const libraryTypes = [
            { value: '0', label: 'Local' },
            { value: '1', label: 'Rclone' },
        ];

        if (remotes) remotesPlaceholder = 'No Rclone Paths Found...';

        return (
            <AddLibraryWrap>
                <SingleSelect
                    placeholder="Select Library Type"
                    options={libraryTypes}
                    onChange={(val) => this.selectChange(val, 'type')}
                    value={type}
                    name="type"
                />

                {type && type.value === '0' && (
                    <TextInput
                        value={filepath}
                        placeholder="Enter Filepath"
                        type="text"
                        name="filepath"
                        onChange={(e) => this.handleChange(e.target)}
                    />
                )}

                {type && type.value === '1' && (
                    <SingleSelect
                        placeholder={remotesPlaceholder}
                        options={remotes}
                        onChange={(val) => this.selectChange(val, 'remote')}
                        value={remote}
                        name="remote"
                    />
                )}

                <SubmitLibrary
                    disabled={disabled}
                    icon={faPlus}
                    onClick={() => this.handleSubmit()}
                >
                    Add Folder
                </SubmitLibrary>
            </AddLibraryWrap>
        );
    }
}

AddLibraryAction.propTypes = {
    createLibrary: PropTypes.func.isRequired,
    client: PropTypes.shape({
        query: PropTypes.func.isRequired,
    }).isRequired,
};

export default withApollo(AddLibraryAction);
