import React from 'react';
import Product from './Product/Product';
import './ProductList.css';

const ProductList = ({ buy, input, type, productList, api }) => {
    let products = [];
    let i = 0;
    let newProducts = [];
    const productBoxes = () => {
        for (let product of productList) {
            const { name, description, image, price, seller, inventory } = product;
            products.push(
                <Product key={i} api={api} buy={buy} name={name} desc={description} image={image} price={price} seller={seller} inventory={inventory} />
            )
            i++;
        }

        // make new product list that includes the search input
        // make both strings lowercase
        if (type === 'all') {
            newProducts = products.filter(product => ((product.props.name).toLowerCase()).startsWith(input.toLowerCase()));
        }
        else if (type === 'seller') {
            newProducts = products.filter(product => ((product.props.seller).toLowerCase()).startsWith(input.toLowerCase()));
        }
    }
    productBoxes();
    return (
        <div className='product-list'>
            {productList.length ?
                newProducts
                :
                <h3>Loading</h3>
            }
        </div>
    );
}

export default ProductList;