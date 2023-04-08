const express = require("express");
const {
  createBrand,
  updateBrand,
  deleteBrand,
  getBrand,
  getAllBrand,
} = require("../controller/brandCtrl");
const { authMiddlewares, isAdmin } = require("../middlewares/authMiddlewares");
const router = express.Router();

router.post("/", authMiddlewares, isAdmin, createBrand);
router.put("/:id", authMiddlewares, isAdmin, updateBrand);
router.delete("/:id", authMiddlewares, isAdmin, deleteBrand);
router.get("/:id", getBrand);
router.get("/", getAllBrand);

module.exports = router;