import mongoose from 'mongoose';

const workerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  expertise: {
    type: String,
  },
  description: {
    type: String,
  },
  country: {
    type: String,
  },
  languages: [{
    type: String,
  }],
  status: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'active',
  },
  experience: {
    type: Number,
  },
  role: {
    type: String,
    enum: ['technician', 'worker'],
    default: 'worker',
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  // Add other worker details as needed
});

const Worker = mongoose.model('Worker', workerSchema);

export default Worker;
