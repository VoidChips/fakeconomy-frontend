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
        // use http://localhost:3000/balance/${this.props.id} for developing
        // use https://www.fakeconomy.com/balance/${this.props.id} for production
        // fetch(`http://localhost:3000/balance/${this.props.id}`)
        //     .then(response => response.json())
        //     .then(balance => {
        //         this.setState({ balance: balance.balance });
        //     });

        // async await 
        const response = await fetch(`https://www.fakeconomy.com/balance/${this.props.id}`);
        const balance = await response.json();
        this.setState({ balance: balance.balance });
    }

    getProducts = async () => {
        const response = await fetch('http://localhost:3000/products');
        const products = await response.json();
        this.setState({ productList: products });
    }

    // called whenever user buys something
    updateBalance = price => {
        // update balance
        // use http://localhost:3000/update_balance for developing
        // use https://www.fakeconomy.com/update_balance for production
        fetch('https://www.fakeconomy.com/update_balance', {
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
                <h2>Balance: ${balance}</h2>
                <ProductList buy={this.buy} productList={productList} />
            </div>
        );
    }
}

export default Buy;