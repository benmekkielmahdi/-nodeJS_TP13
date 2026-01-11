import React from 'react';

const TaskItem = ({ task, toggleTaskStatus, deleteTask }) => {
    const { _id, title, description, done, createdAt } = task;
    const formattedDate = new Date(createdAt).toLocaleDateString();

    return (
        <div className={`task-item ${done ? 'task-done' : ''}`}>
            <div className="task-content">
                <label className="task-checkbox">
                    <input
                        type="checkbox"
                        checked={done}
                        onChange={() => toggleTaskStatus(_id, done)}
                    />
                    <span className="checkmark"></span>
                </label>
                <div className="task-details">
                    <h3 className="task-title">{title}</h3>
                    {description && <p className="task-description">{description}</p>}
                    <span className="task-date">Créée le {formattedDate}</span>
                </div>
            </div>
            <button className="btn-delete" onClick={() => deleteTask(_id)} aria-label="Supprimer">
                ❌
            </button>
        </div>
    );
};

export default TaskItem;
