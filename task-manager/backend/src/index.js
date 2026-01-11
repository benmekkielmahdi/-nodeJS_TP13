import express from 'express';
import http from 'http';
import { Server as SocketIOServer } from 'socket.io';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import tasksRouter from './routes/tasks.js';

// Chargement des variables d'environnement
dotenv.config();

// Connexion à MongoDB
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('Connecté à MongoDB'))
    .catch(err => console.error('Erreur de connexion à MongoDB:', err));

// Configuration de l'application Express
const app = express();
app.use(cors());
app.use(express.json());

// Routes API
app.use('/api/tasks', tasksRouter);

// Création du serveur HTTP et Socket.IO
const httpServer = http.createServer(app);
const io = new SocketIOServer(httpServer, {
    cors: { origin: '*' }
});

// Gestion des connexions Socket.IO
io.on('connection', (socket) => {
    console.log(`Client connecté: ${socket.id}`);

    // Écoute des événements de mise à jour de tâches
    socket.on('taskCreated', (task) => {
        socket.broadcast.emit('taskCreated', task);
    });

    socket.on('taskUpdated', (task) => {
        socket.broadcast.emit('taskUpdated', task);
    });

    socket.on('taskDeleted', (taskId) => {
        socket.broadcast.emit('taskDeleted', taskId);
    });

    socket.on('disconnect', () => {
        console.log(`Client déconnecté: ${socket.id}`);
    });
});

// Démarrage du serveur
const PORT = process.env.PORT || 4001;
httpServer.listen(PORT, () => {
    console.log(`Serveur en écoute sur le port ${PORT}`);
});
