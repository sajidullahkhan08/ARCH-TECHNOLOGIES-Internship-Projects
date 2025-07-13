const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const upload = require('../middleware/upload');
const {
  uploadMusic,
  getMusicList,
  streamMusic,
  deleteMusic,
} = require('../controllers/musicController');

router.post('/upload', auth, upload.single('file'), uploadMusic);
router.get('/', auth, getMusicList);
router.get('/:id', auth, streamMusic);
router.delete('/:id', auth, deleteMusic);

module.exports = router; 