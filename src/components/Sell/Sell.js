import React from 'react';
import './Sell.css';

class Sell extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            desc: '',
            image: '',
            price: 0,
            inventory: 0,
            productList: []
        }
    }

    componentDidMount() {
        const { isSignedin } = this.props;
        if (isSignedin) {
            this.getUserProducts();
        }
    }

    handleNameChange = (event) => {
        const str_len = event.target.value.length;
        if (str_len <= 50) {
            this.setState({ name: event.target.value });
        }
        else {
            alert('Product name must be 50 characters or less.');
        }
    }

    handleDescChange = (event) => {
        const str_len = event.target.value.length;
        if (str_len <= 300) {
            this.setState({ desc: event.target.value });
        }
        else {
            alert('Product description must be 300 characters or less.');
        }
    }

    handleImageNameChange = (event) => {
        const file = event.target.files[0];
        const { id } = this.props;
        // create new file so that name can be changed
        const image_file = new File([file], `${id}_${file.name}`, { type: file.type });
        this.setState({ image: image_file });
    }

    handlePriceChange = (event) => {
        this.setState({ price: event.target.value });
    }

    handleInventoryChange = (event) => {
        this.setState({ inventory: event.target.value });
    }

    submitImage = (api, image) => {
        const fd = new FormData();
        fd.append('image', image);
        fetch(`${api}/add_image`, {
            method: 'POST',
            body: fd
        })
            .then(response => response.json())
            .then(response => {
                if (response.upload === 'successful') {
                    console.log('image upload successful');
                }
                else {
                    alert(`image wasn't added`);
                }
            })
            .catch(err => alert(err));
    }

    // listens to enter key
    handleEnterKey = (event) => {
        if (this.props.KeyPressed(event, 'Enter')) {
            this.submitProduct();
        }
    }

    submitProduct = () => {
        if (this.props.isSignedin) {
            const { api, id } = this.props;
            const { name, desc, image, price, inventory } = this.state;
            if (name.length && image && !isNaN(price) && inventory >= 1 && Number.isInteger(Number(inventory))) {
                const image_name = image.name;
                fetch(`${api}/create_product`, {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        'id': id,
                        'name': name,
                        'desc': desc,
                        'image': image_name,
                        'price': price,
                        'inventory': inventory
                    })
                })
                    .then(response => response.json())
                    .then(result => {
                        if (result.result === 'product created') {
                            this.submitImage(api, image);
                            // wait for product image to be uploaded to the server so that the image link will work
                            setTimeout(() => {
                                this.getUserProducts();
                            }, 1000);
                        }
                        else if (result.result === 'product already exists') {
                            alert('The product with that name already exists. Choose a different name.');
                        }
                        else {
                            alert('Something went wrong. Try again.');
                        }
                    })
                    .catch(err => console.log(err));
            }
            else if (inventory < 1 || !Number.isInteger(inventory)) {
                alert('Inventory must be a whole number.');
            }
            else {
                alert('Fill in the form.');
            }
        }
        else {
            alert(`You're not logged in.`);
        }
    }

    deleteProduct = (name, image) => {
        let isDelete = window.confirm('Are you sure?');
        if (isDelete) {
            fetch(`${this.props.api}/delete_product`, {
                method: 'delete',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    'product_name': name,
                    'image': image
                })
            })
                .then(res => res.json())
                .then(res => {
                    if (res.deleted === 'true') {
                        this.getUserProducts();
                    }
                })
        }
    }

    getUserProducts = async () => {
        const { api, id } = this.props;
        const response = await fetch(`${api}/products/${id}/all`);
        const products = await response.json();
        this.setState({ productList: products });
    }

    displayUserProducts = () => {
        const { api } = this.props;
        const { productList } = this.state;
        let products = [];
        let i = 0;
        if (productList.length) {
            for (let product of productList) {
                const { name, description, image, price, inventory } = product;
                products.push(
                    <tr key={i}>
                        <td>{name}</td>
                        <td>{description}</td>
                        <td>
                            <img src={`${api}/image/${image}`} alt={image} width="120" height="120" />
                        </td>
                        <td>${price}</td>
                        <td>{inventory}</td>
                        <td>
                            <button onClick={() => this.deleteProduct(name, image)}>Delete</button>
                        </td>
                    </tr>
                );
                i++;
            }
            // return products;
            return (
                <div>
                    <h2>My Products</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>Product Name</th>
                                <th>Description</th>
                                <th>Image</th>
                                <th>Price</th>
                                <th>Inventory</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>{products}</tbody>
                    </table>
                </div>
            );
        }
        else {
            return <p>No Products</p>
        }

    }

    render() {
        return (
            <div id="sell">
                <div id="container">
                    <form className="form">
                        <div>
                            <label>
                                Fake product name
                                <input type="text" id="name" name="name" placeholder="50 characters limit" onChange={this.handleNameChange} required />
                            </label>
                        </div>
                        <div>
                            <textarea type="text" id="desc" name="desc" placeholder="Description: 300 characters limit" onChange={this.handleDescChange} />
                        </div>
                        <div>
                            <label>
                                Fake product image
                                <input type="file" id="image" name="image" accept="image/png, image/jpeg" onChange={this.handleImageNameChange} required />
                            </label>
                        </div>
                        <div>
                            <label>
                                Fake price: $
                                <input type="number" id="price" name="number" min="0"
                                    step="0.01" placeholder="0.00" onChange={this.handlePriceChange} />
                            </label>
                        </div>
                        <div>
                            <label>
                                Inventory
                                <input
                                    type="number"
                                    id="inventory"
                                    name="inventory"
                                    min="0"
                                    placeholder="1 or greater"
                                    onChange={this.handleInventoryChange}
                                />
                            </label>
                        </div>
                        <div>
                            <button type="reset">Reset</button>
                            <button type="button" onClick={this.submitProduct}>Create</button>
                        </div>
                    </form>
                </div>
                {this.props.isSignedin ? this.displayUserProducts() : <h2>Log in to see your products</h2>}
            </div>
        );
    }
}

export default Sell;
