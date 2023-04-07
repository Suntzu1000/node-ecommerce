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
} = require("../controller/blogCtrl");
const router = express.Router();

router.post("/", authMiddlewares, isAdmin, createBlog);
router.put("/likes", authMiddlewares, isAdmin, likeBlog);
router.put("/dislikes", authMiddlewares, isAdmin, dislikeBlog);
router.put("/:id", authMiddlewares, isAdmin, updateBlog);
router.get("/:id", getBlog);
router.get("/", getAllBlogs);
router.delete("/:id", authMiddlewares, isAdmin, deleteBlog);

module.exports = router;
