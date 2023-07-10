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
  getMyOrders,
  getMonthWiseOrderIncome,
  getYearlyTotalOrders,
  getAllOrders,
  getSingleOrder,
  updateOrders,
  emptyCart,
} = require("../controller/useCtrl");
const { authMiddlewares, isAdmin } = require("../middlewares/authMiddlewares");
const { checkout, paymentVerification } = require("../controller/paymentsCtrl");
const router = express.Router();

router.post("/cadastrar", createUser);
router.post("/forgot-password-token", forgotPasswordToken);

/*router.put(
  "/order/update-order/:id",
  authMiddlewares,
  isAdmin,
  updateOrderStatus
);*/
router.put("/reset-password/:token", resetPassword);
router.put("/password", authMiddlewares, updatePassword);
router.post("/login", loginUserCtrl);
router.post("/admin-login", loginAdmin);
router.post("/cart", authMiddlewares, userCart);
router.post("/order/checkout", authMiddlewares, checkout);
router.post("/order/paymentVerification", authMiddlewares, paymentVerification);
//router.post("/cart/applycoupon", authMiddlewares, applyCoupon);
router.post("/cart/create-order", authMiddlewares, createOrder);
router.get("/all-users", getallUser);
router.get("/getmyorders", authMiddlewares, getMyOrders);
router.get("/getallorders", authMiddlewares, isAdmin, getAllOrders);
router.get("/getaorder/:id", authMiddlewares, isAdmin, getSingleOrder);
router.put("/updateOrder/:id", authMiddlewares, isAdmin, updateOrders);
//router.post("/getorderbyuser/:id", authMiddlewares, isAdmin, getOrderByUserId);
router.get("/refresh", handleRefreshToken);
router.get("/logout", logout);
router.get("/wishlist", authMiddlewares, getWishList);
router.get("/cart", authMiddlewares, getUserCart);
router.get(
  "/getMonthWiseOrderIncome",
  authMiddlewares,
  getMonthWiseOrderIncome
);
router.get("/getyearlytotalorders", authMiddlewares, getYearlyTotalOrders);
router.get("/:id", authMiddlewares, isAdmin, getaUser);
//router.delete("/empty-cart", authMiddlewares, emptyCart);
router.delete(
  "/delete-product-cart/:cartItemId",
  authMiddlewares,
  removeProductFromCart
);
router.put(
  "/update-product-cart/:cartItemId/:newQuantity",
  authMiddlewares,
  updateProductQuantityFromCart
);
router.delete("/empty-cart", authMiddlewares, emptyCart);
router.delete("/:id", deleteaUser);

router.put("/edit-user", authMiddlewares, updatedUser);
router.put("/save-address", authMiddlewares, saveAddress);
router.put("/block-user/:id", authMiddlewares, isAdmin, blockUser);
router.put("/unblock-user/:id", authMiddlewares, isAdmin, unblockUser);
module.exports = router;
