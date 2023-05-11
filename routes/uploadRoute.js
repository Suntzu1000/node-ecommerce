const express = require("express");
const { isAdmin, authMiddlewares } = require("../middlewares/authMiddlewares");
const { uploadImages, deleteImages } = require("../controller/uploadCtrl");
const {
  uploadPhoto,
  productImgResize,
} = require("../middlewares/uploadImages");
const router = express.Router();

router.post(
  "/",
  authMiddlewares,
  isAdmin,
  uploadPhoto.array("images", 10),
  productImgResize,
  uploadImages
);
router.delete("/delete-img/:id", authMiddlewares, isAdmin, deleteImages);

module.exports = router;
