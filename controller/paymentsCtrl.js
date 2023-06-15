const RazorPay = require("razorpay");
const instance = new RazorPay({
  key_id: "",
  key_secret: "",
});

const checkout = async (req, res) => {
  const option = {
    amount: 50000,
    currency: "INR",
  };
  const order = await instance.orders.create(option);
  res.json({
    success: true,
    order,
  });
};
const paymentVerification = async (req, res) => {
  const { razorpayOrderId, RazorpayPaymentId } = req.body;
  return res.json({
    razorpayOrderId,
    RazorpayPaymentId,
  });
};

module.exports = {
  checkout,
  paymentVerification,
};
