import React from 'react';
import './Product.css';

const Product = ({buy}) => {
    const price = 0.99;
    return (
        <div className='product'>
            <h3>Instant Ramen Noodles</h3>
            <ul>
                <li>
                    <img
                        src='https://images-na.ssl-images-amazon.com/images/I/915AEp17FaL._SL1500_.jpg'
                        alt='Maruchan chicken flavor'
                        width='200'
                        height='200'
                    />
                </li>
                <li>
                    Price: ${price}
                </li>
                <li>
                    <button onClick={() => buy(price)}>Buy</button>
                </li>

            </ul>


        </div>
    );
}

export default Product;