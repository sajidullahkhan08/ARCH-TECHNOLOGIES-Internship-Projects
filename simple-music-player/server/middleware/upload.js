const multer = require('multer');
const { GridFsStorage } = require('multer-gridfs-storage');
const path = require('path');

const storage = new GridFsStorage({
  url: process.env.MONGO_URI,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      const ext = path.extname(file.originalname).toLowerCase();
      if (ext !== '.mp3') {
        return reject(new Error('Only MP3 files are allowed'));
      }
      resolve({
        filename: `${Date.now()}-${file.originalname}`,
        bucketName: 'music',
      });
    });
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
  fileFilter: (req, file, cb) => {
    if (file.mimetype !== 'audio/mpeg' && file.mimetype !== 'audio/mp3') {
      return cb(new Error('Only MP3 files are allowed'));
    }
    cb(null, true);
  },
});

module.exports = upload; 