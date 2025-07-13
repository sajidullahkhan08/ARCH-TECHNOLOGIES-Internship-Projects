const mongoose = require('mongoose');

const musicSchema = new mongoose.Schema({
  title: { type: String, required: true },
  artist: { type: String },
  duration: { type: Number, required: true },
  fileId: { type: mongoose.Schema.Types.ObjectId, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });

module.exports = mongoose.model('Music', musicSchema); 