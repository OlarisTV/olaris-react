import React, { Component } from 'react';

export default class EditMediaData extends Component {
    constructor(props) {
        super(props);

        this.state = {
            label: 'Fix Match',
        };
    }

    toggleModal = () => {};

    render() {
        const { label } = this.state;

        return (
            <button type="button" onClick={() => this.toggleModal()}>
                {label}
            </button>
        );
    }
}
