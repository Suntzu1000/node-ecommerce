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
  getUserCart,
  /*emptyCart,
  applyCoupon,
  
  getOrders,
  updateOrderStatus,
  getAllOrders,
  getOrderByUserId,*/
  createOrder,
  removeProductFromCart,
  updateProductQuantityFromCart,
} = require("../controller/useCtrl");
const { authMiddlewares, isAdmin } = require("../middlewares/authMiddlewares");
const { checkout, paymentVerification } = require("../controller/paymentsCtrl");
const router = express.Router();

router.post("/cadastrar", createUser);
router.post("/forgot-password-token", forgotPasswordToken);
router.post("/reset-password-token/:token", resetPassword);
/*router.put(
  "/order/update-order/:id",
  authMiddlewares,
  isAdmin,
  updateOrderStatus
);*/

router.put("/password", authMiddlewares, updatePassword);
router.post("/login", loginUserCtrl);
router.post("/admin-login", loginAdmin);
router.post("/cart", authMiddlewares, userCart);
router.post("/order/checkout", authMiddlewares, checkout);
router.post("/order/paymentVerification", authMiddlewares, paymentVerification);
//router.post("/cart/applycoupon", authMiddlewares, applyCoupon);
router.post("/cart/create-order", authMiddlewares, createOrder);
router.get("/all-users", getallUser);
//router.get("/get-orders", authMiddlewares, getOrders);
//router.get("/getallorders", authMiddlewares, isAdmin, getAllOrders);
//router.post("/getorderbyuser/:id", authMiddlewares, isAdmin, getOrderByUserId);
router.get("/refresh", handleRefreshToken);
router.get("/logout", logout);
router.get("/wishlist", authMiddlewares, getWishList);
router.get("/cart", authMiddlewares, getUserCart);
router.get("/:id", authMiddlewares, isAdmin, getaUser);
//router.delete("/empty-cart", authMiddlewares, emptyCart);
router.delete(
  "/delete-product-cart/:cartItemId",
  authMiddlewares,
  removeProductFromCart
);
router.delete("/:id", deleteaUser);
router.put(
  "/update-product-cart/:cartItemId/:newQuantity",
  authMiddlewares,
  updateProductQuantityFromCart
);
router.put("/edit-user", authMiddlewares, updatedUser);
router.put("/save-address", authMiddlewares, saveAddress);
router.put("/block-user/:id", authMiddlewares, isAdmin, blockUser);
router.put("/unblock-user/:id", authMiddlewares, isAdmin, unblockUser);
module.exports = router;
