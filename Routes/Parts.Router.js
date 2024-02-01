import express from 'express';
import { createPart, deletePart, getAllParts, getPartById, updatePart } from '../Controllers/Parts.Controller.js';


const PartsRouter = express.Router();

// Route to create a new part
PartsRouter.post('/', createPart);

// Route to get all parts
PartsRouter.get('/', getAllParts);

// Route to get part by ID
PartsRouter.get('/:id', getPartById);

// Route to update part by ID
PartsRouter.put('/:id', updatePart);

// Route to delete part by ID
PartsRouter.delete('/:id', deletePart);

export default PartsRouter;
