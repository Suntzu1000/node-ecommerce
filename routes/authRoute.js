const express = require("express");
const {
  createUser,
  loginUserCtrl,
  getallUser,
  getaUser,
  deleteaUser,
  updatedUser,
  blockUser,
  unblockUser,
  handleRefreshToken,
  logout,
  updatePassword,
  forgotPasswordToken,
  resetPassword,
  loginAdmin,
  getWishList,
  saveAddress,
  userCart,
} = require("../controller/useCtrl");
const { authMiddlewares, isAdmin } = require("../middlewares/authMiddlewares");
const router = express.Router();

router.post("/register", createUser);
router.post("/forgot-password-token", forgotPasswordToken);
router.post("/reset-password-token/:token", resetPassword);
router.put("/password", authMiddlewares, updatePassword);
router.post("/login", loginUserCtrl);
router.post("/admin_login", loginAdmin);
router.post("/cart", userCart);
router.get("/all-users", getallUser);
router.get("/refresh", handleRefreshToken);
router.get("/logout", logout);
router.get("/whishlist", authMiddlewares, getWishList);
router.get("/:id", authMiddlewares, isAdmin, getaUser);
router.delete("/:id", deleteaUser);
router.put("/edit-user", authMiddlewares, updatedUser);
router.put("/save-address", authMiddlewares, saveAddress);
router.put("/block-user/:id", authMiddlewares, isAdmin, blockUser);
router.put("/unblock-user/:id", authMiddlewares, isAdmin, unblockUser);
module.exports = router;
