import { Note } from '../models/note.js';
import { Category } from '../models/category.js';
import { User } from '../models/user.js';

export const getNotes = async (req, res) => {
    try {
        const notes = await Note.find({
            $or: [{ owner: req.user.id }, { 'sharedWith.user': req.user.id }]
        }).populate('category', 'name color');
        res.status(200).json({ success: true, count: notes.length, data: notes });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const getNote = async (req, res) => {
    try {
        const note = await Note.findById(req.params.id)
            .populate('category', 'name color')
            .populate('owner', 'name email')
            .populate('sharedWith.user', 'name email');
        if (!note) return res.status(404).json({ success: false, message: 'Note non trouvée' });
        res.status(200).json({ success: true, data: note });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const createNote = async (req, res) => {
    try {
        req.body.owner = req.user.id;
        const note = await Note.create(req.body);
        res.status(201).json({ success: true, data: note });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const updateNote = async (req, res) => {
    try {
        let note = await Note.findById(req.params.id);
        if (!note) return res.status(404).json({ success: false, message: 'Note non trouvée' });
        if (req.body.content && req.body.content !== note.content) {
            note.history.push({ content: note.content, updatedBy: req.user.id, updatedAt: Date.now() });
            note.version += 1;
        }
        note = await Note.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json({ success: true, data: note });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const deleteNote = async (req, res) => {
    try {
        const note = await Note.findById(req.params.id);
        if (!note) return res.status(404).json({ success: false, message: 'Note non trouvée' });
        await note.deleteOne();
        res.status(200).json({ success: true, data: {} });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const shareNote = async (req, res) => {
    try {
        const { email, permission } = req.body;
        const userToShare = await User.findOne({ email });
        if (!userToShare) return res.status(404).json({ success: false, message: 'Utilisateur non trouvé' });
        const note = await Note.findById(req.params.id);
        note.sharedWith.push({ user: userToShare._id, permission });
        await note.save();
        res.status(200).json({ success: true, data: note });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const searchNotes = async (req, res) => {
    try {
        const notes = await Note.find({ $text: { $search: req.query.query } });
        res.status(200).json({ success: true, data: notes });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
