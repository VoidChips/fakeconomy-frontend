import React from 'react';
import './Register.css';

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            username: '',
            password: '',
            hintCSS: 'hint',
            hintContentCSS: 'hint-content hide'
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
        const numChars = '0123456789';
        const specialChars = `~\`!@#$%^&*()-_=+[]{}\\;:'",.<>/? `;
        const foundChar = arr => {
            for (let char of arr) {
                if (password.includes(char)) {
                    return true;
                }
            }
            return false;
        }
        if (email === '' || username === '' || password === '') {
            alert('Do not leave any fields blank.');
        }
        else if (email.search('@') === -1) {
            alert('Email address is required.');
        }
        else if (password.length < 8 || !(foundChar(numChars)) || !foundChar(specialChars)) {
            alert('Password length must be 8 or more. At least one number and special character is required.');
        }
        else {
            register(email, username, password);
        }
    }

    handleHintClick = () => {
        const { hintCSS } = this.state;
        if (hintCSS === 'hint') {
            this.setState({ hintCSS: 'hint hide' });
            this.setState({ hintContentCSS: 'hint-content' });
        }
        else {
            this.setState({ hintCSS: 'hint' });
            this.setState({ hintContentCSS: 'hint-content hide' });
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
                            required
                            onChange={this.handleEmailChange}
                        />
                    </div>
                    <div className='item'>
                        Username: <br></br>
                        <input
                            type='text'
                            name='username'
                            required
                            onChange={this.handleUsernameChange}
                        />
                    </div>
                    <div className='item'>
                        Password: <br></br>
                        <input
                            type='password'
                            name='password'
                            minLength='8'
                            required
                            onChange={this.handlePasswordChange}
                        />
                        <br></br>
                        <div className={this.state.hintCSS} onClick={() => this.handleHintClick()}>?</div>
                        <p className={this.state.hintContentCSS} onClick={() => this.handleHintClick()}>Password must be at least 8 characters long and include at least one number and special symbol.</p>
                    </div>
                    <button onClick={() => this.submitRegisterInfo()}>Register</button>
                </div>
            </div>
        );
    }
}

export default Register;