import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';

import DropdownIndicator from './DropdownIndicator';

import * as S from '../Styles';

const MediaFiles = ({ files, selectedFile, fileChange }) => (
    <>
        <S.MediaInfo>
            <S.MediaInfoSubhead>{files.length > 1 ? 'Select File:' : 'File Name:'}</S.MediaInfoSubhead>
            {files.length > 1 ? (
                <Select
                    value={selectedFile}
                    options={files}
                    onChange={fileChange}
                    components={{ DropdownIndicator }}
                    styles={S.SelectStyle}
                    isSearchable={false}
                />
            ) : (
                <S.FileName>{selectedFile.label}</S.FileName>
            )}
        </S.MediaInfo>
    </>
);

MediaFiles.propTypes = {
    selectedFile: PropTypes.shape({
        label: PropTypes.string.isRequired,
    }).isRequired,
    files: PropTypes.arrayOf(
        PropTypes.shape({
            label: PropTypes.string.isRequired,
        }),
    ).isRequired,
    fileChange: PropTypes.func.isRequired,
};

export default MediaFiles;
