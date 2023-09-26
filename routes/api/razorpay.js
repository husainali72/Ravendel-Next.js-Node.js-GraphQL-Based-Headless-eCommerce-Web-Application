const router = require("express").Router();
const Razorpay = require('razorpay');
require("dotenv").config();
const { razorpay_key, razorpay_key_secret } = process.env;

const razorpayInstance = new Razorpay({
    key_id: razorpay_key,
    key_secret: razorpay_key_secret
});



router.post('/order', async(req, res) => {

    try {
        const amount = req.body.grandTotal*100
        const options = {
            amount: amount,
            currency: req.body.currency,
            receipt: 'Receipt no. 1'
        }

        razorpayInstance.orders.create(options,
            (err, order)=>{
                if(!err){
                    res.status(200).send({
                        success:true,
                        msg:'Order Created',
                        orderId:order.id,
                        amount:amount,
                        keyId:razorpay_key,
                        productName:req.body.name,
                        contact:req.body.contact,
                        name: req.body.name,
                        email: req.body.email                 
                    });
                }
                else{
                    res.status(400).send({success:false,msg:'Something went wrong!'});
                }
            }
        );

    } catch (error) {
        console.log(error.message);
    }
}
);



router.post("/verify",(req, res)=>{

    let body=req.body.response.razorpay_order_id + "|" + req.body.response.razorpay_payment_id;    
    
    var expectedSignature = crypto.createHmac('sha256', razorpay_key_secret)
    .update(body.toString())
    .digest('hex'); 

    console.log("sig received",req.body.response.razorpay_signature);    
    console.log("sig generated",expectedSignature);
    
    var response = {"signatureIsValid":"false"}
    
    if (expectedSignature==req.body.response.razorpay_signature)
    
    {response={"signatureIsValid":"true"}}
    //i have to save in Db then send
    res.send(response);
})

module.exports = router;