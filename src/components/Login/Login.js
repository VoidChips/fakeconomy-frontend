import React from 'react';
import './Login.css';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
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
        this.props.login(username, password);
    }

    render() {
        return (
            <div className='container'>
                <div className='login'>
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
                            type='text'
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