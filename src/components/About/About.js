import React from 'react';
import './About.css';

const About = (props) => {
    const length = Object.keys(props).length;
    const usernames = [];
    for (let i = 0; i < length; i++) {
        usernames.push(props[i].username);
    }

    let username_lists = [];
    for (let i = 0; i < usernames.length; i++) {
        username_lists.push(<li key={i}>{usernames[i]}</li>)
    }
    console.log(usernames);


    return (
        <div>
            <h2>This website is still in development.</h2>
            <h3>Contact information: voidchips@gmail.com</h3>
            <br></br>
            <h2>Users: </h2>
            <br></br>
            <ol className='users'>
                {username_lists}
            </ol>

        </div>
    );
}

export default About;