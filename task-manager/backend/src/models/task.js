import mongoose from 'mongoose';

const TaskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    done: {
        type: Boolean,
        default: false
    },
    assignedTo: {
        type: String,
        default: null
    }
}, {
    timestamps: true
});

export const Task = mongoose.model('Task', TaskSchema);
