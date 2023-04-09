const express = require("express");
const { createCoupon } = require("../controller/couponCtrl");
const { authMiddlewares, isAdmin } = require("../middlewares/authMiddlewares");
const router = express.Router();

router.post("/", authMiddlewares, isAdmin, createCoupon);

module.exports = router;
