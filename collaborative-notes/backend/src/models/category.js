import mongoose from 'mongoose';

const CategorySchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    user: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
    color: { type: String, default: '#4A6FA5' },
    createdAt: { type: Date, default: Date.now }
});

export const Category = mongoose.model('Category', CategorySchema);
