const catchAsyncErrors = require("../middleware/catchAsyncErrors");

const stripe = require("stripe")('sk_test_51KqW4cHTLg5vYuxh73lImlbZ0UWUMyRcloea1CqcgttdLkCWksDBmwMa7ETbjQdqPWvdk1xqH0pBhj7zsLHapLI000o9jF64Rs');
class Processpayment{
static processPayment = catchAsyncErrors(async (req, res, next) => {
  const myPayment = await stripe.paymentIntents.create({
    amount: req.body.amount,
    currency: "inr",
    metadata: {
      company: "Ecommerce",
    },
  });

  res
    .status(200)
    .json({ success: true, client_secret: myPayment.client_secret });
});
static sendStripeApiKey = catchAsyncErrors(async (req, res, next) => {
  res.status(200).json({ stripeApiKey: process.env.STRIPE_API_KEY });
});
}
module.exports=Processpayment;
