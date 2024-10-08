const dotenv = require('dotenv')
dotenv.config({path:'./.env'})
const {PAYPAL_CLIENT, PAYPAL_KEY, RETURN_URL_payPal, CANCEL_URL} = process.env
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
            "payment_method": "paypal"
        },
        "redirect_urls": {
            "return_url": RETURN_URL_payPal,
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
            console.log(error)
            throw error;
        } else {
            payment = payment.links.filter(data => data.rel === "approval_url")[0]
            console.log(payment)
            // res.redirect(payment.href)
            res.send({url: payment.href})
        }
    });
      
});

router.get('/success', async(req, res) => {
    const {PayerID, paymentId} = req.query;
    let currency = await Setting.findOne({})
    currency = _.get(currency, 'store.currency_options.currency').toUpperCase() || "USD"
    const execute_payment_json = {
        "payer_id": PayerID
    };
    paypal.payment.execute(paymentId, execute_payment_json, function (error, payment) {
        if (error) {
            console.log(error.response);
            throw error;
        } else {
            console.log(JSON.stringify(payment));
            let PayerID = payment.id;
            
            res.send({success: true});
        }
    });
});

router.get('/cancel', (req, res) => res.render(CANCEL_URL));


module.exports = router
