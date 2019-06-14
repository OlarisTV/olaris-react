import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

import {
    AddLibraryWrap,
    AddLibraryInput,
    SubmitLibrary,
    RcloneInput,
} from './Styles';

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

    checkboxChange = ({ target }) => {
        console.log(target.name, target.checked);
        this.setState({
            [target.name]: target.checked,
        });
    };

    handleSubmit = () => {
        const { createLibrary } = this.props;

        createLibrary();
    };

    render() {
        const { disabled, isrclone } = this.state;
        const { filePath } = this.props;

        return (
            <AddLibraryWrap>
                <AddLibraryInput
                    autoFocus
                    value={filePath}
                    placeholder="Enter Filepath"
                    type="text"
                    name="filepath"
                    onChange={(e) => this.handleChange(e.target.value)}
                />
                <RcloneInput rclone={isrclone}>
                    <label htmlFor="isrclone">
                        Rclone Folder?
                        <input
                            type="checkbox"
                            id="isrclone"
                            name="isrclone"
                            onChange={(e) => this.checkboxChange(e)}
                        />
                    </label>
                </RcloneInput>
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
    updateFilePath: PropTypes.func.isRequired,
    filePath: PropTypes.string,
};

AddLibraryAction.defaultProps = {
    filePath: '',
};
