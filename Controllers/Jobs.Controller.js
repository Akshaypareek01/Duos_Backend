import Job from "../Models/Jobs.Model.js";

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
  const { jobId, updatedDetails, images, status } = req.body;

  try {
    // Construct update object based on provided data
    const updateObject = {};
    
    if (updatedDetails) {
      updateObject.updatedDetails = updatedDetails;
    }

    if (images && images.length > 0) {
      updateObject.$push = { images };
    }

    if (status) {
      updateObject.status = status;
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