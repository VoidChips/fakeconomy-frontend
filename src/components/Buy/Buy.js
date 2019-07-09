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

    getBalance = async () => {
        // async await 
        const response = await fetch(`${this.props.link}/account/${this.props.id}`);
        const info = await response.json();
        this.setState({ balance: Number(info.balance) });
        // must be converted to a number to ensure buying works
        // some products can still be bought without converting
    }

    getProducts = async () => {
        const response = await fetch(`${this.props.link}/products`);
        const products = await response.json();
        this.setState({ productList: products });
    }

    // called whenever user buys something
    updateBalance = price => {
        // update balance
        fetch(`${this.props.link}/update_balance`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'id': this.props.id,
                'price': price
            })
        })
            .then(response => response.json())
            .then(result => {
                if (result.result === 'balance updated') {
                    // get balance after balance is updated since getBalance() will be called before updating balance otherwise
                    this.getBalance();
                }
            })
    }

    buy = (price) => {
        if (this.state.balance > price) {
            this.updateBalance(price.toString());
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
                <div>
                    <h2>Balance: ${balance}</h2>
                    <ProductList buy={this.buy} productList={productList} link={this.props.link} />
                </div>
            </div>
        );
    }
}

export default Buy;