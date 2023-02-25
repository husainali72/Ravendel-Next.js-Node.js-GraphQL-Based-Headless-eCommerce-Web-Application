const dotenv = require('dotenv')
dotenv.config({path:'./.env.local'})
const {PAYPAL_CLIENT, PAYPAL_KEY} = process.env
const paypal = require('paypal-rest-sdk')
const router = require('express').Router()

paypal.configure({
    'mode': 'sandbox',
    'client_id': `${PAYPAL_CLIENT}`,
    'client_secret': `${PAYPAL_KEY}`
})

let total = 0
router.post('/pay', (req, res) => {
    total = 0
    const line_items = req.body.customerCart.map(item=>{
        total += (item.product_price*item.qty)
        return{
            name: item.product_title,
            price: item.product_price,
            currency: 'USD',
            quantity: item.qty,
        }
    })
    const create_payment_json = {
        "intent": "sale",
        "payer": {
            "payment_method": "paypal"
        },
        "redirect_urls": {
            "return_url": "http://localhost:3000/orderstatus/thankyou",
            "cancel_url": "http://localhost:3000/checkout"
        },
        "transactions": [{
            "item_list": {
                "items": line_items
            },
            "amount": {
                "currency": "USD",
                "total": total
            },
            "description": "Hat for the best team ever"
        }]
    };
    
    paypal.payment.create(create_payment_json, function (error, payment) {
        if (error) {
            throw error;
        } else {
            // console.log(payment)
            payment = payment.links.filter(data => data.rel === "approval_url")[0]
            // console.log(payment)
            // res.redirect(payment.href)
            res.send({url: payment.href})
        }
    });
      
});

router.get('/success', (req, res) => {
    const payerId = req.query.PayerID;
    const paymentId = req.query.paymentId;

    const execute_payment_json = {
        "payer_id": payerId,
        "transactions": [{
            "amount": {
                "currency": "USD",
                "total": total
            }
        }]
    };

    paypal.payment.execute(paymentId, execute_payment_json, function (error, payment) {
        if (error) {
            // console.log(error.response);
            throw error;
        } else {
            // console.log(JSON.stringify(payment));
            res.send('Success');
        }
    });
});

router.get('/cancel', (req, res) => res.send('Cancelled'));


module.exports = router
