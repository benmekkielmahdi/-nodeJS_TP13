import { Router } from 'express';
import { Task } from '../models/task.js';

const router = Router();

// Récupérer toutes les tâches
router.get('/', async (req, res) => {
    try {
        const tasks = await Task.find().sort('-createdAt');
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Créer une nouvelle tâche
router.post('/', async (req, res) => {
    try {
        const task = await Task.create(req.body);
        res.status(201).json(task);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Mettre à jour une tâche
router.put('/:id', async (req, res) => {
    try {
        const task = await Task.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!task) {
            return res.status(404).json({ message: 'Tâche non trouvée' });
        }

        res.json(task);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Supprimer une tâche
router.delete('/:id', async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id);

        if (!task) {
            return res.status(404).json({ message: 'Tâche non trouvée' });
        }

        res.status(204).end();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;
