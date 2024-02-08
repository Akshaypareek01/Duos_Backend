import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema({
  jobName: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
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
  assignedWorker: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Worker', // Reference to the Worker model (if applicable)
  },
  user: {
    name: {
      type: String,
    },
    email: {
      type: String,
    },
    mobileNumber: {
      type: String,
    },
    address: {
      type: String,
    },
    city:{
      type: String,
    },
    country:{
      type: String
    },
    pincode:{
      type:String
    }
    // Add other user details as needed (e.g., address)
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedDetails :{
    type: String,
    required: false,
  },
  images: [{
    type: String,
    required: false,
  }],
  
});

const Job = mongoose.model('Job', jobSchema);

export default Job;
