import React from 'react';
import Product from './Product/Product';
import './ProductList.css';

const ProductList = ({buy}) => {
    return (
        <div>
            <Product buy={buy}/>
        </div>
    );
}

export default ProductList;