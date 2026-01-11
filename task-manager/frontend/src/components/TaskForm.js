import React, { useState } from 'react';

const TaskForm = ({ createTask }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title.trim()) return;
        createTask({ title, description });
        setTitle('');
        setDescription('');
    };

    return (
        <form onSubmit={handleSubmit} className="task-form">
            <h2>Ajouter une nouvelle tâche</h2>
            <div className="form-group">
                <label htmlFor="title">Titre</label>
                <input
                    id="title"
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Titre de la tâche"
                    required
                />
            </div>
            <div className="form-group">
                <label htmlFor="description">Description (optionnelle)</label>
                <textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Description de la tâche"
                    rows="3"
                />
            </div>
            <button type="submit" className="btn-submit">Ajouter</button>
        </form>
    );
};

export default TaskForm;
