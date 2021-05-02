import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import axios from 'axios';
import "react-datepicker/dist/react-datepicker.css";

const ExerciseCreate = () => {
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [exercise, setExercise] = useState({
        username: '',
        description: '',
        duration: 0,
        date: new Date(),
    })

    useEffect(() => {
        const getUsers = () => {
            axios.get('http://localhost:5000/users')
                .then(res => res.data.map(user => user.username))
                .then(userData => setUsers(userData))
        }

        getUsers();
    }, [users])

    const onChangeUsername = (e) => {
        setExercise({...exercise, username: e.target.value});
    }

    const onChangeDescription = (e) => {
        setExercise({...exercise, description: e.target.value});
    }

    const onChangeDuration = (e) => {
        setExercise({...exercise, duration: e.target.value});
    }

    const onChangeDate = (date ) => {
        setExercise({...exercise, date: date});
    }

    const createExercise = async (exercise) => {
       const response =  await axios.post('http://localhost:5000/exercises/add', exercise);

       return response;
    }

    const onSubmit = async (e) => {
        e.preventDefault();

        setIsLoading(true);
        const response = await createExercise(exercise);

        setIsLoading(false);
        console.log(response.data);
    }

    return (
        <div>
            {isLoading && 'IS LOADING'}
            <h3>Create new Exercise</h3>
            <form onSubmit={onSubmit}>
                <div>
                    <label>Username</label>
                    <select
                        name="userList" 
                        id="userList"
                        required
                        value={exercise.username}
                        onChange={onChangeUsername}
                    >
                        {
                            users.map(user => (
                                <option key={user} value={user}>{user}</option>
                            ))
                        }
                    </select>
                </div>
                <div>
                    <label>Description: </label>
                    <input 
                        type="text"
                        id="description"
                        required 
                        value={exercise.description} 
                        onChange={onChangeDescription} 
                    />
                </div>
                <div>
                    <label>Duration: </label>
                    <input 
                        type="text"
                        id="duration"
                        value={exercise.duration}
                        onChange={onChangeDuration}
                    />
                </div>
                <div>
                    <label>Date: </label>
                    <div>
                        <DatePicker id="date" selected={exercise.date} onChange={onChangeDate} />
                    </div>
                </div>
                <div>
                    <input
                        type="submit"
                        value="Create Exercise"
                    />
                </div>
            </form>
        </div>
    )
}

export default ExerciseCreate;