import mongoose from 'mongoose';

const dataSchema = new mongoose.Schema({
    title: String,
    description: String,
    imageUrl: String,
});

export default mongoose.model('Data', dataSchema);
