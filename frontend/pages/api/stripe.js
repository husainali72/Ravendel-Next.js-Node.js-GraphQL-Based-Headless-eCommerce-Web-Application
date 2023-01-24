

const KEY = "sk_test_51MTLlASF6q8oKUUa0lGCoiQJHyR6Mt2te6p55lN74kL2PUMYDArh7reFdcMm2vBOGNMjEY2NQWnHDqnyLqWMZpaD003iGJWqpk"
const stripe = require('stripe')(KEY);
// console.log('KEY',process.env.STRIPE_SECRET_KEY)

export default async function handler(req, res) {
  // res.header("Access-Control-Allow-Origin", "*");

  if (req.method === 'POST') {
    try {
      console.log('cartInStripe',req.body.cartItems)
      // Create Checkout Sessions from body params.

      const params ={
        // submit_type: 'pay',
        // payment_method_types: ['card'],
        // billing_address_collection: 'auto',
        // shipping_options:[
        //   { shipping_rate: 'shr_1MTOIsSF6q8oKUUaC3B13bro' },
         
        // ],
        line_items: [
          {
            // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
          price: 'price_1MTNnFSF6q8oKUUazZXw3Tb4',
          quantity :1
          },
        ],
        mode: 'payment',
        success_url: `${req.headers.origin}/?success=true`,
        cancel_url: `${req.headers.origin}/?canceled=true`,
      }

      const session = await stripe.checkout.sessions.create(params);
      console.log('sessionn',session)
      
      res.redirect(303, session.url);
    } catch (err) {
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
  }