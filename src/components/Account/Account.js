import React from 'react';
import './Account.css';

class Account extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            account_info: ''
        }
    }

    componentDidMount() {
        this.getAccountInfo();
    }

    getAccountInfo = async () => {
        const response = await fetch(`${this.props.api}/account/${this.props.id}`);
        const info = await response.json();
        this.setState({ account_info: info });
    }

    displayInfo = (info) => {
        const { email, username, balance} = info;
        return (
            <div>
                <h3>Email: {email}</h3>
                <h3>Username: {username}</h3>
                <h3>Balance: {balance}</h3>
            </div>
        );
    }

    deleteAccount = () => {
        let isDelete = window.confirm('Are you sure?');
        if (isDelete) {
            fetch(`${this.props.api}/delete_user/${this.state.account_info.username}`, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
                .then(response => response.json())
                .then(result => {
                    if (result.status === 'deleted') {
                        alert('Account deleted');
                        this.props.signOut();
                    }
                });
        }
    }

    render() {
        const { account_info } = this.state;
        return (
            <div id='account'>
                <div id='container'>
                    {account_info !== '' ? this.displayInfo(account_info) : <p>Loading</p>}
                    <button onClick={() => this.deleteAccount()}>Delete Account</button>
                    <h6>Registered: {account_info.registered_date}</h6>
                </div>
            </div>
        )
    }
}

export default Account;