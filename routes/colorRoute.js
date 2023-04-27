const express = require("express");
const {
  createColor,
  updateColor,
  deleteColor,
  getColor,
  getAllColor,
} = require("../controller/colorCtrl");
const { authMiddlewares, isAdmin } = require("../middlewares/authMiddlewares");
const router = express.Router();

router.post("/", authMiddlewares, isAdmin, createColor);
router.put("/:id", authMiddlewares, isAdmin, updateColor);
router.delete("/:id", authMiddlewares, isAdmin, deleteColor);
router.get("/:id", getColor);
router.get("/", getAllColor);

module.exports = router;