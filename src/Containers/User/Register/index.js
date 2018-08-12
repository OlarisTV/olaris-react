import React, { Component } from 'react'
import { withAlert } from 'react-alert'
import { Redirect } from 'react-router'
import { getUrlParameter, isInitialSetup } from 'Helpers'

import CREATE_USER from 'Mutations/createUser'
import RegisterForm from 'Components/User/Register'

import { RegisterWrap } from './Styles'

class Register extends Component {
    state = { 
        error: false,
        redirectToDashboard: false,
        username: '',
        password: '',
        invite_code: ''
    }

    componentWillMount() {
        this.setState({
            inviteCode: getUrlParameter('invite_code')
        });
    }

    _handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    _handleRegister = () => {
        let register_info = {
            login: this.state.username,
            password: this.state.password
        }

        if (this.state.invite_code.length > 0) {
            register_info = { 
                ...register_info, 
                invite_code: this.state.invite_code 
            }
        }

        CREATE_USER(register_info).then(response => {
            this.setState({ redirectToDashboard: true  });
        }).catch(error => {
            this.setState({ error: true }, () => {
                this.props.alert.error('Looks like there was an error, Please Try Again');
            });
        })
    }
    
    render() { 
        const { from } = this.props.location.state || { from: { pathname: "/dashboard" } };
        if (this.state.redirectToDashboard) return <Redirect to={from} />

        let RegisterProps = {
            handleRegister: this._handleRegister,
            handleChange: this._handleChange,
            error: this.state.error,
            inviteCode: this.state.inviteCode,
            initialSetup: isInitialSetup()
        }

        return ( 
            <RegisterWrap>
                <RegisterForm { ...RegisterProps }/>
            </RegisterWrap>
        );
    }
}
 
export default withAlert(Register)