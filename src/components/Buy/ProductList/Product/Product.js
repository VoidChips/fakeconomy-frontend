import React from 'react';
import './Product.css';

const Product = ({ api, buy, name, desc, image, price, seller, inventory }) => {
    const alt_text = name + ' picture'

    return (
        <div className='product'>
            <ul>
                <li>
                    <h3>{name}</h3>
                </li>
                <li id="image">
                    <img
                        src={`${api}/image/${image}`}
                        alt={alt_text}
                        width='200'
                        height='200'
                    />
                </li>
                <li id="desc">
                    <p>{desc}</p>
                </li>
                <li>
                    <h4 className='price'>Price: ${price}</h4>
                    <h4>{inventory} left</h4>
                </li>
                <li>Seller: {seller}</li>
                <li>
                    <button onClick={() => buy(price, name, seller)}>Buy</button>
                </li>

            </ul>

        </div>
    );
}

export default Product;