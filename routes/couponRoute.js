const express = require("express");
const {
  createCoupon,
  getCoupons,
  updateCoupon,
  deleteCoupon,
} = require("../controller/couponCtrl");
const { authMiddlewares, isAdmin } = require("../middlewares/authMiddlewares");
const router = express.Router();

router.post("/", authMiddlewares, isAdmin, createCoupon);
router.get("/", authMiddlewares, isAdmin, getCoupons);
router.get("/:id", authMiddlewares, isAdmin, getCoupons);
router.put("/:id", authMiddlewares, isAdmin, updateCoupon);
router.delete("/:id", authMiddlewares, isAdmin, deleteCoupon);

module.exports = router;
