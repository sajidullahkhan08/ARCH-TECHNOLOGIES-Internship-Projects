const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Configure storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadsDir);
  },
  filename: function (req, file, cb) {
    // Create unique filename with timestamp
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

// File filter for images only
const fileFilter = (req, file, cb) => {
  // Check file type
  if (file.mimetype.startsWith('image/')) {
    // Check file extension
    const allowedExtensions = ['.jpg', '.jpeg', '.png', '.gif'];
    const fileExtension = path.extname(file.originalname).toLowerCase();
    
    if (allowedExtensions.includes(fileExtension)) {
      cb(null, true);
    } else {
      cb(new Error('Only JPG, JPEG, PNG, and GIF files are allowed'), false);
    }
  } else {
    cb(new Error('Only image files are allowed'), false);
  }
};

// Configure multer
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
    files: 1 // Only one file at a time
  }
});

// Middleware for single image upload
const uploadImage = upload.single('image');

// Error handling wrapper
const uploadMiddleware = (req, res, next) => {
  uploadImage(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      // Multer error
      if (err.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).json({ 
          success: false, 
          message: 'File too large. Maximum size is 5MB' 
        });
      }
      return res.status(400).json({ 
        success: false, 
        message: err.message 
      });
    } else if (err) {
      // Other errors (file type, etc.)
      return res.status(400).json({ 
        success: false, 
        message: err.message 
      });
    }
    
    // File uploaded successfully
    if (req.file) {
      req.file.path = req.file.path.replace(/\\/g, '/'); // Normalize path for cross-platform
    }
    
    next();
  });
};

module.exports = { uploadMiddleware }; 