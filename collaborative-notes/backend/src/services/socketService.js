import jwt from 'jsonwebtoken';
import { User } from '../models/user.js';
import { Note } from '../models/note.js';

export const setupSocketIO = (io) => {
    io.use(async (socket, next) => {
        try {
            const token = socket.handshake.auth.token;
            if (!token) return next(new Error('Non authentifié'));
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            socket.user = await User.findById(decoded.id);
            next();
        } catch (error) { next(new Error('Auth Error')); }
    });

    io.on('connection', (socket) => {
        socket.on('joinNote', async (noteId) => {
            socket.join(`note:${noteId}`);
        });
        socket.on('leaveNote', (noteId) => {
            socket.leave(`note:${noteId}`);
        });
        socket.on('contentUpdate', (data) => {
            socket.to(`note:${data.noteId}`).emit('contentUpdate', { ...data, updatedBy: { id: socket.user._id, name: socket.user.name } });
        });
    });
};
