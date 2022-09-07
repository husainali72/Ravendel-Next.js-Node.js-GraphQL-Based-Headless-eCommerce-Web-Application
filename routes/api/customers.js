const express = require("express");
const router = express.Router();

const APP_KEYS = require("../../config/keys");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
//const auth = require("../../middleware/auth");
const auth = require("../../middleware/customerauth");

// custmer model
const Customer = require("../../models/Customer");

const Setting = require("../../models/Setting");

// @route   Post api/posts
// @desc    Registering customer
// @access  public
router.post("/register", (req, res) => {


  if (!req.body.first_name) {
    return res.status(400).json({success: false,message: 'First name field is required.' });
  }
  if (!req.body.last_name) {
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
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        password: req.body.password,
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newCustomer.password, salt, (err, hash) => {
          if (err) throw err;
          newCustomer.password = hash;
          newCustomer
            .save()
            .then((customer) =>
            res.status(200).json({success: true,message: 'Customer registration successfully.',customer })
            )
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
  const email = req.body.email;
  const password = req.body.password;
  const errors = {};
  // Find customer by email
  Customer.findOne({ email }).then((customer) => {
    // Check for customer
    if (!customer) {
      return res.status(404).json({success: false,message: 'Invalid credentials.'});
    }
    // Check Password
    bcrypt.compare(password, customer.password).then((isMatch) => {
      if (isMatch) {
        // customer Matched
        const payload = { id: customer.id, first_name: customer.first_name,last_name: customer.last_name, email: customer.email,role:'customer' }; // Create JWT Payload
        // Sign Token
        jwt.sign(
          payload,
          APP_KEYS.jwtSecret,
          { expiresIn: 36000 },
          (err, token) => {
            res.status(200).json({
              success: true,
              token: token,
              customer,
            });
          }
        );
      } else {
        return res.status(404).json({success: false,message: 'Invalid credentials.'});
      }
    });
  });
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
     const nodemailer = require('nodemailer');
      let transporter = nodemailer.createTransport({
              host: setting.smtp.server,
              port: setting.smtp.port,
              auth: {
                  user: setting.smtp.username,
                  pass: setting.smtp.password
              }
      });

      let customername =  customer.first_name + " " + customer.last_name;

      message = {
        from: "no-reply@mail.com",
        to: req.body.email,
        subject: "Reset Password",
        text: `Hi ${customername} \n 
                    Please click on the following link ${link} to reset your password. \n
                    If you did not request this, please ignore this email and your password will remain unchanged.\n`,
        
    }
    transporter.sendMail(message, function(err, info) {
        if (err) {
          return res.status(400).json({success: false,message: 'Email sending faild.' });
        } else {
          return res.status(200).json({success: true,message: 'Email sent successfully, registered mail id' });
        }

      });
    }
  });
});

// @route   GET api/get
// @desc    reset  password check link valid or not .
// @access  public
router.get("/reset/:custId",  (req, res) => {
  const errors = {};
  Customer.findOne({ _id: req.params.custId })
    .select("-password")
    .then((customer) => {
      if (!customer) {
        errors.noprofile = "There is no Customer";
        return res.status(404).json(errors);
      }
      res.json({
        success: true,
        customer_id: customer.id,
        first_name: customer.first_name,
        last_name: customer.last_name,
        email: customer.email,
      });
    })
    .catch((err) => res.status(404).json(err));
});

// @route   Post api/posts
// @desc    reset password customer create new password
// @access  public
router.post("/resetpassword", (req, res) => {

  if (!req.body.customer_id) {
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
       Customer.findByIdAndUpdate(req.body.customer_id, {
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

  if (!req.body.customer_id) {
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
  const customerid =  req.body.customer_id;
  Customer.findOne({  _id: customerid }).then((customer) => {
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
       Customer.findByIdAndUpdate(req.body.customer_id, {
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
  
  if (!req.body.customer_id) {
    return res.status(400).json({success: false,message: 'Customer Id field is required.' });
  }
  
  const customerid =  req.body.customer_id;
  Customer.findOne({  _id: customerid }).then((customer) => {
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
  if (!req.body.customer_id) {
    return res.status(400).json({success: false,message: 'Customer Id field is required.' });
  }
  if (!req.body.first_name) {
    return res.status(400).json({success: false,message: 'First name field is required.' });
  }
  if (!req.body.last_name) {
    return res.status(400).json({success: false,message: 'Last name field is required.' });
  }
  if (!req.body.company) {
    return res.status(400).json({success: false,message: 'Company field is required.' });
  }
  if (!req.body.phone) {
    return res.status(400).json({success: false,message: 'Phone field is required.' });
  }

  let updatedate = Date.now();
  Customer.findByIdAndUpdate(req.body.customer_id, {
    first_name: req.body.first_name, 
    last_name: req.body.last_name,
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


  if (!req.body.customer_id) {
    return res.status(400).json({success: false,message: 'Customer Id field is required.' });    
  }
  if (!req.body.first_name) {
    return res.status(400).json({success: false,message: 'First name field is required.' });    
  }
  if (!req.body.last_name) {
    return res.status(400).json({success: false,message: 'last name field is required.' });    
  }

  if (!req.body.address_line1) {
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
  const customer = await Customer.findById({ _id: req.body.customer_id });
  if (!customer) {
    return res.status(404).json({success: false,message: 'Customer not found.' });   
  }
 
  if (req.body.default_address) {
    for (let i in customer.address_book) {
      if (customer.address_book[i].default_address) {
        customer.address_book[i].default_address = false;
      }
    }
  }
  const cdata =  {
        first_name: req.body.first_name, 
        last_name: req.body.last_name,
        company: req.body.company,
        phone: req.body.phone,
        address_line1: req.body.address_line1,
        address_line2: req.body.address_line2,
        city: req.body.city,
        country: req.body.country,
        state: req.body.state,
        pincode: req.body.pincode,
        default_address: req.body.default_address
    }

  customer.address_book.push(cdata);
  customer.updated = Date.now();
  await customer.save();
  Customer.findOne({  _id: req.body.customer_id }).then((customer) => {
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
  if (!req.body.customer_id) {
    return res.status(400).json({success: false,message: 'Customer Id field is required.' });    
  }

  if (!req.body._id) {
    return res.status(400).json({success: false,message: 'Address id field is required.' });
  }
  if (!req.body.first_name) {
    return res.status(400).json({success: false,message: 'First nmae field is required.' });
  }
  if (!req.body.last_name) {
    return res.status(400).json({success: false,message: 'Last name field is required.' });
  }
  if (!req.body.address_line1) {
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
  const customer = await Customer.findById({ _id: req.body.customer_id });
  if (!customer) {
    return res.status(404).json({success: false,message: 'Customer not found.' });
  }

  const cdata =  {
        first_name: req.body.first_name, 
        last_name: req.body.last_name,
        company: req.body.company,
        phone: req.body.phone,
        address_line1: req.body.address_line1,
        address_line2: req.body.address_line2,
        city: req.body.city,
        country: req.body.country,
        state: req.body.state,
        pincode: req.body.pincode,
        default_address: req.body.default_address
    }

    customer.address_book = customer.address_book.map(address => {
      if (req.body.default_address) {
        address.default_address = false;
      }

      if (address._id == req.body._id) {
        address = cdata;
      }
      return address;
    });
  customer.updated = Date.now();
  await customer.save();
  Customer.findOne({  _id: req.body.customer_id }).then((customer) => {
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
  if (!req.body.customer_id) {
    return res.status(400).json({success: false,message: 'Customer Id field is required.' });    
  }
  if (!req.body._id) {
    return res.status(400).json({success: false,message: 'Address id field is required.' });
  }

  const customer = await Customer.findById({ _id: req.body.customer_id });
  if (!customer) {
    return res.status(404).json({success: false,message: 'Customer not found.' });
  }

  var customer_address_book = customer.address_book;
  for (let i in customer_address_book) {
    if (customer_address_book[i]._id == req.body._id) {
      customer.address_book = [];
      delete customer_address_book[i];
      customer.address_book = customer_address_book;
      break;
    }
  }
  await customer.save();
  Customer.findOne({  _id: req.body.customer_id }).then((customer) => {
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

  if (!req.body.customer_id) {
    return res.status(400).json("Customer Id field is required");
  }
  if (!req.body.product_id) {
    return res.status(400).json("Product Id field is required");
  }
  if (!req.body.qty) {
    return res.status(400).json("Qty field is required");
  }
  
  const customer = await Customer.findById({ _id: req.body.customer_id });
  if (!customer) {
    return res.status(404).json("Customer Id not found");
  }
  const cdata =  {
        product_id: req.body.product_id, 
        qty: req.body.qty
    }
  var customer_cart = customer.cart.items;
  console.log(customer_cart);

  if(customer_cart.length === 0){
       customer.cart.items.push(cdata);
      await customer.save();
  }else{

    for (let i in customer_cart) {
      if (customer_cart[i].product_id == req.body.product_id) {
        return res.status(400).json("Product already exist in a cart");
      }
      // }else{
      //    customer.cart.items.push(cdata);
      //    await customer.save();
      //    res.json({ success: true,customer  });
      // }
    }

    customer.cart.items.push(cdata);
    await customer.save();   
  }


  Customer.findOne({  _id: req.body.customer_id }).then((customer) => {
    // Check for customer
    res.json({ success: true,customer  });
   });
});


// @route   Post api/posts
// @desc    update product qty in a cart 
// @access  public
router.post("/updatecart", auth, async (req, res) => {

  if (!req.body.customer_id) {
    return res.status(400).json("Customer Id field is required");
  }
  if (!req.body.product_id) {
    return res.status(400).json("Product Id field is required");
  }
  if (!req.body.qty) {
    return res.status(400).json("Qty field is required");
  }
  
  const customer = await Customer.findById({ _id: req.body.customer_id });
  if (!customer) {
    return res.status(404).json("Customer Id not found");
  }
  const cdata =  {
        product_id: req.body.product_id, 
        qty: req.body.qty
    }
  customer.cart.items = customer.cart.items.map(cart => {
      if (cart.product_id == req.body.product_id) {
        cart = cdata;
      }
      return cart;
    });
  
  await customer.save();
  Customer.findOne({  _id: req.body.customer_id }).then((customer) => {
    // Check for customer
    res.json({ success: true,customer  });
   });
});


// @route   Post api/posts
// @desc    delete product in a cart 
// @access  public
router.post("/deleteproductcart", auth, async (req, res) => {

  if (!req.body.customer_id) {
    return res.status(400).json("Customer Id field is required");
  }
  if (!req.body.product_id) {
    return res.status(400).json("Product Id field is required");
  }
  
  
  const customer = await Customer.findById({ _id: req.body.customer_id });
  if (!customer) {
    return res.status(404).json("Customer Id not found");
  }


  var customer_cart = customer.cart.items;
  for (let i in customer_cart) {
    if (customer_cart[i].product_id == req.body.product_id) {
      customer.cart.items = [];
      delete customer_cart[i];
      customer.cart.items = customer_cart;
      break;
    }
  }

  //customer.cart.items = [];
  await customer.save();
  Customer.findOne({  _id: req.body.customer_id }).then((customer) => {
    // Check for customer
    res.json({ success: true,customer  });
   });
});


// @route   Post api/posts
// @desc    get cart product
// @access  public
router.post("/getcart", auth, async (req, res) => {

  if (!req.body.customer_id) {
    return res.status(400).json("Customer Id field is required");
  }
  
  
  
  const customer = await Customer.findById({ _id: req.body.customer_id });
  if (!customer) {
    return res.status(404).json("Customer Id not found");
  }

  Customer.findOne({  _id: req.body.customer_id }).then((customer) => {
    // Check for customer
    res.json({
      success: true,
      customer_id: customer.id,
      cart: customer.cart,
    });
   });
  
});

module.exports = router;