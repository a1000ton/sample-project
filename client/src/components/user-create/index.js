import React, { useState } from 'react';
import axios from 'axios';

const UserCreate = () => {
    const [user, setUser] = useState({
        username: ''
    });

    const createUser = async (user) => {
        const response = await axios.post('http://localhost:5000/users/add', user);

        return response;
    }

    const onChangeUsername = (e) => {
        setUser({...user, username: e.target.value})
    }

    const onSubmit = async (e) => {
        e.preventDefault();

        const response = await createUser(user);

        console.log(response.data)
    }

    return (
        <div onSubmit={onSubmit}>
            <form>
                <div>
                    <label>Username</label>
                    <input type="text" value={user.usename} onChange={onChangeUsername}/>
                </div>
                <input type="submit" />
            </form>
        </div>
    )
}

export default UserCreate;