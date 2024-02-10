import Job from "../Models/Jobs.Model.js";
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs/promises';
export const createJob = async (req, res) => {
  try {
    const newJob = await Job.create(req.body);
    res.status(201).json(newJob);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controller function to get all jobs
export const getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find().populate('assignedWorker').populate('partsRequired').exec();
    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controller function to get job by ID
export const getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id).populate('assignedWorker').populate('partsRequired').exec();
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }
    res.status(200).json(job);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controller function to update parts required for a job
export const updatePartsRequired = async (req, res) => {
  try {
    const { partsRequired } = req.body;
    const updatedJob = await Job.findByIdAndUpdate(
      req.params.id,
      { partsRequired },
      { new: true }
    );
    if (!updatedJob) {
      return res.status(404).json({ message: 'Job not found' });
    }
    res.status(200).json(updatedJob);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controller function to update job status
export const updateJobStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const updatedJob = await Job.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    if (!updatedJob) {
      return res.status(404).json({ message: 'Job not found' });
    }
    res.status(200).json(updatedJob);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controller function to update assigned worker for a job
export const updateAssignedWorker = async (req, res) => {
  try {
    const { assignedWorker } = req.body;
    const updatedJob = await Job.findByIdAndUpdate(
      req.params.id,
      { assignedWorker },
      { new: true }
    );
    if (!updatedJob) {
      return res.status(404).json({ message: 'Job not found' });
    }
    res.status(200).json(updatedJob);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controller function to delete job by ID
export const deleteJob = async (req, res) => {
  try {
    const deletedJob = await Job.findByIdAndDelete(req.params.id);
    if (!deletedJob) {
      return res.status(404).json({ message: 'Job not found' });
    }
    res.status(200).json({ message: 'Job deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export const updateJob = async (req, res) => {
  const { jobId, updatedDetails, status } = req.body;
  
  try {
    const images = req.files;
  console.log("Images ===>", images)
    // Construct update object based on provided data
    const updateObject = {};

    if (updatedDetails) {
      updateObject.updatedDetails = updatedDetails;
    }

    if (status) {
      updateObject.status = status;
    }

    // Check if there are uploaded files
    if (req.files && req.files.length > 0) {
      // Assuming each file is an image, store the paths in the update object
      updateObject.images = images.map(file => ({
        filename: file.filename,
        path: file.path
    }));
    }

    // Update the job with the constructed update object
    const updatedJob = await Job.findByIdAndUpdate(
      jobId,
      updateObject,
      { new: true }
    );

    res.status(200).json(updatedJob);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


export const deleteImage = async (req, res) => {
  console.log("In delete function  ==>");
  const { jobId, imageId } = req.body;
  

  try {
    // Find the job by ID
    const job = await Job.findById(jobId);

    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    // Find the index of the image with the given ID
    const imageIndex = job.images.findIndex((image) => image._id == imageId);

    if (imageIndex === -1) {
      return res.status(404).json({ message: 'Image not found in job' });
    }

    // Remove the image file from the media folder
    const mediaPath = path.join(fileURLToPath(new URL(import.meta.url)), '..', 'media');
    const modifiedPath = mediaPath ;
    //  mediaPath.replace('\\Controllers', '');
    const imagePath = path.join(modifiedPath, job.images[imageIndex].filename);
    console.log(`media Path :` + mediaPath);
    console.log(`image Path :` + imagePath);
    const fileExists = await fs.access(imagePath)
  .then(() => true)
  .catch(() => false);

if (fileExists) {
  await fs.unlink(imagePath);
  job.images.splice(imageIndex, 1);
    await job.save();
    res.status(200).json({ message: 'Image deleted successfully' });
} else {
  console.log('Image file not found');
  res.status(400).json({ message: 'Image not found',
mediaPath: mediaPath
});
}

    // Remove the image from the Mongoose data
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};