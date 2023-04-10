const express = require("express");
const {
  createCoupon,
  getAllCoupons,
  updateCoupon,
  deleteCoupon,
} = require("../controller/couponCtrl");
const { authMiddlewares, isAdmin } = require("../middlewares/authMiddlewares");
const router = express.Router();

router.post("/", authMiddlewares, isAdmin, createCoupon);
router.get("/", authMiddlewares, isAdmin, getAllCoupons);
router.put("/:id", authMiddlewares, isAdmin, updateCoupon);
router.delete("/:id", authMiddlewares, isAdmin, deleteCoupon);

module.exports = router;
