import React from 'react';
import './About.css';

const About = ({ users }) => {
    // const users = getUsers();
    // const users = ['void'];
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
        <div>
            <h2>This website is still in development.</h2>
            <h3>Contact information: voidchips@gmail.com</h3>
            <br></br>
            <h2>Users: </h2>
            <br></br>
            <ol className='users'>
                {UsersList}
            </ol>
        </div>
    );
}

export default About;