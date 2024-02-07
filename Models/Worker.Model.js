import mongoose from 'mongoose';

const workerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  mobile: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  pincode: {
    type: String,
  },
  address: {
    type: String,
  },
  city: {
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
    enum: ['technician', 'spare parts'],
    default: 'technician',
  },
  pin: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

const Worker = mongoose.model('Worker', workerSchema);

export default Worker;
