import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ExercisesList = () => {
    const [exercises, setExercises] = useState([]);

    useEffect(() => {
        const getExercises = async () => {
            const exercisesRequest = await axios.get('http://localhost:5000/exercises');
            
            setExercises(exercisesRequest.data);
        }

        getExercises();
    }, [exercises])

    const handleOnDelete = async (id) => {
        const response = await deleteExercise(id);

        console.log(response);
    }

    const deleteExercise = async (id) => {
        const response = await axios.delete(`http://localhost:5000/exercises/${id}`);

        return response.data;
    }

    return (
        <table>
            <thead>
                <tr>
                    <th>Descrição</th> 
                    <th>User</th> 
                    <th>Duração</th> 
                    <th>Data</th>  
                </tr>   
            </thead>
            <tbody>
                {exercises.map(exercise => 
                    <tr key={exercise._id}>
                        <td>{exercise.description}</td>
                        <td>{exercise.username}</td>
                        <td>{exercise.duration}</td>
                        <td>{new Date(exercise.date).toString()}</td>
                        <td><button onClick={() => handleOnDelete(exercise._id)}>Deletar</button></td>
                    </tr>)}
            </tbody>
        </table>
    )
}

export default ExercisesList;