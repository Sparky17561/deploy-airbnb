// cloudConfig.js
const { v2: cloudinary } = require('cloudinary');
const { CloudinaryStorage } = require('@fluidjs/multer-cloudinary');
require('dotenv').config();

cloudinary.config({
  cloud_name:    process.env.CLOUD_NAME,
  api_key:       process.env.CLOUD_API_KEY,
  api_secret:    process.env.CLOUD_SECRET_KEY
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder:          'wanderlust_DEV',
    allowed_formats: ['jpg','jpeg','png']
  }
});

module.exports = { cloudinary, storage };
