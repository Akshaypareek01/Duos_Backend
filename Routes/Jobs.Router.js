import express from 'express';
import { createJob, deleteJob, getAllJobs, getJobById, updateAssignedWorker, updateJob, updateJobStatus, updatePartsRequired } from '../Controllers/Jobs.Controller.js';


const JobRouter = express.Router();

// Route to create a new job
JobRouter.post('/', createJob);

// Route to get all jobs
JobRouter.get('/', getAllJobs);

// Route to get job by ID
JobRouter.get('/:id', getJobById);

// Route to update parts required for a job
JobRouter.put('/:id/update-parts-required', updatePartsRequired);

// Route to update job status
JobRouter.put('/:id/update-status', updateJobStatus);

// Route to update assigned worker for a job
JobRouter.put('/:id/update-assigned-worker', updateAssignedWorker);

// Route to delete job by ID
JobRouter.delete('/:id', deleteJob);

JobRouter.put('/updateJob', updateJob);

export default JobRouter;
