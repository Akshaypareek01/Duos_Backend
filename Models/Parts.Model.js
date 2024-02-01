import mongoose from 'mongoose';

const partSchema = new mongoose.Schema({
  partName: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  price: {
    type: Number,
    required: true,
  },
  // Add other part details as needed
});

const Part = mongoose.model('Part', partSchema);

export default Part;
