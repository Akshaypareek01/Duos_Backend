import express from 'express';
import { changeWorkerStatus, createWorker, deleteWorker, getAllWorkers, getWorkerById, loginWorker, updateWorker, updateWorkerPassword, updateWorkerUsername } from '../Controllers/Worker.Controller.js';


const WorkerRouter = express.Router();

// Route to create a new worker
WorkerRouter.post('/', createWorker);

// Route to get all workers
WorkerRouter.get('/', getAllWorkers);

// Route to get worker by ID
WorkerRouter.get('/:id', getWorkerById);

// Route to update worker by ID
WorkerRouter.put('/:id', updateWorker);

// Route to delete worker by ID
WorkerRouter.delete('/:id',deleteWorker);

// Route for worker login
WorkerRouter.post('/login', loginWorker);

// Route to change the status of a worker by ID
WorkerRouter.put('/:id/change-status', changeWorkerStatus);

// Route to update the username of a worker by ID
WorkerRouter.put('/:id/update-username', updateWorkerUsername);

// Route to update the password of a worker by ID
WorkerRouter.put('/:id/update-password',updateWorkerPassword);

export default WorkerRouter;
