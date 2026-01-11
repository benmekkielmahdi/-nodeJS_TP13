import React from 'react';
import TaskItem from './TaskItem';

const TaskList = ({ tasks, toggleTaskStatus, deleteTask, filter }) => {
    const filteredTasks = tasks.filter(task => {
        if (filter === 'active') return !task.done;
        if (filter === 'completed') return task.done;
        return true;
    });

    if (filteredTasks.length === 0) {
        return (
            <div className="empty-list">
                <p>Aucune tâche à afficher</p>
            </div>
        );
    }

    return (
        <div className="task-list">
            {filteredTasks.map(task => (
                <TaskItem
                    key={task._id}
                    task={task}
                    toggleTaskStatus={toggleTaskStatus}
                    deleteTask={deleteTask}
                />
            ))}
        </div>
    );
};

export default TaskList;
