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
        const response = await fetch(`${this.props.api}/account/${this.props.id}`);
        const info = await response.json();
        this.setState({ balance: Number(info.balance) });
        // must be converted to a number to ensure buying works
        // some products can still be bought without converting
    }

    getProducts = async () => {
        // get all products
        const response = await fetch(`${this.props.api}/products/${0}/all`);
        const products = await response.json();
        this.setState({ productList: products });
    }

    updateInventory = name => {
        fetch(`${this.props.api}/update_inventory`, {
            method: 'put',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'name': name
            })
        })
            .then(response => response.json())
            .then(result => {
                if (result.inventory === 'updated') {
                    this.getProducts();
                }
            })
            .catch(err => console.log(err));
    }

    // similar to the buy function but can update anyone's balance
    updateBalance = (username, amount) => {
        fetch(`${this.props.api}/update_balance`, {
            method: 'put',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'username': username,
                'amount': amount
            })
        })
            .then(response => response.json())
            .then(result => {
                if (result.balance !== 'updated') {
                    alert(`${username} did not get $${amount}.`);
                }
            })
            .catch(err => console.log(err));
    }

    buy = (price, name, seller) => {
        // prevents user buying own product
        if (this.props.username === seller) {
            alert('You cannot buy your own product...');
        }
        else if (this.state.balance > price) {
            // update balance
            fetch(`${this.props.api}/buy`, {
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
                        this.updateInventory(price, name, seller);
                        this.updateBalance(seller, price);
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
                <ProductList buy={this.buy} input={input} type={type} productList={productList} api={this.props.api} />
            </div>
        );
    }
}

export default Buy;