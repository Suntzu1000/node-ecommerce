const express = require("express");
const {
  createProduct,
  getaProduct,
  getAllProduct,
  updateProduct,
  deleteProduct,
} = require("../controller/productCtrl");
const { isAdmin, authMiddlewares } = require("../middlewares/authMiddlewares");
const router = express.Router();

router.post("/", authMiddlewares, isAdmin,  createProduct);
router.get("/:id", getaProduct);
router.put("/:id", authMiddlewares, isAdmin,  updateProduct);
router.delete("/:id", authMiddlewares, isAdmin,  deleteProduct);
router.get("/", getAllProduct);

module.exports = router;
