const express = require('express');
const postController = require('./../controllers/postController');
const multer = require('multer');
const AppError = require('./../utils/appError');
const path = require('path');
const app = require('../app');

const storage = multer.diskStorage({
  destination: function (req, file, cd) {
    cd(null, 'public/images');
  },

  filename: function (req, file, cd) {
    cd(
      null,
      file.fieldname + '-' + Date.now() + path.extname(file.originalname)
    );
    console.log(req.file);
  },
});

const upload = multer({
  storage: storage,
  preservePath: true,
});

const router = express.Router();

// router.patch(
//   '/update/:id',
//   upload.single('imageCover'),
//   postController.updatePost
// );

router
  .route('/')
  .get(postController.getAllPosts)
  .post(upload.single('imageCover'), postController.createPost);

router
  .route('/:id')
  .get(postController.getPost)
  .patch(upload.single('imageCover'), postController.updatePost)
  .delete(postController.deletePost);

module.exports = router;
