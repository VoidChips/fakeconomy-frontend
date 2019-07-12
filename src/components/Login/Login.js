import React from 'react';
import './Login.css';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
        }
    }

    handleUsernameChange = (event) => {
        this.setState({ username: event.target.value });
    }

    handlePasswordChange = (event) => {
        this.setState({ password: event.target.value });
    }

    submitLoginInfo = () => {
        const {username, password} = this.state;
        const { login } = this.props;
        if (username === '' || password === '') {
            alert('Please enter both username and password');
        }
        else {
            login(username, password);
        } 
    }

    render() {
        return (
            <div className='container'>
                <div className='login form'>
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
                    <button onClick={() => this.submitLoginInfo()}>Login</button>
                </div>
            </div>
        );
    }

}

export default Login;