const mongoose = require('mongoose');

module.exports = mongoose.model(
  'Message',
  new mongoose.Schema({
    title: { type: String, maxlength: 256, required: true },
    text: { type: String, maxlength: 5000 },
    timestamp: { type: Date, default: Date.now },
    author: { type: mongoose.ObjectId, required: true },
  })
);
