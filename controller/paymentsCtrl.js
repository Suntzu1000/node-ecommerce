const mercadopago = require("mercadopago");


mercadopago.configure({
  access_token: process.env.ACCESS_TOKEN_MERCADOPAGO,
});

const checkout = async (req, res) => {
  const {amount, title} = req.body
  const preference = {
    items: [
      {
        title: title,
        amount: amount,
        quantity: 1,
      },
    ],
  };

  try {
    const response = await mercadopago.preferences.create(preference);
    const { id: preferenceId } = response.body;
    res.json({
      success: true,
      preferenceId,
    });
  } catch (error) {
    res.json({
      success: false,
      error: error.message,
    });
  }
};

const paymentVerification = async (req, res) => {
  const { preferenceId, paymentId } = req.body;

  try {
    const paymentInfo = await mercadopago.payment.get(paymentId);
    const { order_id: mercadoPagoOrderId } = paymentInfo.response;

    res.json({
      mercadoPagoOrderId,
      paymentId,
    });
  } catch (error) {
    res.json({
      success: false,
      error: error.message,
    });
  }
};

module.exports = {
  checkout,
  paymentVerification,
};

