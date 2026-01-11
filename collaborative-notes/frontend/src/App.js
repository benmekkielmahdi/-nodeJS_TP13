import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, AuthContext } from './contexts/AuthContext';
import { NotesProvider } from './contexts/NotesContext';
import Login from './components/Auth/Login';
import NoteList from './components/Notes/NoteList';
import Editor from './components/Notes/Editor';

import Register from './components/Auth/Register';
import './App.css';

const Protected = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    if (loading) return <div className="loading">Chargement...</div>;
    return user ? children : <Navigate to="/login" />;
};

function App() {
    return (
        <Router>
            <AuthProvider>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/notes" element={<Protected><NotesProvider><div className="notes-layout"><NoteList /></div></NotesProvider></Protected>} />
                    <Route path="/notes/:id" element={<Protected><NotesProvider><div className="notes-layout"><NoteList /><div className="main-editor"><Editor /></div></div></NotesProvider></Protected>} />
                    <Route path="/" element={<Navigate to="/notes" />} />
                </Routes>
            </AuthProvider>
        </Router>
    );
}
export default App;
