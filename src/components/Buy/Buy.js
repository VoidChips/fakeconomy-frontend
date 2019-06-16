import React from 'react';
import ProductList from './ProductList/ProductList';
import './Buy.css';

class Buy extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            balance: 0,
            productList: []
        }
    }

    componentDidMount() {
        // get balance
        if (this.props.isSignedin) {
            this.getBalance();
        }
        this.getProducts();
    }

    getBalance = () => {
        // use http://localhost:3000/balance for developing
        // use https://www.fakeconomy.com/balance for production
        fetch('http://localhost:3000/balance', {
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

    getProducts = async () => {
        const response = await fetch('http://localhost:3000/products');
        const products = await response.json();
        this.setState({productList: products});
    }

    // called whenever user buys something
    updateBalance = new_balance => {
        // update balance
        // use http://localhost:3000/update_balance for developing
        // use https://www.fakeconomy.com/update_balance for production
        fetch('http://localhost:3000/update_balance', {
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

        this.getBalance();
    }

    buy = (price) => {
        if (this.state.balance > price) {
            const balance_after_purchase = (this.state.balance - price).toFixed(2);
            this.updateBalance(balance_after_purchase.toString());
        }
        else if (!this.props.isSignedin) {
            alert(`You're not logged in.`);
        }
        else {
            alert(`You don't have enough money.`);
        }

    }

    render() {
        const { balance, productList } = this.state;
        return (
            <div className='buy'>
                <h2>Balance: ${balance}</h2>
                <ProductList buy={this.buy} productList={productList}/>
            </div>
        );
    }
}

export default Buy;