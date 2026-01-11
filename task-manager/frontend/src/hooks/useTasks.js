import { useState, useEffect } from 'react';
import axios from 'axios';
import { io } from 'socket.io-client';

const API_URL = 'http://localhost:4001/api/tasks';
const socket = io('http://localhost:4001');

export function useTasks() {
    const [tasks, setTasks] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                setIsLoading(true);
                const response = await axios.get(API_URL);
                setTasks(response.data);
                setError(null);
            } catch (err) {
                setError('Erreur lors du chargement des tâches');
                console.error(err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchTasks();

        socket.on('taskCreated', (newTask) => {
            setTasks(prevTasks => [newTask, ...prevTasks]);
        });

        socket.on('taskUpdated', (updatedTask) => {
            setTasks(prevTasks =>
                prevTasks.map(task =>
                    task._id === updatedTask._id ? updatedTask : task
                )
            );
        });

        socket.on('taskDeleted', (taskId) => {
            setTasks(prevTasks =>
                prevTasks.filter(task => task._id !== taskId)
            );
        });

        return () => {
            socket.off('taskCreated');
            socket.off('taskUpdated');
            socket.off('taskDeleted');
        };
    }, []);

    const createTask = async (taskData) => {
        try {
            const response = await axios.post(API_URL, taskData);
            const newTask = response.data;
            setTasks(prevTasks => [newTask, ...prevTasks]);
            socket.emit('taskCreated', newTask);
            return newTask;
        } catch (err) {
            setError('Erreur lors de la création de la tâche');
            throw err;
        }
    };

    const updateTask = async (id, taskData) => {
        try {
            const response = await axios.put(`${API_URL}/${id}`, taskData);
            const updatedTask = response.data;
            setTasks(prevTasks =>
                prevTasks.map(task =>
                    task._id === id ? updatedTask : task
                )
            );
            socket.emit('taskUpdated', updatedTask);
            return updatedTask;
        } catch (err) {
            setError('Erreur lors de la mise à jour de la tâche');
            throw err;
        }
    };

    const deleteTask = async (id) => {
        try {
            await axios.delete(`${API_URL}/${id}`);
            setTasks(prevTasks => prevTasks.filter(task => task._id !== id));
            socket.emit('taskDeleted', id);
        } catch (err) {
            setError('Erreur lors de la suppression de la tâche');
            throw err;
        }
    };

    const toggleTaskStatus = async (id, currentStatus) => {
        return updateTask(id, { done: !currentStatus });
    };

    return { tasks, isLoading, error, createTask, updateTask, deleteTask, toggleTaskStatus };
}
