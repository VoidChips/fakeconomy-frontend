import React from 'react';
import './Register.css';

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            username: '',
            password: ''
        }
    }

    handleEmailChange = (event) => {
        this.setState({ email: event.target.value });
    }

    handleUsernameChange = (event) => {
        this.setState({ username: event.target.value });
    }

    handlePasswordChange = (event) => {
        this.setState({ password: event.target.value });
    }

    submitRegisterInfo = () => {
        const { email, username, password } = this.state;
        const { register } = this.props;
        if (email === '' || username === '' || password === '') {
            alert('Do not leave any fields blank.');
        }
        else {
            register(email, username, password);
        }
    }

    render() {
        return (
            <div className='container'>
                <div className='register form'>
                    <div className='item'>
                        Email: <br></br>
                        <input
                            type='email'
                            name='email'
                            onChange={this.handleEmailChange}
                        />
                    </div>
                    <div className='item'>
                        Username: <br></br>
                        <input
                            type='text'
                            name='username'
                            onChange={this.handleUsernameChange}
                        />
                    </div>
                    <div className='item'>
                        Password: <br></br>
                        <input
                            type='password'
                            name='password'
                            onChange={this.handlePasswordChange}
                        />
                    </div>
                    <button onClick={() => this.submitRegisterInfo()}>Register</button>
                </div>
            </div>
        );
    }
}

export default Register;