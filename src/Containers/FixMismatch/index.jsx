import React from 'react';
import PropTypes from 'prop-types';

const FixMismatch = ({ type, name }) => {
    return (
        <p>
            {type} {name}
        </p>
    );
};

FixMismatch.propTypes = {
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
};

export default FixMismatch;
