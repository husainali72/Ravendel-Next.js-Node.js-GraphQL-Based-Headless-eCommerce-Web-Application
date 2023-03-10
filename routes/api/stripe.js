const dotenv = require('dotenv')
dotenv.config({path:'./.env'})
const {STRIPE_KEY, BUCKET_BASE_URL, RETURN_URL, CANCEL_URL} = process.env
const Setting = require('../../models/Setting')
const router=require('express').Router()
const _ = require('lodash')
const stripe=require('stripe')(STRIPE_KEY)

router.post('/create-checkout-session', async (req, res) => { 
  let currency = await Setting.findOne({})
  currency = _.get(currency, 'store.currency_options.currency').toUpperCase() || "USD"
  const line_items = req.body.customerCart.map(item=>{
    const itemImage = `${BUCKET_BASE_URL}${item.product_image}`
    return{
      price_data: {
        currency: currency,
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
      success_url: RETURN_URL,
      cancel_url: CANCEL_URL
    });
    res.send({url: session.url})
    // res.redirect(session.url)
});

module.exports=router
