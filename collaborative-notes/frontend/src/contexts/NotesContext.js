import React, { createContext, useState, useEffect, useContext } from 'react';
import { noteService } from '../services/api';
import { AuthContext } from './AuthContext';

export const NotesContext = createContext();
export const NotesProvider = ({ children }) => {
    const { user } = useContext(AuthContext);
    const [notes, setNotes] = useState([]);

    useEffect(() => {
        if (user) noteService.getNotes().then(res => setNotes(res.data.data));
    }, [user]);

    const createNote = async (data) => {
        const res = await noteService.createNote(data);
        setNotes([res.data.data, ...notes]);
        return res.data.data;
    };

    return <NotesContext.Provider value={{ notes, createNote }}>{children}</NotesContext.Provider>;
};
