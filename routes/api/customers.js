const express = require("express");
const router = express.Router();
const nodemailer = require('nodemailer')

const APP_KEYS = require("../../config/keys");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../../middleware/customerauth");

// custmer model
const Customer = require("../../models/Customer");
const Cart = require("../../models/Cart");
const Setting = require("../../models/Setting");
const { sendEmail } = require("../../config/helpers");
const mongoose = require('mongoose');
// @route   Post api/posts
// @desc    Registering customer
// @access  public
router.post("/register", (req, res) => {


  if (!req.body.firstName) {
    return res.status(400).json({success: false,message: 'First name field is required.' });
  }
  if (!req.body.lastName) {
    return res.status(400).json({success: false,message: 'Last name field is required.' });
  }
  if (!req.body.email || !/[\w]+?@[\w]+?\.[a-z]{2,4}/.test(req.body.email)) {
    return res.status(400).json({success: false,message: 'Email field is required and must be valid.' });
  }
  if (!req.body.password) {
    return res.status(400).json({success: false,message: 'Password field is required.' });
  }
  if (req.body.password && req.body.password !== req.body.confirm_password) {
     return res.status(400).json({success: false,message: 'Password and confirm field not match".' });
  }

  Customer.findOne({ email: req.body.email }).then((customer) => {
    if (customer) {
      return res.status(400).json({success: false,message: 'Email already exists.' });
    } else {
      const newCustomer = new Customer({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newCustomer.password, salt, (err, hash) => {
          if (err) throw err;
          newCustomer.password = hash;
          newCustomer
            .save()
            .then((customer) =>{
              res.status(200).json({success: true,message: 'Customer registration successfully.',customer })
              
              // send registration email
              mailData = {
                subject: "Welcome To Ravendel", 
                mailTemplate: "template"
              }
              sendEmail(mailData, APP_KEYS.smptUser, newCustomer.email, res)
            })
            .catch((err) => console.log(err));
        });
      });
    }
  });
});

// @route   GET api/customers/login
// @desc    Login customer / Returning JWT Token
// @access  Public
router.post("/login", (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    // Find customer by email
    const pipeline = [
      {
        $lookup: {
          from: "carts",
          localField: "_id",
          foreignField: "userId",
          as: "cartId",
        },
      },
      { $set: { cartId: { $arrayElemAt: ["$cartId._id", 0] } } },
      { $match: { email: email } },
    ];
    Customer.aggregate(pipeline).then((cust) => {
      let customer = cust[0];
      // Check for customer
      if (!customer) {
        return res.status(404).json({ success: false, message: "Invalid credentials." });
      }

      // Check Password
      bcrypt.compare(password, customer.password).then((isMatch) => {
        if (isMatch) {
          // customer Matched
          const payload = {
            id: customer._id,
            firstName: customer.firstName,
            lastName: customer.lastName,
            email: customer.email,
            role: "customer",
          }; // Create JWT Payload
          const tokenExpiresIn = 36000;
          let expiry = new Date();
          expiry.setSeconds(expiry.getSeconds() + tokenExpiresIn);
          delete customer.addressBook;
          // Sign Token
          jwt.sign(payload, APP_KEYS.jwtSecret, { expiresIn: tokenExpiresIn }, (err, token) => {
            res.status(200).json({
              success: true,
              token: token,
              customer,
              expiry,
            });
          });
        } else {
          return res.status(404).json({ success: false, message: "Invalid credentials." });
        }
      });
    });
  } catch (error) {
    console.log("Error in Login API : ",error.message)
    return res.status(404).json({ success: false, message: error.message });
  }
});



// @route   Post api/posts
// @desc    Forgot password customer
// @access  public
//router.post("/forgotpassword", (req, res) => {
router.post("/forgotpassword", async (req, res) => {

  if (!req.body.email || !/[\w]+?@[\w]+?\.[a-z]{2,4}/.test(req.body.email)) {
    return res.status(400).json({success: false,message: 'Email field is required and must be valid.' });
  }
  
  const setting = await Setting.findOne({});
  Customer.findOne({ email: req.body.email }).then((customer) => {
    if (!customer) {
      return res.status(404).json({success: false,message: 'Email not exists.' });
    } else {
      let link = "http://" + req.headers.host + "/api/customers/reset/" + customer.id;
      // send forgot password link
      mailData = {
        subject: "Forgot Password!", 
        mailTemplate: "template",
        link: link
      }
      sendEmail(mailData, APP_KEYS.smptUser, req.body.email, res)
    }
  });
});

// @route   GET api/get
// @desc    reset  password check link valid or not .
// @access  public
router.get("/reset/:custId",  (req, res) => {
  const errors = {};
  Customer.findOne({ _id:new new mongoose.Types.ObjectId(req.params.custId) })
    .select("-password")
    .then((customer) => {
      if (!customer) {
        errors.noprofile = "There is no Customer";
        return res.status(404).json(errors);
      }
      res.json({
        success: true,
        customerId: customer.id,
        firstName: customer.firstName,
        lastName: customer.lastName,
        email: customer.email,
      });
      // send reset password email
      mailData = {
        subject: "Reset Password!", 
        mailTemplate: "template",
      }
      sendEmail(mailData, APP_KEYS.smptUser, customer.email, res)
    })
    .catch((err) => res.status(404).json(err));
});

// @route   Post api/posts
// @desc    reset password customer create new password
// @access  public
router.post("/resetpassword", (req, res) => {

  if (!req.body.customerId) {
    return res.status(400).json({success: false,message: 'Customer Id field is required.' });
  }

  if (!req.body.password) {
    return res.status(400).json({success: false,message: 'Password field is required.' });
  }

  if (req.body.password && req.body.password !== req.body.confirm_password) {
     return res.status(400).json({success: false,message: 'Password and confirm field not match.' });
  }

  let  newpassword = '';
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(req.body.password, salt, (err, hash) => {
      if (err) throw err;
       newpassword = hash;
       Customer.findByIdAndUpdate(req.body.customerId, {
        password: newpassword
    }, {new: true})
    .then(customer => {
        if(!customer) {
          return res.status(404).json({success: false,message: 'Customer not found.' });
          
        }
        return res.status(200).json({success: true,message: 'New password created successfully.' });

    }).catch(err => {
        if(err.kind === 'ObjectId') {
          return res.status(404).json({success: false,message: 'Customer not found.'});
        }
        return res.status(500).json({success: false,message: 'Error creating customer password.'});
        
    });

        });
  });

});


// @route   Post api/posts
// @desc    change  password 
// @access  public
router.post("/changepassword", auth, async (req, res) => {

  if (req.user.role !=='customer') {
    return res.status(401).json({success: false,message: 'Access Denied.' });
  }

  if (!req.body.customerId) {
    return res.status(400).json({success: false,message: 'Customer Id field is required.' });
  }
  if (!req.body.oldpassword) {
    return res.status(400).json({success: false,message: 'Old password field is required.' });
  }
  if (!req.body.password) {
    return res.status(400).json({success: false,message: 'Password field is required.' });
  }
  if (req.body.password && req.body.password !== req.body.confirm_password) {
     return res.status(400).json({success: false,message: 'Password and confirm field not match.' });
  }
  const customerid =  req.body.customerId;
  Customer.findOne({  _id:new mongoose.Types.ObjectId(customerid) }).then((customer) => {
    // Check for customer
    if (!customer) {
      return res.status(404).json({success: false,message: 'Customer not found.' });
    }
    // Check Password
    bcrypt.compare(req.body.oldpassword, customer.password).then((isMatch) => {
      if (isMatch) {
        let  newpassword = '';
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(req.body.password, salt, (err, hash) => {
      if (err) throw err;
       newpassword = hash;
       Customer.findByIdAndUpdate(req.body.customerId, {
        password: newpassword
    }, {new: true})
    .then(customer => {
        if(!customer) {
          return res.status(404).json({success: false,message: 'Customer not found.' });
        }
        return res.status(200).json({success: true,message: 'Password changed succesfully.' });
        

    }).catch(err => {
        if(err.kind === 'ObjectId') {
          return res.status(404).json({success: false,message: 'Customer not found.' });
                    
        }
        return res.status(500).json({success: false,message: 'Error creating customer password.' });
       
    });


        });
  });
        
      } else {
        return res.status(400).json({success: false,message: 'Wrong old password' });
      }
    });
  });

});

// @route   Post api/posts
// @desc    view profile  
// @access  public
router.post("/viewprofile", auth, async (req, res) => {

  if (req.user.role !=='customer') {
    return res.status(401).json({success: false,message: 'Access Denied.' });
  }
  
  if (!req.body.customerId) {
    return res.status(400).json({success: false,message: 'Customer Id field is required.' });
  }
  
  const customerid =  req.body.customerId;
  Customer.findOne({  _id:new mongoose.Types.ObjectId(customerid)  }).then((customer) => {
    // Check for customer
    if (!customer) {
      return res.status(404).json({success: false,message: 'Customer not found.' });
    }

    let ccompany ='';
    let cphone ='';
    if(customer.company){
       ccompany = customer.company;
    }else{
       ccompany = '';
    }
    if(customer.phone){
       cphone = customer.phone;
    }else{
       cphone = '';
    }

    return res.status(200).json({success: true,customer }); 
  });

});


// @route   Post api/posts
// @desc    update profile 
// @access  public
router.post("/updateprofile", auth, async (req, res) => {

  if (req.user.role !=='customer') {
    return res.status(401).json({success: false,message: 'Access Denied.' });
  }
  if (!req.body.customerId) {
    return res.status(400).json({success: false,message: 'Customer Id field is required.' });
  }
  if (!req.body.firstName) {
    return res.status(400).json({success: false,message: 'First name field is required.' });
  }
  if (!req.body.lastName) {
    return res.status(400).json({success: false,message: 'Last name field is required.' });
  }
  if (!req.body.company) {
    return res.status(400).json({success: false,message: 'Company field is required.' });
  }
  if (!req.body.phone) {
    return res.status(400).json({success: false,message: 'Phone field is required.' });
  }

  let updatedate = Date.now();
  Customer.findByIdAndUpdate(req.body.customerId, {
    firstName: req.body.firstName, 
    lastName: req.body.lastName,
    company: req.body.company,
    phone: req.body.phone, update: updatedate
}, {new: true})
.then(customer => {
    if(!customer) {
      return res.status(404).json({success: false,message: 'Customer not found.' });
    }
    return res.status(200).json({success: true,message: 'Customer updated successfully.',customer });
}).catch(err => {
    if(err.kind === 'ObjectId') {    
      return res.status(404).json({success: false,message: 'Customer not found.' });          
    }
    return res.status(500).json({success: false,message: 'Error updating customer.' });
    
});

});

// @route   Post api/posts
// @desc    add addressbook 
// @access  public
router.post("/addaddressbook", auth, async (req, res) => {

  if (req.user.role !=='customer') {
    return res.status(401).json({success: false,message: 'Access Denied.' });
  }


  if (!req.body.customerId) {
    return res.status(400).json({success: false,message: 'Customer Id field is required.' });    
  }
  if (!req.body.firstName) {
    return res.status(400).json({success: false,message: 'First name field is required.' });    
  }
  if (!req.body.lastName) {
    return res.status(400).json({success: false,message: 'last name field is required.' });    
  }

  if (!req.body.addressLine1) {
    return res.status(400).json({success: false,message: 'Address field is required.' });    
  }

  if (!req.body.city) {
    return res.status(400).json({success: false,message: 'City field is required.' });    
  }
  if (!req.body.country) {
    return res.status(400).json({success: false,message: 'Country field is required.' });    
  }

  if (!req.body.pincode) {
    return res.status(400).json({success: false,message: 'Pincode field is required.' });    
  }

  let updatedate = Date.now();
  const customer = await Customer.findById({ _id: req.body.customerId });
  if (!customer) {
    return res.status(404).json({success: false,message: 'Customer not found.' });   
  }
 
  if (req.body.defaultAddress) {
    for (let i in customer.addressBook) {
      if (customer.addressBook[i].defaultAddress) {
        customer.addressBook[i].defaultAddress = false;
      }
    }
  }
  const cdata =  {
        firstName: req.body.firstName, 
        lastName: req.body.lastName,
        company: req.body.company,
        phone: req.body.phone,
        addressLine1: req.body.addressLine1,
        addressLine2: req.body.addressLine2,
        city: req.body.city,
        country: req.body.country,
        state: req.body.state,
        pincode: req.body.pincode,
        defaultAddress: req.body.defaultAddress
    }

  customer.addressBook.push(cdata);
  customer.updated = Date.now();
  await customer.save();
  Customer.findOne({  _id:new mongoose.Types.ObjectId(req.body.customerId)   }).then((customer) => {
    // Check for customer
    let ccompany ='';
    let cphone ='';
    if(customer.company){
       ccompany = customer.company;
    }else{
       ccompany = '';
    }
    if(customer.phone){
       cphone = customer.phone;
    }else{
       cphone = '';
    }
    return res.status(200).json({success: true,message: 'Address book saved successfully.',customer });
  });
});



// @route   Post api/posts
// @desc    update addressbook 
// @access  public
router.post("/updateaddressbook", auth, async (req, res) => {

  if (req.user.role !=='customer') {
    return res.status(401).json({success: false,message: 'Access Denied.' });
  }
  if (!req.body.customerId) {
    return res.status(400).json({success: false,message: 'Customer Id field is required.' });    
  }

  if (!req.body._id) {
    return res.status(400).json({success: false,message: 'Address id field is required.' });
  }
  if (!req.body.firstName) {
    return res.status(400).json({success: false,message: 'First nmae field is required.' });
  }
  if (!req.body.lastName) {
    return res.status(400).json({success: false,message: 'Last name field is required.' });
  }
  if (!req.body.addressLine1) {
    return res.status(400).json({success: false,message: 'Address1 field is required.' });
  }
  if (!req.body.city) {
    return res.status(400).json({success: false,message: 'City field is required.' });
  }
  if (!req.body.country) {
    return res.status(400).json({success: false,message: 'Country field is required.' });
  }

  if (!req.body.pincode) {
    return res.status(400).json({success: false,message: 'Pincode field is required.' });
  }

  let updatedate = Date.now();
  const customer = await Customer.findById({ _id: req.body.customerId });
  if (!customer) {
    return res.status(404).json({success: false,message: 'Customer not found.' });
  }

  const cdata =  {
        firstName: req.body.firstName, 
        lastName: req.body.lastName,
        company: req.body.company,
        phone: req.body.phone,
        addressLine1: req.body.addressLine1,
        addressLine2: req.body.addressLine2,
        city: req.body.city,
        country: req.body.country,
        state: req.body.state,
        pincode: req.body.pincode,
        defaultAddress: req.body.defaultAddress
    }

    customer.addressBook = customer.addressBook.map(address => {
      if (req.body.defaultAddress) {
        address.defaultAddress = false;
      }

      if (address._id == req.body._id) {
        address = cdata;
      }
      return address;
    });
  customer.updated = Date.now();
  await customer.save();
  Customer.findOne({  _id:new mongoose.Types.ObjectId(req.body.customerId)  }).then((customer) => {
    // Check for customer
    let ccompany ='';
    let cphone ='';
    if(customer.company){
       ccompany = customer.company;
    }else{
       ccompany = '';
    }
    if(customer.phone){
       cphone = customer.phone;
    }else{
       cphone = '';
    }

    return res.status(200).json({success: true,message: 'Address book updated successfully.',customer });
  });
});


// @route   Post api/posts
// @desc    delete addressbook 
// @access  public
router.post("/deleteaddressbook", auth, async (req, res) => {

  if (req.user.role !=='customer') {
    return res.status(401).json({success: false,message: 'Access Denied.' });
  }
  if (!req.body.customerId) {
    return res.status(400).json({success: false,message: 'Customer Id field is required.' });    
  }
  if (!req.body._id) {
    return res.status(400).json({success: false,message: 'Address id field is required.' });
  }

  const customer = await Customer.findById({ _id: req.body.customerId });
  if (!customer) {
    return res.status(404).json({success: false,message: 'Customer not found.' });
  }

  var customer_addressBook = customer.addressBook;
  for (let i in customer_addressBook) {
    if (customer_addressBook[i]._id == req.body._id) {
      customer.addressBook = [];
      delete customer_addressBook[i];
      customer.addressBook = customer_addressBook;
      break;
    }
  }
  await customer.save();
  Customer.findOne({  _id:new mongoose.Types.ObjectId(req.body.customerId)  }).then((customer) => {
    // Check for customer
    let ccompany ='';
    let cphone ='';
    if(customer.company){
       ccompany = customer.company;
    }else{
       ccompany = '';
    }
    if(customer.phone){
       cphone = customer.phone;
    }else{
       cphone = '';
    }
    return res.status(200).json({success: true,message: 'Address book deleted successfully.',customer });
  });
});



// @route   Post api/posts
// @desc    add to cart product 
// @access  public
router.post("/addtocart", auth, async (req, res) => {

  if (!req.body.customerId) {
    return res.status(400).json("Customer Id field is required");
  }
  if (!req.body.productId) {
    return res.status(400).json("Product Id field is required");
  }
  if (!req.body.qty) {
    return res.status(400).json("Qty field is required");
  }
  
  const customer = await Customer.findById({ _id: req.body.customerId });
  if (!customer) {
    return res.status(404).json("Customer Id not found");
  }
  const cdata =  {
        productId: req.body.productId, 
        qty: req.body.qty
    }
  var customer_cart = customer.cart.items;

  if(customer_cart.length === 0){
       customer.cart.items.push(cdata);
      await customer.save();
  }else{

    for (let i in customer_cart) {
      if (customer_cart[i].productId == req.body.productId) {
        return res.status(400).json("Product already exist in a cart");
      }
    }

    customer.cart.items.push(cdata);
    await customer.save();   
  }


  Customer.findOne({  _id: new mongoose.Types.ObjectId(req.body.customerId)  }).then((customer) => {
    // Check for customer
    res.json({ success: true,customer  });
   });
});


// @route   Post api/posts
// @desc    update product qty in a cart 
// @access  public
router.post("/updatecart", auth, async (req, res) => {

  if (!req.body.customerId) {
    return res.status(400).json("Customer Id field is required");
  }
  if (!req.body.productId) {
    return res.status(400).json("Product Id field is required");
  }
  if (!req.body.qty) {
    return res.status(400).json("Qty field is required");
  }
  
  const customer = await Customer.findById({ _id: req.body.customerId });
  if (!customer) {
    return res.status(404).json("Customer Id not found");
  }
  const cdata =  {
        productId: req.body.productId, 
        qty: req.body.qty
    }
  customer.cart.items = customer.cart.items.map(cart => {
      if (cart.productId == req.body.productId) {
        cart = cdata;
      }
      return cart;
    });
  
  await customer.save();
  Customer.findOne({  _id:new mongoose.Types.ObjectId(req.body.customerId)  }).then((customer) => {
    // Check for customer
    res.json({ success: true,customer  });
   });
});


// @route   Post api/posts
// @desc    delete product in a cart 
// @access  public
router.post("/deleteproductcart", auth, async (req, res) => {

  if (!req.body.customerId) {
    return res.status(400).json("Customer Id field is required");
  }
  if (!req.body.productId) {
    return res.status(400).json("Product Id field is required");
  }
  
  
  const customer = await Customer.findById({ _id: req.body.customerId });
  if (!customer) {
    return res.status(404).json("Customer Id not found");
  }


  var customer_cart = customer.cart.items;
  for (let i in customer_cart) {
    if (customer_cart[i].productId == req.body.productId) {
      customer.cart.items = [];
      delete customer_cart[i];
      customer.cart.items = customer_cart;
      break;
    }
  }

  //customer.cart.items = [];
  await customer.save();
  Customer.findOne({  _id:new mongoose.Types.ObjectId(req.body.customerId)  }).then((customer) => {
    // Check for customer
    res.json({ success: true,customer  });
   });
});


// @route   Post api/posts
// @desc    get cart product
// @access  public
router.post("/getcart", auth, async (req, res) => {

  if (!req.body.customerId) {
    return res.status(400).json("Customer Id field is required");
  }
  
  
  
  const customer = await Customer.findById({ _id: req.body.customerId });
  if (!customer) {
    return res.status(404).json("Customer Id not found");
  }

  Customer.findOne({  _id:new mongoose.Types.ObjectId(req.body.customerId)  }).then((customer) => {
    // Check for customer
    res.json({
      success: true,
      customerId: customer.id,
      cart: customer.cart,
    });
   });
  
});

// @route   GET api/customers/remindCart
// @desc    send email regarding cart
// @access  Public
router.post('/remindCart/:custId', auth, async(req, res) => {
  try {
    if(!mongoose.Types.ObjectId.isValid(req.params.custId) || !req.params.custId)
      return res.status(400).json({message: "Something is missing", succes: false})
    
    const existingCustomer = await Customer.findById(req.params.custId)
    const customerCart = await Cart.findOne({ userId:new mongoose.Types.ObjectId( req.params.custId ) })
    const mailData ={
      subject: "Checkout Cart",
      mailTemplate: "template",
      cart: customerCart
    }
    sendEmail(mailData, APP_KEYS.smptUser, existingCustomer.email, res)
  } catch (err) {
    res.status(500).json({message: "Server Error", succes: false})
  }
})

module.exports = router;