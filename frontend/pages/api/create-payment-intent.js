const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const calculateOrderAmount = (items) => {
  return 1400;
};

export default async function handler(req, res) {

  const paymentIntent = await stripe.paymentIntents.create({
   
    amount: 1099,
    currency: 'inr',
    automatic_payment_methods: {
      enabled: true,
    },
  });
  res.send({
    clientSecret: paymentIntent.client_secret,

  });
};
