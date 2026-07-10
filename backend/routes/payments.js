const router = require("express").Router();
const Stripe = require("stripe");

const STRIPE_SECRET = process.env.STRIPE_SECRET_KEY;
const STRIPE_PUB = process.env.STRIPE_PUBLISHABLE_KEY;

const stripe = new Stripe(STRIPE_SECRET, {
  apiVersion: "2023-10-16",
});

router.get("/config", (req, res) => {
  res.json({
    publishableKey: STRIPE_PUB,
  });
});

// Create a PaymentIntent
router.post("/create-payment-intent", async (req, res) => {
  try {
    const { amount } = req.body;

    const amountNum = Math.round(Number(amount));

    if (!amountNum || amountNum <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid amount.",
      });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amountNum * 100,
      currency: "eur",
      automatic_payment_methods: {
        enabled: true,
      },
    });

    res.json({
      success: true,
      clientSecret: paymentIntent.client_secret,
    });

  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

module.exports = router;