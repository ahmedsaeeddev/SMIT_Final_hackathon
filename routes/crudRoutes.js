import express from 'express';
import upload from '../middlewares/uploadMiddleware.js';
import { getAllData, createData, updateData, deleteData } from '../controllers/crudController.js';

const router = express.Router();

router.get('/', getAllData);
router.post('/', upload.single('image'), createData);
router.put('/update/:id', updateData);
router.delete('/:id', deleteData);

export default router;
