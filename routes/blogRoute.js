const express = require("express");
const { authMiddlewares, isAdmin } = require("../middlewares/authMiddlewares");
const {
  createBlog,
  updateBlog,
  getBlog,
  getAllBlogs,
  deleteBlog,
  likeBlog,
  dislikeBlog,
  uploadImages,
} = require("../controller/blogCtrl");
const { blogImgResize, uploadPhoto } = require("../middlewares/uploadImages");
const router = express.Router();

router.post("/", authMiddlewares, isAdmin, createBlog);
router.put(
  "/upload/:id",
  authMiddlewares,
  isAdmin,
  uploadPhoto.array("images", 2),
  blogImgResize,
  uploadImages
);
router.put("/likes", authMiddlewares, isAdmin, likeBlog);
router.put("/dislikes", authMiddlewares, isAdmin, dislikeBlog);
router.put("/:id", authMiddlewares, isAdmin, updateBlog);
router.get("/:id", getBlog);
router.get("/", getAllBlogs);
router.delete("/:id", authMiddlewares, isAdmin, deleteBlog);

module.exports = router;
