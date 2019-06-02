import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

import { AddLibraryWrap, AddLibraryInput, SubmitLibrary } from './Styles';

export default class AddLibraryAction extends Component {
    constructor(props) {
        super(props);

        this.state = {
            disabled: true,
        };
    }

    handleChange = (val) => {
        const { updateFilePath } = this.props;
        const valid = val.length > 0;

        updateFilePath(val);

        this.setState({
            disabled: !valid,
        });
    };

    handleSubmit = () => {
        const { createLibrary } = this.props;

        createLibrary();
    };

    render() {
        const { disabled } = this.state;
        const { filePath } = this.props;

        return (
            <AddLibraryWrap>
                <AddLibraryInput
                    autoFocus
                    value={filePath}
                    placeholder="Enter Filepath"
                    type="text"
                    onChange={(e) => this.handleChange(e.target.value)}
                />
                <SubmitLibrary
                    disabled={disabled}
                    icon={faPlus}
                    onClick={() => this.handleSubmit()}
                />
            </AddLibraryWrap>
        );
    }
}

AddLibraryAction.propTypes = {
    createLibrary: PropTypes.func.isRequired,
    updateFilePath: PropTypes.func.isRequired,
    filePath: PropTypes.string,
};

AddLibraryAction.defaultProps = {
    filePath: '',
};
