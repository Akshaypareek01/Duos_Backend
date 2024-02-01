import Worker from "../Models/Worker.Model.js";


// Controller function to create a new worker
export const createWorker = async (req, res) => {
  try {
    const newWorker = await Worker.create(req.body);
    res.status(201).json(newWorker);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controller function to get all workers
export const getAllWorkers = async (req, res) => {
  try {
    const workers = await Worker.find();
    res.status(200).json(workers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controller function to get worker by ID
export const getWorkerById = async (req, res) => {
  try {
    const worker = await Worker.findById(req.params.id);
    if (!worker) {
      return res.status(404).json({ message: 'Worker not found' });
    }
    res.status(200).json(worker);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controller function to update worker by ID
export const updateWorker = async (req, res) => {
  try {
    const updatedWorker = await Worker.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedWorker) {
      return res.status(404).json({ message: 'Worker not found' });
    }
    res.status(200).json(updatedWorker);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controller function to delete worker by ID
export const deleteWorker = async (req, res) => {
  try {
    const deletedWorker = await Worker.findByIdAndDelete(req.params.id);
    if (!deletedWorker) {
      return res.status(404).json({ message: 'Worker not found' });
    }
    res.status(200).json({ message: 'Worker deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controller function for worker login
export const workerLogin = async (req, res) => {
  try {
    const { username, password } = req.body;
    const worker = await Worker.findOne({ username });

    if (!worker || !worker.comparePassword(password)) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    // If login is successful, you might want to generate a token or session
    res.status(200).json({ message: 'Login successful', worker });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controller function to change the status of a worker by ID
export const changeWorkerStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const updatedWorker = await Worker.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    if (!updatedWorker) {
      return res.status(404).json({ message: 'Worker not found' });
    }
    res.status(200).json(updatedWorker);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controller function to update the username of a worker by ID
export const updateWorkerUsername = async (req, res) => {
  try {
    const { newUsername } = req.body;
    const updatedWorker = await Worker.findByIdAndUpdate(
      req.params.id,
      { username: newUsername },
      { new: true }
    );
    if (!updatedWorker) {
      return res.status(404).json({ message: 'Worker not found' });
    }
    res.status(200).json(updatedWorker);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controller function to update the password of a worker by ID
export const updateWorkerPassword = async (req, res) => {
  try {
    const { newPassword } = req.body;
    const updatedWorker = await Worker.findById(req.params.id);

    if (!updatedWorker) {
      return res.status(404).json({ message: 'Worker not found' });
    }

    // Update the password
    updatedWorker.password = newPassword;
    await updatedWorker.save();

    res.status(200).json({ message: 'Password updated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
