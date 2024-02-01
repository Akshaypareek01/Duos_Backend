import mongoose from 'mongoose';

const invoiceSchema = new mongoose.Schema({
  date: {
    type: Date,
    default: Date.now,
  },
  amountToBePaid: {
    type: Number,
    required: true,
  },
  companyName: {
    type: String,
    required: true,
  },
  worker: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Worker', // Reference to the Worker model
  },
  job: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Job', // Reference to the Job model
  },
  timeOfCompletion: {
    type: Date,
  },
  // Add other fields as needed for the invoice
});

const Invoice = mongoose.model('Invoice', invoiceSchema);

export default Invoice;
