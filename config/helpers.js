const Messages = require("./messages");
const Validator = require("validator");
const moment = require("moment")
const nodemailer = require('nodemailer')
const APP_KEYS = require('../config/keys')
const { readFile } = require('fs').promises

const { uploadFile, FileDelete } = require("../config/aws");

const isEmpty = (value) =>
  value === undefined ||
  value === null ||
  (typeof value === "object" && Object.keys(value).length === 0) ||
  (typeof value === "string" && value.trim().length === 0);

module.exports.isEmpty = isEmpty;
/*-------------------------------------------------------------------------------------------------------*/
const putError = (value) => {
  const error = {};
  error.custom_message = value;
  return error;
};

module.exports.putError = putError;
/*-------------------------------------------------------------------------------------------------------*/
const checkError = (error) => {
  console.log(error.message);
  if (isEmpty(error.custom_message)) {
    error = {};
    error.custom_message = "something went wrong";
  }
  return error;
};

module.exports.checkError = checkError;
/*-------------------------------------------------------------------------------------------------------*/

const { AuthenticationError } = require("apollo-server-express");

const checkToken = (token) => {
  if (token === false) {
    throw new AuthenticationError(
      "Authentication token is invalid, please log in"
    );
  }
  return;
};



module.exports.checkToken = checkToken;
/*-------------------------------------------------------------------------------------------------------*/

const slugify = require("slugify");
const stringTourl = (str) => {
  var brandName = str.replace(/[^a-z0-9\s\-]/gi, "-");
  brandName = slugify(brandName, {
    remove: /[*+~.()'"!:@]/g,
    lower: true,
    strict: true,
  });

  if (isEmpty(brandName) || brandName === "-") {
    /* brandName = Math.floor(Math.random() * 1000 + 1);
    brandName = brandName.toString(); */
    var date = new Date();
    brandName = date.getTime().toString();
  }

  return brandName;
};

module.exports.stringTourl = stringTourl;

const validateUrl = (url) => {
  var validthis = /\-[0-9]$/; //regex for test "-(number 0-9)"
  if (validthis.test(url)) {
    let i = parseInt(url[url.length - 1]) + 1;
    return url.slice(0, url.length - 1) + i;
  } else {
    return url + "-2";
  }
};

module.exports.validateUrl = validateUrl;

const updateUrl = async (url, table, updateId) => {
  var url = stringTourl(url);
  switch (table) {
    case "Product":
      var Table = require("../models/Product");
      break;
    case "ProductCat":
      var Table = require("../models/ProductCat");
      break;
    case "Blog":
      var Table = require("../models/Blog");
      break;
    case "Brand":
      var Table = require("../models/Brand");
      break;
    case "Page":
      var Table = require("../models/Page");
      break;
  }

  let duplicate = await duplicateData({url: url}, Table, updateId ? updateId : null)
  if(duplicate) {
    let i = parseInt(url[url.length - 1]) + 1
    if(isNaN(i)) return url + "-2"
    return url.slice(0, url.length - 1) + i;
  } else return Promise.resolve(url)
};

module.exports.updateUrl = updateUrl;

/*-------------------------------------------------------------------------------------------------------*/

const fs = require("fs");
const Jimp = require("jimp");
const sharp = require("sharp");
const Zipcode = require("../models/Zipcode");
const imgType = ["original", "large", "medium", "thumbnail"]

//const path = require("path");
//const pathToFile = path.dirname(require.main.filename);

const sizes = {
  // thumbnail: [150, 150],
  // medium: [300, 300],
  // large: [1024, 1024],
  original: [768, 768]
};

const sharpResize = (path, i, uploadPath, filename) => {
  return new Promise((resolve, reject) => {
    try {
      sharp(path)
        .resize(sizes[i][0], sizes[i][1])
        .toBuffer()
        .then((data) => {
          // fs.writeFileSync(`.${uploadPath + i}/${filename}`, data);
          fs.writeFileSync(`.${uploadPath}${filename}`, data);
          return resolve(true);
        })
        .catch((err) => {
          console.log(err);
          return resolve(false);
        });
    } catch (error) {
      return resolve(false);
    }
  });
};

const jimpResize = (path, i, uploadPath, filename) => {
  return new Promise((resolve, reject) => {
    try {
      Jimp.read(path, (err, image) => {
        if (err) {
          //throw err;
          console.log("jimp", err);
          return resolve(false);
        }

        image
          .resize(sizes[i][0], sizes[i][1]) // resize
          .quality(70) // set JPEG quality
          .write("." + uploadPath + i + "/" + filename); // save

        return resolve(true);
      });
    } catch (error) {
      return resolve(false);
    }
  });
};

const imageUpload = async (upload, uploadPath, nametype) => {

  return new Promise(async (resolve, reject) => {
    try {
      let { filename, mimetype, encoding, createReadStream } = await upload;

      const extensions = ["gif", "jpeg", "jpg", "png", "webp", "svg"];

      let ext = filename.split(".");
      ext = ext.pop();
      ext = ext.toLowerCase();
      if (!~extensions.indexOf(ext)) {
        return resolve({
          success: false,
          message: "This extension not allowed",
        });
      }

      // console.log(upload);
      let stream = createReadStream();

      filename = slugify(filename, { lower: true, replacement: "-" });
      filename = Date.now() + "-" + filename;

      // let original = uploadPath + "original/" + filename;
      // let large = uploadPath + "large/" + filename;
      // let medium = uploadPath + "medium/" + filename;
      // let thumbnail = uploadPath + "thumbnail/" + filename;
      let path = "." + uploadPath + filename;

      // if (!fs.existsSync("." + uploadPath + "original/")) {
      if (!fs.existsSync("." + uploadPath)) {
        return resolve({
          success: false,
          message: "Path does not exist",
        });
      }

      stream
        .on("error", (error) => {
          console.log(JSON.stringify(error));

          fs.unlink(path, function (err) {
            if (err) console.log(err);
          });
          return resolve({
            success: false,
            message: "This image can't be upload 1",
          });
        })

        .pipe(fs.createWriteStream(path))

        .on("finish", async () => {

          //console.log('nametype',nametype);
          // let awsoriginalpath, awslargepath, awsmediumpath, awsthumbnailpath;
          let awsFilePath
          if (nametype == 'Blog') {
            // awsoriginalpath = 'blog/feature/original';
            // awslargepath = 'blog/feature/large';
            // awsmediumpath = 'blog/feature/medium';
            // awsthumbnailpath = 'blog/feature/thumbnail';
            awsFilePath = 'blog'
          }

          if (nametype == 'Setting') {
            // awsoriginalpath = 'setting/original';
            // awslargepath = 'setting/large';
            // awsmediumpath = 'setting/medium';
            // awsthumbnailpath = 'setting/thumbnail';
            awsFilePath = 'setting'
          }

          if (nametype == 'Product Category') {
            // awsoriginalpath = 'product/category/original';
            // awslargepath = 'product/category/large';
            // awsmediumpath = 'product/category/medium';
            // awsthumbnailpath = 'product/category/thumbnail';
            awsFilePath = 'product/category'
          }

          if (nametype == 'Brand') {
            // awsoriginalpath = 'brand/original';
            // awslargepath = 'brand/large';
            // awsmediumpath = 'brand/medium';
            // awsthumbnailpath = 'brand/thumbnail';
            awsFilePath = 'brand'
          }


          if (nametype == 'User') {
            // awsoriginalpath = 'user/original';
            // awslargepath = 'user/large';
            // awsmediumpath = 'user/medium';
            // awsthumbnailpath = 'user/thumbnail';
            awsFilePath = 'user'
          }

          if (nametype == 'productgallery') {
            // awsoriginalpath = 'product/gallery/original';
            // awslargepath = 'product/gallery/large';
            // awsmediumpath = 'product/gallery/medium';
            // awsthumbnailpath = 'product/gallery/thumbnail';
            awsFilePath = 'product/gallery'
          }

          if (nametype == 'productfeature') {
            // awsoriginalpath = 'product/feature/original';
            // awslargepath = 'product/feature/large';
            // awsmediumpath = 'product/feature/medium';
            // awsthumbnailpath = 'product/feature/thumbnail';
            awsFilePath = 'product/feature'
          }

          if (nametype == 'productvariant') {
            // awsoriginalpath = 'product/varient/original';
            // awslargepath = 'product/varient/large';
            // awsmediumpath = 'product/varient/medium';
            // awsthumbnailpath = 'product/varient/thumbnail';
            awsFilePath = 'product/variant'
          }

          // const awsoriginal = await uploadFile(original, filename, awsoriginalpath);
          const awsFile = await uploadFile(path, filename, awsFilePath);


          for (let i in sizes) {
            if (ext === "svg") {
              fs.copyFileSync(path, `.${uploadPath + i}/${filename}`);
              continue;
            }

            let resized = await sharpResize(path, i, uploadPath, filename);

            if (resized) {

              continue;
            } else {
              //fs.unlinkSync(path);
              fs.unlink(path, function (err) {
                if (err) console.log(err);
              });
              return resolve({
                success: false,
                message: "This image can't be upload 2",
              });
            }
          }

          // const awslarge = await uploadFile(large, filename, awslargepath);
          // const awsmedium = await uploadFile(medium, filename, awsmediumpath);
          // const awsthumbnail = await uploadFile(thumbnail, filename, awsthumbnailpath);
          // delete file if uploaded on AWS and exists in local
          // if(!awsoriginal || awsoriginal) {
          //   imgType.map(type => {
          //     let filePath = `.${uploadPath}${type}/${filename}`;
          //     if(fs.existsSync(filePath)){
          //       fs.unlinkSync(filePath);
          //     }
          //   })
          // }

          if(!awsFile || awsFile) {
            let filePath = `.${uploadPath}${filename}`;
            if(fs.existsSync(filePath)){
              fs.unlinkSync(filePath);
            }
          }
          return resolve({
            success: true,
            // data: {
            //   original: awsoriginal,
            //   large: awslarge,
            //   medium: awsmedium,
            //   thumbnail: awsthumbnail,
            // },
            data: awsFile
          });
        });
    } catch (error) {
      //  console.log(error);
      return resolve({
        success: false,
        message: "This image can't be upload 3",
      });
    }
  });
};

module.exports.imageUpload = imageUpload;
/*-------------------------------------------------------------------------------------------------------*/

const imageUnlink = (imgObject) => {
  // for (let i in imgObject) {
    // console.log(imgObject)
    //console.log('IMAGEOBJECT',imgObject[i]);
    FileDelete(imgObject);
    // fs.unlink("./assets/images/" + imgObject[i], function (err) {
    //   if (err) console.log(err);
    // });
  // }
};

module.exports.imageUnlink = imageUnlink;

function capitalize(str) {
  const lower = str.toLowerCase();
  return str.charAt(0).toUpperCase() + lower.slice(1);
}

const _validate = (names, args) => {
  let errors = "";
  if (names && names.length > 0) {
    names.map((name) => {
      if (!args[name] || Validator.isEmpty(args[name]) || args[name] === null) {
        return (errors = `${capitalize(name)} field is required`)
      }

      if (name === "email" && !Validator.isEmail(args[name])) {
        return (errors = `${capitalize(name)} is invalid`);
      }
    })
  }
  return errors;
};

const _validatenested = (main, names, args) => {
  
  let errors = "";
  if (names && names.length > 0) {
    names.map((name) => {
      if (!args[main]) {
        return (errors = `${capitalize(main)} is required`);
      }
      if (!args[main][name]) {
        return (errors = `${capitalize(name)} is required`);
      }
      let value = args[main][name]
      if (!args[main][name] || Validator.isEmpty(value.toString())) {
        return (errors = `${capitalize(name)} field is required`)
      }

      if (name === "email" && !Validator.isEmail(args[main][name])) {
        return (errors = `${capitalize(name)} is invalid`);
      }
    })
  }
  return errors;
};

module.exports._validate = _validate;
module.exports._validatenested = _validatenested;

/*---------------------------------------------------------------------------------------------------------------*/
const getdate = (format, timezone = "UTC", date) => {
  var d;
  if (isEmpty(date)) {
    d = new Date();
  } else {
    d = new Date(date);
  }

  switch (format) {
    case "1": {
      const dtf = new Intl.DateTimeFormat("en", {
        timeZone: timezone,
        year: "numeric",
        month: "long",
        day: "2-digit",
      });
      const [
        { value: mo },
        ,
        { value: da },
        ,
        { value: ye },
      ] = dtf.formatToParts(d);
      return `${mo} ${da}, ${ye}`;
      break;
    }
    case "2": {
      const dtf = new Intl.DateTimeFormat("en", {
        timeZone: timezone,
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      });
      const [
        { value: mo },
        ,
        { value: da },
        ,
        { value: ye },
      ] = dtf.formatToParts(d);
      return `${ye}-${mo}-${da}`;
      break;
    }
    case "3": {
      const dtf = new Intl.DateTimeFormat("en", {
        timeZone: timezone,
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      });
      const [
        { value: mo },
        ,
        { value: da },
        ,
        { value: ye },
      ] = dtf.formatToParts(d);
      return `${mo}/${da}/${ye}`;
      break;
    }
    case "4": {
      const dtf = new Intl.DateTimeFormat("en", {
        timeZone: timezone,
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      });
      const [
        { value: mo },
        ,
        { value: da },
        ,
        { value: ye },
      ] = dtf.formatToParts(d);
      return `${da}/${mo}/${ye}`;
      break;
    }
  }
};

module.exports.getdate = getdate;

const MESSAGE_RESPONSE = (type, item, success) => {
  return {
    message: Messages[type].replace(":item", item),
    success: success,
  };
};

module.exports.MESSAGE_RESPONSE = MESSAGE_RESPONSE;


const checkRole = (role, roleOptions) => {
  role = role.toUpperCase()
  if(roleOptions.includes(role)) return {role: role, success: true}
  else return {success: false}
}
module.exports.checkRole = checkRole;

const duplicateData = async(args, model, updateId) => {
  let docs
  if(!updateId){
    docs = await model.find(args).collation({locale: "en", strength: 2})
  }else{
    docs = await model.find(args).collation({locale: "en", strength: 2})
    console.log(docs)
    docs = docs.filter(doc=>{
      if(doc._id.toString() !== updateId.toString()) return doc
    })
  }
  if(docs.length) return true
  else return false
}
module.exports.duplicateData = duplicateData

const subTotalDetailsEntry = async(data, couponModel, shippingModel, taxModel) => {
  const subTotalDetails = {}
  // assign shipping_name
  // let shipping = await shippingModel.findOne({})
  // shipping.shippingClass.filter(shipClass => {
  //   if(shipping.global.is_global && shipping.global.shippingClass.toString() === shipClass._id.toString()) subTotalDetails.shipping_name = shipClass.name
  //   else subTotalDetails.shipping_name = "None"
  // })
  // assign tax_name
  // let tax = await taxModel.findOne({})
  // tax.taxClass.filter(taxClass => {
  //   if(tax.global.is_global && tax.global.taxClass.toString() === taxClass._id.toString()) subTotalDetails.tax_name = taxClass.name
  //   else subTotalDetails.tax_name = "None"
  // })
  // assign couponCode, amount, type
  const coupon = await couponModel.findOne({code: {$regex: `${data.couponCode}`, $options: "i"} })
  if(!coupon) {
    subTotalDetails.couponCode = "None"
    subTotalDetails.coupon_type = ""
    subTotalDetails.coupon_value = 0
  } else {
    subTotalDetails.couponCode = coupon.code
    subTotalDetails.coupon_type = coupon.discountType
    subTotalDetails.coupon_value = coupon.discountValue
  } 
  subTotalDetails.shipping_name = "Shipping"
  subTotalDetails.tax_name = "Tax"
  return subTotalDetails
}
module.exports.subTotalDetailsEntry = subTotalDetailsEntry

const subTotalSummaryEntry = async(data, couponModel, shippingModel, taxModel) => {
  const subTotalSummary = {}
  let orderSubTotal = 0, orderGrandTotal = 0;
  let shippingAmount = 0, taxAmount = 0, couponType, couponAmount = Number(data.discountAmount);
  // get shipping class array and tax class array
  let shippingClasses = await shippingModel.findOne()
  shippingClasses = shippingClasses.shippingClass
  let taxClasses = await taxModel.findOne()
  taxClasses = taxClasses.taxClass
  // assign couponType
  const coupon = await couponModel.findOne({code: {$regex: `${data.couponCode}`, $options: "i"} })
  if(!coupon) {
    couponType = ""
  } else {
    couponType = coupon.discountType
  }
  for(let product of data.products){
    // console.log(product)
    let shippingValue, taxValue;
    productTotal = product.cost * product.qty
    for(let shippingClass of shippingClasses){
      shippingClass._id.toString() === product.shippingClass.toString() ?
        shippingValue = shippingClass.amount :
        shippingValue = 0
    }
    for(let taxClass of taxClasses){
      taxClass._id.toString() === product.taxClass.toString() ?
        taxValue = (taxClass.percentage / 100 * productTotal) :
        taxValue = 0
    }
    // console.log(shippingValue, taxValue)
    orderSubTotal += productTotal
    orderGrandTotal += productTotal + shippingValue + taxValue
    
    shippingAmount += shippingValue
    taxAmount += taxValue
    // console.log(shippingAmount, taxAmount, orderSubTotal, orderGrandTotal)
  }
  orderGrandTotal -= couponAmount
  // console.log(orderGrandTotal)
  subTotalSummary.coupon_type = couponType
  subTotalSummary.shipping_value = shippingAmount
  subTotalSummary.tax_value = taxAmount
  subTotalSummary.coupon_value = couponAmount
  subTotalSummary.sub_total = orderSubTotal
  subTotalSummary.total = orderGrandTotal
  return {
    subTotalSummary,
    orderSubTotal,
    orderGrandTotal
  }
}
module.exports.subTotalSummaryEntry = subTotalSummaryEntry

const populateYearMonth = (order, orderYear, orderMonth, paymentSuccessSubTotal, paymentSuccessGrandTotal, year) => {
  let monthObj = {
    month: moment(orderMonth+1, "MM").format("MMM"),
    orders: [order],
    GrossSales: order.subtotal,
    NetSales: order.grandTotal,
    paymentSuccessGrossSales: paymentSuccessSubTotal,
    paymentSuccessNetSales: paymentSuccessGrandTotal
  }
  let yearObj = {
    year: orderYear,
    months: [monthObj],
    GrossSales: order.subtotal,
    NetSales: order.grandTotal,
    paymentSuccessGrossSales: paymentSuccessSubTotal,
    paymentSuccessNetSales: paymentSuccessGrandTotal
  }
  if(year){
    return yearObj
  }else{
    return monthObj
  }
}
module.exports.populateYearMonth = populateYearMonth;

const populateSales = (data, order, paymentSuccessSubTotal, paymentSuccessGrandTotal) => {
  data.GrossSales += order.subtotal
  data.NetSales += order.grandTotal
  data.paymentSuccessGrossSales += paymentSuccessSubTotal
  data.paymentSuccessNetSales += paymentSuccessGrandTotal
}
module.exports.populateSales = populateSales;

const sendEmail = (mailData, from, to, res)  => {
  const transporter = nodemailer.createTransport({
    service: 'smtp@gmail.com',
    port: 465,
    secure: true,
    requireTLS: true,
    auth: {
      user: `${APP_KEYS.smptUser}`,
      pass: `${APP_KEYS.smptPass}`
    }
  })
  const mailOptions = {
    from: `${from}`,
    to: `${to}`,
    subject: mailData.subject,
    html: `${mailData}`
  }
  transporter.sendMail(mailOptions, (err, info)=>{
    if (res) {
      if(err){
        return res.status(400).json({success: false, message: 'Email not sent.' });
      } else {
        return res.status(200).json({success: true, message: 'Email sent successfully.' });
      }
    }
  })
}
module.exports.sendEmail = sendEmail

const generateOrderNumber = async (Order, Setting) => {
  const orderNumbers = []
  const setting = await Setting.findOne({})
  let orderDigits = setting.store.order_options.order_digits
  let prefix = setting.store.order_options.order_prefix
  let code = ""
  // prefix = ""
  // let pipeline = [
  //   {$project: {
  //     orderPrefix: {
  //       $substrBytes: [
  //         "$order_number", 
  //         0, 
  //         {$subtract: [ {$strLenBytes: "$order_number"}, orderDigits ]}
  //       ]
  //     }
  //   }},
  //   {$match: {"orderPrefix": prefix}},
  //   {$project: {orderPrefix: 0}}
  // ] 

  let pipeline = [
    {
      $match: {
        "orderNumber": { $exists: true, $type: "string" } // Filter out missing or non-string values
      }
    },
    {
      $project: {
        orderPrefix: {
          $substrBytes: [
            "$orderNumber",
            0,
            {
              $subtract: [
                { $strLenBytes: "$orderNumber" },
                orderDigits
              ]
            }
          ]
        }
      }
    },
    {
      $match: { "orderPrefix": prefix }
    },
    {
      $project: { orderPrefix: 0 }
    }
  ];

  if(!prefix) pipeline = [{$project: {onlen: {$strLenBytes: "$order_number"}}},
                          {$match: {onlen: orderDigits}}]
  // if orders with specified prefix exists then continue number series
  // else start new series
  const orders = await Order.aggregate(pipeline)
  code = orders.length+1
  code = formatOrderNumber(code, prefix, orderDigits)
  return code
}
const formatOrderNumber = (code, prefix, orderDigits) => {
  code = code.toString()
  while(code.length != orderDigits){
    code = "0" + code 
  }
  code = prefix + code
  return code
}
module.exports.generateOrderNumber = generateOrderNumber

const prodAvgRating = async(productID, reviewModel, productModel) => {
  let avgRating = 0
  const reviews = await reviewModel.find({productId: productID, status: {$ne: "pending"}})
  if(reviews.length >= 5){
    reviews.map(review => {
      avgRating += review.rating
    })
    avgRating /= reviews.length
  }
  const product = await productModel.findById(productID)
  product.rating = avgRating.toFixed(1)
  await product.save()
}
module.exports.prodAvgRating = prodAvgRating

const againCalculateCart = async(coupon, args, productModel, amountDiscount) => {

  let discountAmount = 0;
  let forCouponCartTotal= 0;
let IsApplicableDiscount = false;

  for(let item of args.cartItem){

        let product = await productModel.findById(item.productId)
        if(product){
                      let includeProduct = true
                    let  includeProductTotal;
                      //if coupon category is abilable
                          if(coupon.category){

                            if(product.categoryId && product.categoryId.length){
                              product.categoryId.map(catID => {
                                if(coupon.includeCategories.length){
                                  includeProduct = coupon.includeCategories.includes(catID)
                                 
                                }
                                else if(coupon.excludeCategories.length){
                                  includeProduct = !coupon.excludeCategories.includes(catID) 
                                }
                              })
                            }

                      }

                      //if coupon category is not abilable but product is included in category;

                      else if(coupon.product){
                        if(coupon.includeProducts.length){
                          includeProduct = coupon.includeProducts.includes(product._id.toString()) 
                        }
                        else if(coupon.excludeProducts.length){
                          includeProduct = !coupon.excludeProducts.includes(product._id.toString());
                        }
                      }
                      if(includeProduct)  includeProductTotal = +item.productTotal;                    
                        forCouponCartTotal += includeProductTotal;                      
        } 
  }

          if ((coupon.minimumSpend === 0 || coupon.minimumSpend <= forCouponCartTotal) && (coupon.maximumSpend === 0 || coupon.maximumSpend > forCouponCartTotal)) {
            
            IsApplicableDiscount = true;

          }

              if(IsApplicableDiscount){
                  amountDiscount ?
                  discountAmount += parseFloat(coupon.discountValue) :
                  discountAmount += parseFloat(+forCouponCartTotal/100) * parseFloat(coupon.discountValue)
              }

  return discountAmount;

}
module.exports.againCalculateCart = againCalculateCart

const emptyCart = async(cart) => {
  cart.total = 0
  cart.products = []
  await cart.save();
}
module.exports.emptyCart = emptyCart

const addZipcodes = async(zipcode_file, filepath, modal) => {
  let { filename, mimetype, encoding, createReadStream } = await zipcode_file[0].file
  const stream = createReadStream()
  const path = `.${filepath}/${filename}`
  stream
    .on("error", (error) => {
      console.log(JSON.stringify(error));

      fs.unlink(path, function (err) {
        if (err) console.log(err);
      });
      return resolve({
        success: false,
        message: "This file can't be uploaded",
      });
    })
    .pipe(fs.createWriteStream(path))

  if(fs.existsSync(path)){
    let csvData = await readFile(path, {encoding: 'utf8', flag: 'r'})
    csvData = csvData.split(',')

    for(let zipcode of csvData){
      if(zipcode.length >= 5 || zipcode.length <= 10) {
        const existingZipcode = await modal.findOne({zipcode})
        if(!existingZipcode){
          const newZipcode = new modal({zipcode})
          await newZipcode.save()
        }
      }
    }
    await modal.deleteMany({zipcode: "\r\n"})
  }
}
module.exports.addZipcodes = addZipcodes
