import React from 'react';

const TaskFilter = ({ filter, setFilter }) => {
    return (
        <div className="task-filter">
            Filtrer :
            <div className="filter-buttons">
                <button className={filter === 'all' ? 'active' : ''} onClick={() => setFilter('all')}>
                    Toutes
                </button>
                <button className={filter === 'active' ? 'active' : ''} onClick={() => setFilter('active')}>
                    À faire
                </button>
                <button className={filter === 'completed' ? 'active' : ''} onClick={() => setFilter('completed')}>
                    Terminées
                </button>
            </div>
        </div>
    );
};

export default TaskFilter;
