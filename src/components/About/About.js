import React from 'react';
import './About.css';

const About = ({ users }) => {
    const UsersList = [];
    const addList = () => {
        let i = 0;
        for (let user of users) {
            UsersList.push(<li key={i}>{user}</li>)
            i++;
        }
    }
    addList();
    return (
        <div id="about">
            <div>
                <h2>This website is still in development.</h2>
                <h4>Contact information: voidchips@gmail.com</h4>
            </div>

            <h2>Buy fake products with fake money or make them yourself! You get fake $2000 when you create your account. Sell fake products to make more fake money.</h2>

            <h5>Disclaimer: No real currency is involved with this website. Just pretend to buy or sell.</h5>
            <div>
                <h2>Users: </h2>
                <br></br>
                <ul className='users'>
                    {UsersList}
                </ul>
            </div>
        </div>
    );
}

export default About;