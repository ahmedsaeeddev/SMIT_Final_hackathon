import Data from '../models/Data.js';

export const getAllData = async (req, res) => {
    try {
        const data = await Data.find();
        res.status(200).json(data);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const createData = async (req, res) => {
    try {
        const { title, description } = req.body;
        const imageUrl = req.file.path;
        const data = new Data({ title, description, imageUrl });
        await Data.create(data);

        res.status(201).json(data);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const updateData = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedData = await Data.findByIdAndUpdate(id, req.body, { new: true });
        res.status(200).json(updatedData);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const deleteData = async (req, res) => {
    try {
        const { id } = req.params;
        await Data.findByIdAndDelete(id);
        res.status(200).json({ message: 'Data deleted successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
