import React, { useContext } from 'react';
import { NotesContext } from '../../contexts/NotesContext';
import { AuthContext } from '../../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

const NoteList = () => {
    const { notes, createNote } = useContext(NotesContext);
    const { logout, user } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleCreate = async () => {
        const note = await createNote({ title: 'Nouvelle Note', content: '<p>Écrivez ici...</p>' });
        navigate(`/notes/${note._id}`);
    };

    return (
        <div className="sidebar">
            <div style={{ marginBottom: '30px' }}>
                <h3>👋 {user?.name}</h3>
                <button onClick={logout} style={{ background: 'none', border: 'none', color: '#ff4d4d', cursor: 'pointer', padding: '0', fontSize: '0.9rem' }}>Déconnexion</button>
            </div>

            <button className="btn-primary" onClick={handleCreate} style={{ marginBottom: '20px' }}>
                + Nouvelle Note
            </button>

            <div className="notes-nav">
                {notes.map(n => (
                    <Link key={n._id} to={`/notes/${n._id}`} className="note-link" style={{ display: 'block', padding: '10px', color: 'white', textDecoration: 'none', borderRadius: '8px', marginBottom: '5px', background: 'rgba(255,255,255,0.05)' }}>
                        {n.title}
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default NoteList;
