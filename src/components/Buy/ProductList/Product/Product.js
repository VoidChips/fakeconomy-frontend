import React from 'react';
import './Product.css';

const Product = ({buy, name, image, price, seller, link}) => {
    const alt_text = name + ' picture'

    return (
        <div className='product'>
            <h3>{name}</h3>
            <ul>
                <li>
                    <img
                        src={`${link}/image/${image}`}
                        alt={alt_text}
                        width='200'
                        height='200'
                    />
                </li>
                <li>
                    <h4>Price: ${price}</h4>
                </li>
                <li>Seller: {seller}</li>
                <li>
                    <button onClick={() => buy(price)}>Buy</button>
                </li>

            </ul>

        </div>
    );
}

export default Product;