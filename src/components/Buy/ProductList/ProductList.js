import React from 'react';
import Product from './Product/Product';
import './ProductList.css';

const ProductList = ({ buy, productList, link }) => {
    let products = [];
    let i = 0;
    const productBoxes = () => {
        for (let product of productList) {
            const name = product.name;
            const desc = product.description;
            const image = product.image;
            const price = product.price;
            const seller = product.seller;
            const inventory = product.inventory;
            products.push(
                <Product key={i} link={link} buy={buy} name={name} desc={desc} image={image} price={price} seller={seller} inventory={inventory} />
            )
            i++;
        }
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