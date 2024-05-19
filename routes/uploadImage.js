const express = require('express');
const router = express.Router();

let multer = require("multer");
const apiController = require('../controllers/uploadImage');

const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 10 * 1024 * 1024, // 10MB limit
    },

});


router.post('/',upload.single('image'),apiController.uploadImage);
// router.post('/upload-image/:folderName',upload.single('image'),apiController.uploadImage);
router.post('/delete-image',apiController.deleteFile);

module.exports = router;
