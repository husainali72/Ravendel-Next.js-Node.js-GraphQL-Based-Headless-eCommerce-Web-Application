const dotenv = require('dotenv')
dotenv.config({path:'./.env.local'})
const {STRIPE_KEY, BUCKET_BASE_URL} = process.env
const router=require('express').Router()
const stripe=require('stripe')(STRIPE_KEY)

router.post('/create-checkout-session', async (req, res) => { 
  const line_items = req.body.customerCart.map(item=>{
    const itemImage = `${BUCKET_BASE_URL}${item.product_image}`
    return{
      price_data: {
        currency: 'usd',
        product_data: {
          name: item.product_title,
          images: [itemImage],
          metadata: {
            id: item.product_id
          },
        },
        unit_amount: item.product_price*100,
      },
      quantity: item.qty,
    }
  })
    const session = await stripe.checkout.sessions.create({
      line_items,
      mode: 'payment',
      success_url: 'http://localhost:3000/orderstatus/thankyou',
      cancel_url: 'http://localhost:3000/checkout',
    });
    res.send({url: session.url})
    // res.redirect(session.url)
});

module.exports=router
