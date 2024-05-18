import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const todoSchema = new Schema({
    userId: { type: mongoose.Types.ObjectId, required: true },
    todo: { type: String, required: true }
}, { versionKey: false, timestamps: true });

export default model('todo', todoSchema);