const express = require('express');
const router = express.Router();
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../config/cloudinary'); // path to config

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'my_drive_files', // Cloudinary folder
    allowed_formats: ['jpg', 'png', 'mp4', 'pdf', 'webp'],
  },
});

const upload = multer({ storage });

module.exports = upload;