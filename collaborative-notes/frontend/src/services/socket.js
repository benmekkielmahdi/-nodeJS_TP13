import { io } from 'socket.io-client';

let socket = null;
export const initSocket = (token) => {
    socket = io('http://localhost:5001', { auth: { token } });
    return socket;
};
export const getSocket = () => socket;
export const joinNote = (id) => socket?.emit('joinNote', id);
export const leaveNote = (id) => socket?.emit('leaveNote', id);
export const sendContentUpdate = (noteId, content, cursor) => socket?.emit('contentUpdate', { noteId, content, cursor });
export const disconnectSocket = () => { socket?.disconnect(); socket = null; };
