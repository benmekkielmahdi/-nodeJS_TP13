import React, { useState } from 'react';
import { useTasks } from './hooks/useTasks';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import TaskFilter from './components/TaskFilter';
import './App.css';

function App() {
    const {
        tasks,
        isLoading,
        error,
        createTask,
        deleteTask,
        toggleTaskStatus
    } = useTasks();

    const [filter, setFilter] = useState('all');

    return (
        <div className="app">
            <header className="app-header">
                <h1>Gestionnaire de Tâches Collaboratif</h1>
                <p className="subtitle">Les modifications sont visibles en temps réel par tous les utilisateurs</p>
            </header>

            <main className="app-main">
                <div className="container">
                    <TaskForm createTask={createTask} />

                    <div className="tasks-container">
                        <div className="tasks-header">
                            <h2>Mes tâches</h2>
                            <TaskFilter filter={filter} setFilter={setFilter} />
                        </div>

                        {isLoading ? (
                            <div className="loading">Chargement des tâches...</div>
                        ) : error ? (
                            <div className="error">{error}</div>
                        ) : (
                            <TaskList
                                tasks={tasks}
                                toggleTaskStatus={toggleTaskStatus}
                                deleteTask={deleteTask}
                                filter={filter}
                            />
                        )}
                    </div>
                </div>
            </main>

            <footer className="app-footer">
                <p>Projet de fin de cours - Application Full Stack avec Node.js, React et Socket.IO</p>
            </footer>
        </div>
    );
}

export default App;
