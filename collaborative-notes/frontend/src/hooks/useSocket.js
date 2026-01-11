import { useState, useEffect } from 'react';
import { getSocket, joinNote, leaveNote, sendContentUpdate } from '../services/socket';

export const useSocket = (noteId) => {
    const [remoteContent, setRemoteContent] = useState(null);
    useEffect(() => {
        if (!noteId) return;
        joinNote(noteId);
        const socket = getSocket();
        socket?.on('contentUpdate', data => setRemoteContent(data.content));
        return () => { leaveNote(noteId); socket?.off('contentUpdate'); };
    }, [noteId]);

    return { remoteContent, updateContent: (c) => sendContentUpdate(noteId, c) };
};
