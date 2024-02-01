import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema({
  jobName: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'inprogress', 'completed', 'onhold'],
    default: 'pending',
  },
  partsRequired: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Part', // Reference to the Part model
  }],
  address: {
    type: String,
    required: true,
  },
  assignedWorker: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Worker', // Reference to the Worker model (if applicable)
  },
  user: {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    mobileNumber: {
      type: String,
      required: true,
    },
    // Add other user details as needed (e.g., address)
  },
});

const Job = mongoose.model('Job', jobSchema);

export default Job;
