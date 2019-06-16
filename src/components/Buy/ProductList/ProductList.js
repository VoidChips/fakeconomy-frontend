import React from 'react';
import Product from './Product/Product';
import './ProductList.css';

const ProductList = ({ buy, productList }) => {
    let products = [];
    let i = 0;
    const productBoxes = () => {
        for (let product of productList) {
            const name = product.name;
            const image = product.image;
            const price = product.price;
            products.push(
                <Product key={i} buy={buy} name={name} image={image} price={price} />
            )
            i++;
        }
        // return <Product buy={buy} productList={productList} />
    }
    productBoxes();
    return (
        <div className='product-list'>
            {productList.length ?
                products
                :
                <h3>Loading</h3>
            }

        </div>
    );
}

export default ProductList;