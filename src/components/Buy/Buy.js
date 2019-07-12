import React from 'react';
import ProductList from './ProductList/ProductList';
import './Buy.css';

class Buy extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            balance: 0,
            input: '',
            type: 'all',
            productList: []
        }
    }

    componentDidMount = () => {
        // get balance if signed in
        if (this.props.isSignedin) {
            this.getBalance();
        }
        this.getProducts();
    }

    handleInputChange = (event) => {
        this.setState({ input: event.target.value });
    }

    handleInputTypeChange = (event) => {
        this.setState({ type: event.target.value });
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
        // get all products
        const response = await fetch(`${this.props.link}/products/${0}/all`);
        const products = await response.json();
        this.setState({ productList: products });
    }

    sell = (price, name, seller) => {
        fetch(`${this.props.link}/sell`, {
            method: 'put',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'price': price,
                'name': name,
                'seller': seller
            })
        })
            .catch(err => console.log(err));
    }

    buy = (price, name, seller) => {
        if (this.state.balance > price) {
            // update balance
            fetch(`${this.props.link}/buy`, {
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
                        // cannot use componentDidMount since it will keep getting called
                        this.getProducts();
                        this.sell(price, name, seller);
                    }
                })
        }
        else if (!this.props.isSignedin) {
            alert(`You're not logged in.`);
        }
        else {
            alert(`You don't have enough money.`);
        }

    }

    render() {
        const { balance, input, type, productList } = this.state;
        return (
            <div className="buy">
                <h2>Balance: ${balance}</h2>
                <div id="search">
                    <input type="text" onChange={this.handleInputChange} placeholder="Search" />
                    <select
                        onChange={this.handleInputTypeChange}
                    >
                        <option value="all">All</option>
                        <option value="seller">Seller</option>
                    </select>
                </div>
                <ProductList buy={this.buy} input={input} type={type} productList={productList} link={this.props.link} />
            </div>
        );
    }
}

export default Buy;