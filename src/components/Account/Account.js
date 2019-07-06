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
        const response = await fetch(`${this.props.link}/account/${this.props.id}`);
        const info = await response.json();
        this.setState({ account_info: info });
    }

    displayInfo = (info) => {
        const { email, username, balance } = info;
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
            fetch(`${this.props.link}/delete_user/${this.props.id}`, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
                .then(response => response.json())
                .then(status => {
                    alert(status.status);
                    this.props.signOut();
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
                </div>
            </div>
        )
    }
}

export default Account;