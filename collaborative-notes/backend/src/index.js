import express from 'express';
import http from 'http';
import { Server as SocketIOServer } from 'socket.io';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import noteRoutes from './routes/notes.js';
import { setupSocketIO } from './services/socketService.js';

dotenv.config();
mongoose.connect(process.env.MONGODB_URI).then(() => console.log('MongoDB P2 Connected'));

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/notes', noteRoutes);

const server = http.createServer(app);
const io = new SocketIOServer(server, { cors: { origin: '*' } });
setupSocketIO(io);

const PORT = process.env.PORT || 5001;
server.listen(PORT, () => console.log(`Notes Server P2 Port ${PORT}`));
