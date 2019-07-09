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
            inventory: 0
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

    submitImage = (link, image) => {
        const fd = new FormData();
        fd.append('image', image);
        fetch(`${link}/add_image`, {
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

    submitProduct = () => {
        if (this.props.isSignedin) {
            const { link, id } = this.props;
            const { name, desc, image, price, inventory } = this.state;
            const image_name = image.name;
            if (name.length && image_name.length) {
                fetch(`${link}/create_product`, {
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
                            alert('product was created');
                            this.submitImage(link, image);
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
            else {
                alert(`Fill in the form.`);
            }
        }
        else {
            alert(`You're not logged in.`);
        }
    }

    render() {
        return (
            <div id="sell">
                <div id="container">
                    <form className="product_form">
                        <div>
                            <label>
                                Fake product name
                                <input type="text" id="name" name="name" placeholder="50 characters limit" onChange={this.handleNameChange} required />
                            </label>
                        </div>
                        <div>
                            <textarea type="text" id="desc" name="desc" placeholder="300 characters limit" onChange={this.handleDescChange} />
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
                                    placeholder="0"
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
            </div>
        );
    }
}

export default Sell;
