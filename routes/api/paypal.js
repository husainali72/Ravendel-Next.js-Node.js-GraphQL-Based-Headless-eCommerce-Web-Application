const dotenv = require('dotenv')
dotenv.config({path:'./.env'})
const {PAYPAL_CLIENT, PAYPAL_KEY, RETURN_URL, CANCEL_URL} = process.env
const Setting = require('../../models/Setting')
const paypal = require('paypal-rest-sdk')
const _ = require('lodash')
const router = require('express').Router()

paypal.configure({
    'mode': 'sandbox',
    'client_id': `${PAYPAL_CLIENT}`,
    'client_secret': `${PAYPAL_KEY}`
})

let total = 0
router.post('/pay', async(req, res) => {
    total = 0
    let currency = await Setting.findOne({})
    currency = _.get(currency, 'store.currency_options.currency').toUpperCase() || "USD"
    const line_items = req.body.customerCart.map(item=>{
        total += (item.productPrice*item.qty)
        return{
            name: item.productTitle,
            price: item.productPrice,
            currency: currency,
            quantity: item.qty,
        }
    })
    const create_payment_json = {
        "intent": "sale",
        "payer": {
            "paymentMethod": "paypal"
        },
        "redirect_urls": {
            "return_url": RETURN_URL,
            "cancel_url": CANCEL_URL
        },
        "transactions": [{
            "item_list": {
                "items": line_items
            },
            "amount": {
                "currency": currency,
                "total": total
            },
            "description": "Thank you for ordering"
        }]
    };
    
    paypal.payment.create(create_payment_json, function (error, payment) {
        if (error) {
            throw error;
        } else {
            payment = payment.links.filter(data => data.rel === "approval_url")[0]
            // console.log(payment)
            // res.redirect(payment.href)
            res.send({url: payment.href})
        }
    });
      
});

router.get('/success', (req, res) => {
    const {payerId, paymentId} = req.query;

    const execute_payment_json = {
        "payer_id": payerId,
        "transactions": [{
            "amount": {
                "currency": currency,
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
            res.send({success: true});
        }
    });
});

router.get('/cancel', (req, res) => res.send('Cancelled'));


module.exports = router
