const express = require("express");
const {
  createProduct,
  getaProduct,
  getAllProduct,
  updateProduct,
  deleteProduct,
  addWishList,
  rating,
} = require("../controller/productCtrl");
const { isAdmin, authMiddlewares } = require("../middlewares/authMiddlewares");
const router = express.Router();

router.post("/", authMiddlewares, isAdmin,  createProduct);
router.get("/:id", getaProduct);
router.put("/whishlist", authMiddlewares, isAdmin,  addWishList);
router.put("/rating", authMiddlewares, isAdmin,  rating);
router.put("/:id", authMiddlewares, isAdmin,  updateProduct);
router.delete("/:id", authMiddlewares, isAdmin,  deleteProduct);
router.get("/", getAllProduct);

module.exports = router;
