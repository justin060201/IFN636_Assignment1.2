const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  budget: { type: Number, required: true },
  deadline: { type: Date, required: true },
  filePath: { type: String },
  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },

  freelancer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },

  
  status: {
    type: String,
    enum: ['Open', 'In Progress', 'Completed', 'Cancelled'],
    default: 'Open'
  }

}, { timestamps: true });

module.exports = mongoose.model('Project', projectSchema);