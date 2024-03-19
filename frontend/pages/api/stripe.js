/* eslint-disable no-undef */
const KEY = process.env.STRIPE_SECRET_KEY;
const stripe = require('stripe')(KEY);
export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const params ={
        line_items: req.body.map((item) => {
          return {
            price_data: { 
              currency: 'usd',
              product_data: { 
                name: item.name,
                images: [item?.feature_image?.original],
              },
              unit_amount: item?.pricing?.sellprice * 100,
            },
            // adjustable_quantity: {
            //   enabled:true,
            //   minimum: 1,
            // },
            quantity: item.quantity
          }
        }),
        mode: 'payment',
        // success_url: `${req.headers.origin}/?success=true`,
        success_url: `${req.headers.origin}/orderstatus/thankyou`,
        cancel_url: `${req.headers.origin}/?canceled=true`,
      }
      const session = await stripe.checkout.sessions.create(params);
      // res.redirect(303, session.url);
      res.status(200).json(session);
    } catch (err) {
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
  }