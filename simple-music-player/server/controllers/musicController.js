const mongoose = require('mongoose');
const Music = require('../models/Music');
const { Readable } = require('stream');

// Get GridFSBucket
const getBucket = () => {
  return new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
    bucketName: 'music',
  });
};

exports.uploadMusic = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }
    const { title, artist, duration } = req.body;
    if (!title || !duration) {
      return res.status(400).json({ message: 'Title and duration are required' });
    }
    const music = await Music.create({
      title,
      artist,
      duration,
      fileId: req.file.id,
      userId: req.user._id,
    });
    res.status(201).json(music);
  } catch (err) {
    next(err);
  }
};

exports.getMusicList = async (req, res, next) => {
  try {
    const musicList = await Music.find({ userId: req.user._id }).sort({ createdAt: -1 });
    res.json(musicList);
  } catch (err) {
    next(err);
  }
};

exports.streamMusic = async (req, res, next) => {
  try {
    const music = await Music.findById(req.params.id);
    if (!music) return res.status(404).json({ message: 'Music not found' });
    const bucket = getBucket();
    const file = await bucket.find({ _id: music.fileId }).toArray();
    if (!file || file.length === 0) {
      return res.status(404).json({ message: 'File not found' });
    }
    res.set('Content-Type', 'audio/mpeg');
    bucket.openDownloadStream(music.fileId).pipe(res);
  } catch (err) {
    next(err);
  }
};

exports.deleteMusic = async (req, res, next) => {
  try {
    const music = await Music.findById(req.params.id);
    if (!music) return res.status(404).json({ message: 'Music not found' });
    if (!music.userId.equals(req.user._id)) {
      return res.status(403).json({ message: 'Unauthorized' });
    }
    const bucket = getBucket();
    await bucket.delete(music.fileId);
    await music.deleteOne();
    res.json({ message: 'Music deleted' });
  } catch (err) {
    next(err);
  }
}; 