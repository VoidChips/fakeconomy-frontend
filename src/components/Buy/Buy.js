import React from 'react';
import ProductList from './ProductList/ProductList';

class Buy extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            balance: 0
        }
    }

    componentDidMount() {
        // get balance
        if (this.props.isSignedin) {
            fetch('https://www.fakeconomy.com/balance', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    'username': this.props.username
                })
            })
                .then(response => response.json())
                .then(balance => {
                    this.setState({ balance: balance.balance });
                });
        }
    }

    // called whenever user buys something
    updateBalance(new_balance) {
        // update balance
        fetch('https://www.fakeconomy.com/update_balance', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'username': this.props.username,
                'new_balance': new_balance
            })
        });

        // get balance
        if (this.props.isSignedin) {
            fetch('https://www.fakeconomy.com/balance', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    'username': this.props.username
                })
            })
                .then(response => response.json())
                .then(balance => {
                    this.setState({ balance: balance.balance });
                });
        }
    }

    buy = (price) => {
        if (this.state.balance > price) {
            // this.setState({ balance: (this.state.balance - price).toFixed(2) });
            const balance_after_purchase = (this.state.balance - price).toFixed(2);
            this.updateBalance(balance_after_purchase.toString());
        }
        else if (!this.props.isSignedin) {
            alert(`You're not signed in.`);
        }
        else {
            alert(`You don't have enough money.`);
        }

    }

    render() {
        const { balance } = this.state;
        return (
            <div>
                <h2>Balance: ${balance}</h2>
                <ProductList buy={this.buy} />
            </div>
        );
    }
}

export default Buy;