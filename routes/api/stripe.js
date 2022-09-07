require('dotenv').config()
const router=require('express').Router()
const stripe=require('stripe')(process.env.STRIPE_KEY)

router.post('/create-checkout-session', async (req, res) => { 
  const imgUrl=process.env.IMAGE_URL
  const line_items=req.body.customerCart.map(item=>{
    const itemImage=imgUrl+item.feature_image.original
    console.log(typeof itemImage)
    return{
      price_data: {
        currency: 'usd',
        product_data: {
          name: item.name,
          images: [itemImage],
          metadata: {
            id: item._id
          },
        },
        unit_amount: item.pricing.sellprice*100,
      },
      quantity: item.quantity,
    }
  })
    const session = await stripe.checkout.sessions.create({
      line_items,
      mode: 'payment',
      success_url: 'http://localhost:3000/orderstatus/thankyou',
      cancel_url: 'http://localhost:3000/checkout',
    });
    res.send({url: session.url});
});

module.exports=router