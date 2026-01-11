import mongoose from 'mongoose';

const NoteSchema = new mongoose.Schema({
    title: { type: String, required: true, trim: true },
    content: { type: String, required: true },
    category: { type: mongoose.Schema.ObjectId, ref: 'Category', default: null },
    owner: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
    sharedWith: [{
        user: { type: mongoose.Schema.ObjectId, ref: 'User' },
        permission: { type: String, enum: ['read', 'write'], default: 'read' }
    }],
    version: { type: Number, default: 1 },
    history: [{
        content: String,
        updatedBy: { type: mongoose.Schema.ObjectId, ref: 'User' },
        updatedAt: { type: Date, default: Date.now }
    }]
}, { timestamps: true });

NoteSchema.index({ title: 'text', content: 'text' });

export const Note = mongoose.model('Note', NoteSchema);
