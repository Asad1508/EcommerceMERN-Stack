const express = require("express");
const Processpayment = require("../controllers/paymentController");
const router = express.Router();
// const { isAuthenticatedUser } = require("../middleware/auth");

// router.route("/payment/process").post(isAuthenticatedUser,processPayment);

// router.route("/stripeapikey").get(isAuthenticatedUser, sendStripeApiKey);

router.post("/payment/process",Processpayment.processPayment);
router.get("/stripeapikey",Processpayment.sendStripeApiKey);
module.exports = router;
