const Messages = require("./messages");
const Validator = require("validator");
const moment = require("moment");
const nodemailer = require("nodemailer");
const APP_KEYS = require("../config/keys");
const { readFile } = require("fs").promises;
const Setting = require("../models/Setting");
const { uploadFile, FileDelete } = require("../config/aws");
const multer = require('multer');
const { Readable } = require('stream');
const path = require('path');
const Cart = require("../models/Cart");
const Product = require("../models/Product");
const ProductAttributeVariation = require("../models/ProductAttributeVariation");
const Shipping = require("../models/Shipping");
const Tax = require("../models/Tax");
const Coupon = require("../models/Coupon");
const mongoose = require('mongoose');
const Order = require("../models/Order");
const _ = require('lodash');
const {Types: {ObjectId}} = require("mongoose")
const { sendPushNotificationTemplate } = require("./notification");


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

const { GraphQLError  } = require("graphql");

const checkToken = (token) => {
  if (token === false) {
    throw new GraphQLError(
      "Authentication token is invalid, please log in" ,{
        extensions: {
          code:401,
        },
      }
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

  let duplicate = await duplicateData(
    { url: url },
    Table,
    updateId ? updateId : null
  );
  if (duplicate) {
    let i = parseInt(url[url.length - 1]) + 1;
    if (isNaN(i)) return url + "-2";
    return url.slice(0, url.length - 1) + i;
  } else return Promise.resolve(url);
};
module.exports.updateUrl = updateUrl;

const validateAndSetUrl = async (url, modal, entryId) => {
  url = stringTourl(url)
  const urlRegex = new RegExp(url)
  const pipeline = [
    {
      $facet: {
        exactMatch: [
          {
            $group: {
              _id: null,
              urls: {
                $push: {
                  $cond: [
                    { $eq: ["$url", url] },
                    { url: "$url", _id: "$_id" },
                    "$$REMOVE",
                  ],
                },
              },
            },
          },
        ],
        similarMatch: [
          {
            $group: {
              _id: null,
              urls: {
                $push: {
                  $cond: [
                    {
                      $regexMatch: {
                        input: "$url",
                        regex: urlRegex,
                      },
                    },
                    { url: "$url", _id: "$_id" },
                    "$$REMOVE",
                  ],
                },
              },
            },
          },
        ],
      },
    },
    {
      $project: {
        exactMatch: {
          $arrayElemAt: ["$exactMatch.urls", 0]
        },
        similarMatch: {
          $arrayElemAt: ["$similarMatch.urls", 0]
        },
      },
    },
    {
      $unwind: "$similarMatch"
    },
    {
      $sort: {
        "similarMatch.url": -1
      }
    },
    {
      $group: {
        _id: "$_id",
        exactMatch: {
          $first: "$exactMatch"
        },
        similarMatch: {
          $push: "$similarMatch"
        }
      }
    }
  ]

  const existingUrls = await modal.aggregate(pipeline)
  if(existingUrls.length) {
    const {exactMatch, similarMatch} = existingUrls[0]
    
    if(exactMatch.length) {
      if(exactMatch[0]._id.toString() !== entryId) {
        url = similarMatch[0].url.split("-")
        let urlEnd = url.pop()
    
        if(isNaN(urlEnd)) {
          url.push(urlEnd)
          url.push("1")
        } else {
          urlEnd = (Number.parseInt(urlEnd)+1).toString()
          url.push(urlEnd)
        }
    
        url = url.join("-")
      }  
    }
  } 

  return url
}
module.exports.validateAndSetUrl = validateAndSetUrl;

/*----------------------------------------------store image in local storage---------------------------------------------------------*/

const UploadImageLocal = async (image, path, name) => {
  try {
    let filename, createReadStream;
    let isBase64 = false;
    let buffer;

    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    if (typeof image === 'string') {
      if(image.startsWith("assets/images")) {
        return {
          success: true,
          data: image,
        }
      } else if(image.startsWith('data:image')) {
        // Handle Base64 input
        const matches = image.match(/^data:image\/([a-zA-Z]+);base64,(.+)$/);
        if (matches) {
          isBase64 = true;
          buffer = Buffer.from(matches[2], 'base64');
          filename = `.${matches[1]}`;
        } else {
          return Promise.resolve({
            success: false,
            message: "Invalid Base64 string"
          });
        }
      }
    } else {
      // Handle regular file upload
      ({ filename, createReadStream } = await image);
    }

    let stream;
    if (isBase64) {
      stream = new Readable();
      stream.push(buffer);
      stream.push(null);
    } else {
      stream = createReadStream();
    }
    const imagePath = `${path}/${uniqueSuffix + filename}`;
    const fileStream = fs.createWriteStream(imagePath);

    await new Promise((resolve, reject) => {
      stream.pipe(fileStream);
      fileStream.on('finish', resolve);
      fileStream.on('error', reject);
    });

    return { data: imagePath, success: true, message: 'Image uploaded successfully' }; // Image uploaded successfully
  } catch (error) {
    console.error('Error uploading image:', error);
    return { data: '', success: false, message: 'Error uploading image' };; // Error occurred during upload
  }
};

module.exports.UploadImageLocal = UploadImageLocal;

/*-------------------------------------------------------------------------------------------------------*/

const fs = require("fs");
const Jimp = require("jimp");
const sharp = require("sharp");
const Zipcode = require("../models/Zipcode");
const ProductCat = require("../models/ProductCat");
const imgType = ["original", "large", "medium", "thumbnail"];

//const path = require("path");
//const pathToFile = path.dirname(require.main.filename);

const sizes = {
  // thumbnail: [150, 150],
  // medium: [300, 300],
  // large: [1024, 1024],
  original: [768, 768],
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

const imageUpload = async (upload, uploadPath, nametype, imageName) => {
  const setting = await Setting.findOne({});
  if (setting?.imageStorage?.status === 's3') {
    return new Promise(async (resolve, reject) => {
      try {
        let filename, createReadStream;
        let isBase64 = false;
        let buffer;

        if (typeof upload === 'string') {
          if(upload.startsWith("assets/images")) {
            return resolve({
              success: true,
              data: upload,
            })
          } else if(upload.startsWith('data:image')) {
            // Handle Base64 input
            const matches = upload.match(/^data:image\/([a-zA-Z]+);base64,(.+)$/);
            if (matches) {
              isBase64 = true;
              buffer = Buffer.from(matches[2], 'base64');
              filename = `.${matches[1]}`;
            } else {
              return resolve({
                success: false,
                message: "Invalid Base64 string"
              });
            }
          }
        } else {
          // Handle regular file upload
          ({ filename, createReadStream } = await upload);
        }

        filename = `${Date.now()}_${imageName}${filename.substring(filename.lastIndexOf("."))}`

        const extensions = ["gif", "jpeg", "jpg", "png", "webp", "svg"];
        let ext = filename.split(".").pop().toLowerCase();

        if (!~extensions.indexOf(ext)) {
          return resolve({
            success: false,
            message: "This extension not allowed",
          });
        }

        filename = slugify(filename, { lower: true, replacement: "-" });
        let path = "." + uploadPath + filename;

        if (!fs.existsSync("." + uploadPath)) {
          return resolve({
            success: false,
            message: "Path does not exist",
          });
        }

        let stream;
        if (isBase64) {
          stream = new Readable();
          stream.push(buffer);
          stream.push(null);
        } else {
          stream = createReadStream();
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
            let awsFilePath;
            if (nametype == "Blog") {
              awsFilePath = "blog";
            }

            if (nametype == "Setting") {
              awsFilePath = "setting";
            }

            if (nametype == "Product Category") {
              awsFilePath = "product/category";
            }

            if (nametype == "Brand") {
              awsFilePath = "brand";
            }

            if (nametype == "User") {
              awsFilePath = "user";
            }

            if (nametype == "productgallery") {
              awsFilePath = "product/gallery";
            }

            if (nametype == "productfeature") {
              awsFilePath = "product/feature";
            }

            if (nametype == "productvariant") {
              awsFilePath = "product/variant";
            }
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


            if (!awsFile || awsFile) {
              let filePath = `.${uploadPath}${filename}`;
              if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
              }
            }
            return resolve({
              success: true,
              data: awsFile,
            });
          });
      } catch (error) {
        return resolve({
          success: false,
          message: "This image can't be upload 3",
        });
      }
    });
  } else {

    return UploadImageLocal(upload, uploadPath, nametype)
  }
};

module.exports.imageUpload = imageUpload;
/*-------------------------------------------------------------------------------------------------------*/

const imageUnlink = async (imgObject) => {
  const setting = await Setting.findOne({});
  const storageType = setting?.imageStorage?.status

  if (storageType === 's3') {
    FileDelete(imgObject);
  } else {
    if (imgObject) {
      fs.unlink(imgObject, (err) => {
        if (err) {
          console.error('Error deleting image:', err);
        }
      });
    }
  }
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
        return (errors = `${capitalize(name)} field is required`);
      }

      if (name === "email" && !Validator.isEmail(args[name])) {
        return (errors = `${capitalize(name)} is invalid`);
      }
    });
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
      let value = args[main][name];
      if (!args[main][name] || Validator.isEmpty(value.toString())) {
        return (errors = `${capitalize(name)} field is required`);
      }

      if (name === "email" && !Validator.isEmail(args[main][name])) {
        return (errors = `${capitalize(name)} is invalid`);
      }
    });
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
      const [{ value: mo }, , { value: da }, , { value: ye }] =
        dtf.formatToParts(d);
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
      const [{ value: mo }, , { value: da }, , { value: ye }] =
        dtf.formatToParts(d);
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
      const [{ value: mo }, , { value: da }, , { value: ye }] =
        dtf.formatToParts(d);
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
      const [{ value: mo }, , { value: da }, , { value: ye }] =
        dtf.formatToParts(d);
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
  role = role.toUpperCase();
  if (roleOptions.includes(role)) return { role: role, success: true };
  else return { success: false };
};
module.exports.checkRole = checkRole;

const duplicateData = async (args, model, updateId) => {
  let docs;
  if (!updateId) {
    docs = await model.find(args).collation({ locale: "en", strength: 2 });
  } else {
    docs = await model.find(args).collation({ locale: "en", strength: 2 });
    docs = docs.filter((doc) => {
      if (doc._id.toString() !== updateId.toString()) return doc;
    });
  }
  if (docs.length) return true;
  else return false;
};
module.exports.duplicateData = duplicateData;

const subTotalDetailsEntry = async (
  data,
  couponModel,
  shippingModel,
  taxModel
) => {
  const subTotalDetails = {};
  
  const coupon = await couponModel.findOne({
    code: { $regex: `${data.couponCode}`, $options: "i" },
  });
  if (!coupon) {
    subTotalDetails.couponCode = "None";
    subTotalDetails.coupon_type = "";
    subTotalDetails.coupon_value = 0;
  } else {
    subTotalDetails.couponCode = coupon.code;
    subTotalDetails.coupon_type = coupon.discountType;
    subTotalDetails.coupon_value = coupon.discountValue;
  }
  subTotalDetails.shipping_name = "Shipping";
  subTotalDetails.tax_name = "Tax";
  return subTotalDetails;
};
module.exports.subTotalDetailsEntry = subTotalDetailsEntry;

const subTotalSummaryEntry = async (
  data,
  couponModel,
  shippingModel,
  taxModel
) => {
  const subTotalSummary = {};
  let orderSubTotal = 0,
    orderGrandTotal = 0;
  let shippingAmount = 0,
    taxAmount = 0,
    couponType,
    couponAmount = Number(data.discountAmount);
  // get shipping class array and tax class array
  let shippingClasses = await shippingModel.findOne();
  shippingClasses = shippingClasses.shippingClass;
  let taxClasses = await taxModel.findOne();
  taxClasses = taxClasses.taxClass;
  // assign couponType
  const coupon = await couponModel.findOne({
    code: { $regex: `${data.couponCode}`, $options: "i" },
  });
  if (!coupon) {
    couponType = "";
  } else {
    couponType = coupon.discountType;
  }
  for (let product of data.products) {
    let shippingValue, taxValue;
    productTotal = product.cost * product.qty;
    for (let shippingClass of shippingClasses) {
      shippingClass._id.toString() === product.shippingClass.toString()
        ? (shippingValue = shippingClass.amount)
        : (shippingValue = 0);
    }
    for (let taxClass of taxClasses) {
      taxClass._id.toString() === product.taxClass.toString()
        ? (taxValue = (taxClass.percentage / 100) * productTotal)
        : (taxValue = 0);
    }
    orderSubTotal += productTotal;
    orderGrandTotal += productTotal + shippingValue + taxValue;

    shippingAmount += shippingValue;
    taxAmount += taxValue;
  }
  orderGrandTotal -= couponAmount;
  subTotalSummary.coupon_type = couponType;
  subTotalSummary.shipping_value = shippingAmount;
  subTotalSummary.tax_value = taxAmount;
  subTotalSummary.coupon_value = couponAmount;
  subTotalSummary.sub_total = orderSubTotal;
  subTotalSummary.total = orderGrandTotal;
  return {
    subTotalSummary,
    orderSubTotal,
    orderGrandTotal,
  };
};
module.exports.subTotalSummaryEntry = subTotalSummaryEntry;

const populateYearMonth = (
  order,
  orderYear,
  orderMonth,
  paymentSuccessSubTotal,
  paymentSuccessGrandTotal,
  year
) => {
  let monthObj = {
    month: moment(orderMonth + 1, "MM").format("MMM"),
    orders: [order],
    GrossSales: order.totalSummary.cartTotal,
    NetSales: order.totalSummary.grandTotal,
    paymentSuccessGrossSales: paymentSuccessSubTotal,
    paymentSuccessNetSales: paymentSuccessGrandTotal,
  };
  let yearObj = {
    year: orderYear,
    months: [monthObj],
    GrossSales: order.totalSummary.cartTotal,
    NetSales: order.totalSummary.grandTotal,
    paymentSuccessGrossSales: paymentSuccessSubTotal,
    paymentSuccessNetSales: paymentSuccessGrandTotal,
  };
  if (year) {
    return yearObj;
  } else {
    return monthObj;
  }
};
module.exports.populateYearMonth = populateYearMonth;

const populateSales = (
  data,
  order,
  paymentSuccessSubTotal,
  paymentSuccessGrandTotal
) => {
  data.GrossSales += order.totalSummary.cartTotal;
  data.NetSales += order.totalSummary.grandTotal;
  data.paymentSuccessGrossSales += paymentSuccessSubTotal;
  data.paymentSuccessNetSales += paymentSuccessGrandTotal;

};
module.exports.populateSales = populateSales;

const sendEmail = (mailData, from, to, res) => {
  const transporter = nodemailer.createTransport({
    service: "smtp@gmail.com",
    port: 465,
    secure: true,
    requireTLS: true,
    auth: {
      user: `${APP_KEYS.smptUser}`,
      pass: `${APP_KEYS.smptPass}`,
    },
  });
  const mailOptions = {
    from: `${from}`,
    to: `${to}`,
    subject: mailData.subject,
    html: `${mailData}`,
  };
  transporter.sendMail(mailOptions, (err, info) => {
    if (res) {
      if (err) {
        return res
          .status(400)
          .json({ success: false, message: "Email not sent." });
      } else {
        return res
          .status(200)
          .json({ success: true, message: "Email sent successfully." });
      }
    }
  });
};
module.exports.sendEmail = sendEmail;

const generateOrderNumber = async (Order, Setting) => {
  const orderNumbers = [];
  const setting = await Setting.findOne({});
  let orderDigits = setting.store.order_options.order_digits;
  let prefix = setting.store.order_options.order_prefix;
  let code = "";

  let pipeline = [
    {
      $match: {
        orderNumber: { $exists: true, $type: "string" }, // Filter out missing or non-string values
      },
    },
    {
      $project: {
        orderPrefix: {
          $substrBytes: [
            "$orderNumber",
            0,
            {
              $subtract: [{ $strLenBytes: "$orderNumber" }, orderDigits],
            },
          ],
        },
      },
    },
    {
      $match: { orderPrefix: prefix },
    },
    {
      $project: { orderPrefix: 0 },
    },
  ];

  if (!prefix)
    pipeline = [
      { $project: { onlen: { $strLenBytes: "$order_number" } } },
      { $match: { onlen: orderDigits } },
    ];
  // if orders with specified prefix exists then continue number series
  // else start new series
  const orders = await Order.aggregate(pipeline);
  code = orders.length + 1;
  code = formatOrderNumber(code, prefix, orderDigits);
  return code;
};
const formatOrderNumber = (code, prefix, orderDigits) => {
  code = code.toString();
  while (code.length != orderDigits) {
    code = "0" + code;
  }
  code = prefix + code;
  return code;
};
module.exports.generateOrderNumber = generateOrderNumber;

const prodAvgRating = async (productID, reviewModel, productModel) => {
  let avgRating = 0;
  const reviews = await reviewModel.find({
    productId: productID,
    status: { $eq: "approved" },
  });
  
  reviews.map((review) => {
    avgRating += review.rating;
  });
  avgRating /= reviews.length;

  const product = await productModel.findById(productID);
  product.rating = avgRating.toFixed(1);
  await product.save();
};
module.exports.prodAvgRating = prodAvgRating;

// Old code commented by HusainSW dated 01-03-2024
// const againCalculateCart = async (coupon, args, productModel, amountDiscount) => {
//   let discountAmount = 0;
//   let forCouponCartTotal = 0;
//   let IsApplicableDiscount = false;

//   for (let item of args.cartItem) {
//     let product = await productModel.findById(item.productId);
//     if (product) {

//       let includeProduct = false;
//       let excludeProduct = false;
//       let includeProductTotal;

//       //if coupon category is abilable
//       if (coupon.category) {
//         if (product.categoryId && product.categoryId.length) {
//           product.categoryId.map((catID) => {
//             if (coupon.includeCategories.length && coupon.includeCategories.includes(catID)) {
//               includeProduct = coupon.includeCategories.includes(catID);
//             } else if (coupon.excludeCategories.length) {
//               includeProduct = !coupon.excludeCategories.includes(catID);
//               excludeProduct = coupon.excludeCategories.includes(catID);
//             }
//           });
//         }
//       }

//       //if coupon category is not abilable but product is included in category;
//       if (coupon.product && !includeProduct && !excludeProduct) {
//         if (coupon.includeProducts.length) {
//           includeProduct = coupon.includeProducts.includes(
//             product._id.toString()
//           );
//         }
//         if (coupon.excludeProducts.length) {
//           includeProduct = !coupon.excludeProducts.includes(
//             product._id.toString()
//           );
//         }
//       }

//       if (includeProduct && !excludeProduct) {
//         includeProductTotal = 0;
//         includeProductTotal = +item.productTotal;
//         forCouponCartTotal = forCouponCartTotal || 0;
//         forCouponCartTotal += includeProductTotal;
//       }

//     }
//   }


//   if (forCouponCartTotal && forCouponCartTotal != 0) {
//     if (
//       (coupon.minimumSpend === 0 ||
//         coupon.minimumSpend <= forCouponCartTotal) &&
//       (coupon.maximumSpend === 0 || coupon.maximumSpend > forCouponCartTotal)
//     ) {
//       IsApplicableDiscount = true;
//     }
//   }

//   if (IsApplicableDiscount) {
//     amountDiscount
//       ? (discountAmount += parseFloat(coupon.discountValue))
//       : (discountAmount +=
//         parseFloat(+forCouponCartTotal / 100) *
//         parseFloat(coupon.discountValue));
//   }
//   if (discountAmount && (discountAmount <= (forCouponCartTotal || 0))) {
//     return discountAmount;
//   } else if (discountAmount && (discountAmount > (forCouponCartTotal || 0))) {
//     return discountAmount = forCouponCartTotal || 0;
//   }
//   else {
//     return discountAmount = 0
//   }
// };

// New code for calculate coupon on product category basis by HusainSW dated 01-03-2024
const againCalculateCart = async (coupon, cart, productModel, couponCode) => {
  let eligibleProductTotalAmount = 0;

  let couponCard = { couponApplied: false };
  let couponDiscount = 0, isCouponFreeShipping = false;

  for (let item of cart.cartItems) {
    let product = await productModel.findById(item.productId);
    if (product) {

      let includeProduct = false;

      //if coupon category is abilable
      if (coupon.category) {

        if (product.categoryId && product.categoryId.length) {
          product.categoryId.map((catID) => {
            if (coupon.includeCategories.length && coupon.includeCategories.includes(catID)) {
              includeProduct = true;
              eligibleProductTotalAmount += item.total;
            }
          });
        }
      }

      if (includeProduct) {
        eligibleProductTotalAmount += item.total;
      }
    }
  }


  if (eligibleProductTotalAmount && eligibleProductTotalAmount != 0) {
    if (
      (coupon.minimumSpend === 0 ||
        coupon.minimumSpend <= eligibleProductTotalAmount) 
        //&&       (coupon.maximumSpend === 0 || coupon.maximumSpend > forCouponCartTotal)
    ) {

      if(coupon.discountType === 'amount-discount') {
        couponDiscount = parseFloat(coupon.discountValue);
      }
      else if(coupon.discountType === 'precantage-discount') {
        couponDiscount = parseFloat(cartTotal / 100) * parseFloat(coupon.discountValue);
        if(coupon.maximumSpend && coupon.maximumSpend != 0) {
          if (couponDiscount > coupon.maximumSpend) {
            couponDiscount = coupon.maximumSpend;
          }
        }
      }
      else if(coupon.discountType === 'free-shipping') {
        isCouponFreeShipping = true;
        couponDiscount = cart.totalSummary.totalShipping;
        cart.totalSummary.totalShipping = 0;
      }
      couponCard.couponApplied = true;
      couponCard.appliedCouponCode = couponCode;
      couponCard.appliedCouponDiscount = couponDiscount;
      couponCard.isCouponFreeShipping = isCouponFreeShipping;
    }
  }

  return couponCard;
};
module.exports.againCalculateCart = againCalculateCart;

const emptyCart = async (cart) => {
  cart.products = [];
  await cart.save();
};
module.exports.emptyCart = emptyCart;

const addZipcodes = async (zipcode_file, filepath, modal) => {
  try {
    const zipcodeRegex = /^\S{4,}$/;
    let { filename, mimetype, encoding, createReadStream } = await zipcode_file.file;
    const stream = createReadStream();

    const path = `.${filepath}/${filename}`;

    // Remove the existing file if it exists
    if (fs.existsSync(path)) {
      fs.unlinkSync(path);
    }

    await new Promise((resolve, reject) => {
      stream
        .on("error", (error) => {
          console.error(JSON.stringify(error));
          reject({
            success: false,
            message: "This file can't be uploaded",
          });
        })
        .pipe(fs.createWriteStream(path))
        .on("finish", resolve)
        .on("error", reject);
    });

    if (fs.existsSync(path)) {
      let csvData = await readFile(path, { encoding: "utf8", flag: "r" });
      csvData = csvData.split(",");
      const allZipCode = await modal.find({});
      for (let zipcode of csvData) {
        if (zipcodeRegex.test(zipcode)) {
          if (!allZipCode.some(item => item.zipcode === zipcode)) {
            const newZipcode = new modal({ zipcode });
            await newZipcode.save();
          }
        }
      }
      await modal.deleteMany({ zipcode: "\r\n" });
    }

    return {
      success: true,
      message: "File uploaded successfully",
    };
  } catch (error) {
    console.error("Error:", error);
    return {
      success: false,
      message: "An error occurred",
    };
  }
};

module.exports.addZipcodes = addZipcodes;


const addCart = async (userId, cartItems) => {
  const cart = await Cart.findOne({ userId: userId });
  let existingCartProducts = cart && cart.products ? cart.products : [];

  // let carttotal = 0;
  // if local products exists then only run loop for adding products in customer cart
  if (cartItems) {
    for (let localProd of cartItems) {
      let productAttributeValue, product, existingProduct;
      product = await Product.findById({ _id: localProd.productId });
      if(!product) {
        //return MESSAGE_RESPONSE("NOT_EXIST", "Product", false);
        console.log(`Product not exists - productId: ${localProd.productId}, productTitle: ${localProd.productTitle}`);
        continue;

        
      }

      if (localProd.variantId) {
        productAttributeValue = await ProductAttributeVariation.findById(localProd.variantId);
        if(!productAttributeValue) {
          console.log(`Product variant not exists - productId: ${localProd.productId}, variantId: ${localProd.variantId}`);
          continue;
        }
        // check local product id and variant id with customer cart product id
        existingProduct = existingCartProducts.find((prod) =>
          prod.productId.toString() === localProd.productId.toString() &&
          prod.variantId == localProd.variantId.toString());
      }
      else {
        // check local product id with customer cart product id
        existingProduct = existingCartProducts.find((prod) => prod.productId.toString() === localProd.productId.toString());
      }
      
      // console.log(productAttributeValue, 'productAttributeValue');
      // console.log('existingProduct', existingProduct);
      let productId = localProd.productId;
      let qty = localProd.qty;
        
      // if matches then update customer cart product with local product
      if (existingProduct) {
        existingProduct.qty += localProd.qty
      }
      // else add local product to customer cart
      else {
        existingCartProducts.push({
          productId,
          variantId: localProd.variantId?.toString(),
          productTitle: product?.name || localProd?.productTitle,
          productPrice: productAttributeValue?.pricing?.sellprice || product?.pricing?.sellprice || localProd?.productPrice,
          productImage: productAttributeValue?.image || product?.feature_image || localProd?.productImage,
          attributes: localProd?.attributes,
          qty,
        });
      }
    }
  }
  //---------------------------------------------------------------------------------------------------------------

  // if customer cart exists then update
  if (cart) {
    cart.products = existingCartProducts;
    cart.updated = Date.now();
    await cart.save();
  }
  // else create new cart
  else {
    const newCart = new Cart({
      userId: userId,
      products: existingCartProducts
    });
    await newCart.save();
  }
};

module.exports.addCart = addCart;

const calculateCart = async (userId, cartItems) => {
  let cart;
  if(userId) {
    const cart = await Cart.findOne({ userId: new mongoose.Types.ObjectId(userId) });
    if (!cart) {
      //throw putError("Cart not found");
      return { success:false, message:'Cart not found', cartItems:[] };
    }
    cartItems = cart.products;
  }
  else if(!cartItems || !cartItems.length) {
    return { success:false, message:'Cart Items not found', cartItems:[] };
  }

  let responseCartItems = [];

  const shipping = await Shipping.findOne({});
  const tax = await Tax.findOne({});
  // const productAttribute = await ProductAttribute.find({});

  let mrpTotal = 0, discountTotal = 0, cartTotal = 0;
  let totalTax = 0
  let totalShipping = 0
  let grandTotal = 0

  let global_tax = false;
  let globalTaxPercentage;
  if (tax.global.is_global) {
    let taxClassId = tax.global.taxClass;
    let myTaxClass = tax.taxClass.find(taxC => taxC._id.toString() == taxClassId.toString());
    if (myTaxClass) {
      global_tax = true;
      globalTaxPercentage = myTaxClass.percentage;
    }
    // tax.taxClass.forEach((taxObject) => {
    //   if (taxObject._id.toString() == taxClassId.toString()) {
    //     global_tax = true;
    //     taxPercentage = taxObject.percentage
    //   }
    // })
  }

  let global_shipping = false;
  let globalShippingAmount;
  let globalShippingPerOrder = false;

  if (shipping.global.is_global) {
    let shippingClassId = shipping.global.shippingClass;

    let myShipClass = shipping.shippingClass.find(shipC => shipC._id.toString() == shippingClassId.toString());
    if (myShipClass) {
      global_shipping = true;
      globalShippingAmount = myShipClass.amount;
    }

    // shipping.shippingClass.forEach((shippingObject) => {
    //   if (shippingObject._id.toString() == shippingClassId.toString()) {
    //     global_shipping = true;
    //     globalShippingAmount = shippingObject.amount;
    //   }
    // })

    if (shipping.global.is_per_order) {
      globalShippingPerOrder = true
    }
  }

  // console.log('global_tax', global_tax);
  // console.log('global_shipping', global_shipping);

  let taxPercentage;
  let isFirstIteration = true;
  for (const cartProduct of cartItems) {

    let product = {}

    let addvariants = false;
    let attribute = []
    if (cartProduct?.variantId) {
      addvariants = true
      product = await Product.findById(new mongoose.Types.ObjectId(cartProduct.productId));
      attribute = await ProductAttributeVariation.find({
        productId: cartProduct.productId, _id: cartProduct?.variantId, quantity: { $gte: cartProduct.qty }
      });

    } else {
      product = await Product.findOne({ _id: cartProduct.productId, quantity: { $gte: cartProduct.qty } });
    }

    let prod = {
      productId: cartProduct?.productId,
      productTitle: product?.name || cartProduct?.productTitle,
      productImage: product?.feature_image,
      url: product?.url, 
      mrp: product?.pricing?.price,
      productPrice: product?.pricing?.sellprice || product?.pricing?.price || cartProduct?.productPrice,
      qty: cartProduct?.qty,
      //total: (cartProduct?.qty * product?.pricing?.sellprice || product?.pricing?.price || cartProduct?.productPrice),
      attributes: cartProduct?.attributes,
      productQuantity: product?.quantity,
      variantId: cartProduct?.variantId,
      shippingClass: product?.shipping?.shippingClass,
      taxClass: product?.taxClass,
      _id: cartProduct?._id,
      available:(product && ((!addvariants && attribute?.length === 0) || (addvariants && attribute?.length > 0)) ? true : false)
    }
    responseCartItems.push(prod);

    if(prod.available) {
      prod.discountPrice = product?.pricing?.price - prod.productPrice;
      prod.discountPercentage = Math.floor(prod.discountPrice / prod.mrp * 100);
      prod.mrpAmount = prod.mrp * prod.qty;
      prod.discountAmount = (prod.mrp - prod.productPrice) * prod.qty;
      prod.amount = prod.productPrice * prod.qty;

      mrpTotal += prod.mrpAmount;
      discountTotal += prod.discountAmount;
      cartTotal += prod.amount;

      // product tax calculation start
      taxPercentage = globalTaxPercentage;
      if(!global_tax) {
        let productTax;
        if(product.taxClass) {
          productTax = tax.taxClass.find(taxC => taxC._id.toString() == product.taxClass.toString());
        }
        if(productTax) {
          taxPercentage = productTax.percentage;
        }
        else {
          console.log('product tax class not found');
        }
        // console.log('taxPercentage', taxPercentage);
      }

      prod.taxAmount = 0;
      if (taxPercentage && taxPercentage != 0) {
        // console.log('tax.is_inclusive : ', tax.is_inclusive);
        if (!tax.is_inclusive) {
          prod.taxAmount = prod.amount * taxPercentage / 100;
        }
      }
      totalTax += prod.taxAmount;
      // product tax calculation completed
      
      // Product Shipping calculation start
      prod.shippingAmount = 0;
      // if Shipping is global
      if (global_shipping) {
        // console.log('globalShippingPerOrder', globalShippingPerOrder);
        // if Shipping is applied Per Order
        if (globalShippingPerOrder) {
          // Applying/Adding Shipping Amount in total on loop's first iteration
          if(isFirstIteration) {
            totalShipping += globalShippingAmount;
          }
        }
        else {
          prod.shippingAmount = globalShippingAmount;
          totalShipping += prod.shippingAmount;
        }
      }
      // if Shipping is not global means it will be product wise
      else {
        // console.log('product._id', product._id);
        let productShipping;
        if(product.shipping?.shippingClass) {
          productShipping = shipping.shippingClass.find(shipClass => 
            shipClass._id.toString() == product.shipping.shippingClass.toString());
        }
        if(productShipping) {
          prod.shippingAmount = productShipping.amount;
          totalShipping += prod.shippingAmount;
        }
        // else {
        //   console.log('product shipping class not found');
        // }
      }
      // Product Shipping calculation completed

      prod.total = prod.amount + prod.taxAmount + prod.shippingAmount;
      isFirstIteration = false;
    }
  }

  grandTotal = cartTotal + totalTax + totalShipping;
  const totalSummary = {
    mrpTotal : mrpTotal,
    discountTotal : discountTotal,
    cartTotal: cartTotal,
    totalTax: totalTax,
    totalShipping: totalShipping,
    grandTotal: grandTotal
  }

  return {
    success:true, message:'', 
    
    id: cart?._id,
    cartItems:responseCartItems,
    status: cart?.status,
    date: cart?.date,
    updated: cart?.updated,
    totalSummary
  };
}
module.exports.calculateCart = calculateCart;

const calculateCoupon = async(userId, cartItems, couponCode) => {
  // const coupon = await Coupon.findOne({ code: { $regex: `${args.couponCode}`, $options: "i" } });
  const coupon = await Coupon.findOne({ code: couponCode });

  let cart = await calculateCart(userId, cartItems, couponCode);

  let date = getdate('2');
  let success = false, message = "", couponDiscount = 0, isCouponFreeShipping;
  let couponCard = { couponApplied: false };
  if (!coupon) {
    success = false;
    message = 'Invalid coupon code';
  }
  else {
    if (coupon.expire >= date) {
      let cartTotal = 0
      // args.cart.map(item => cartTotal += item.productTotal)     
      cartTotal = cart.totalSummary.cartTotal;

      if (coupon.minimumSpend === 0 || coupon.minimumSpend <= cartTotal) {
        if (!coupon.category) {
          let isDiscountTypeValid = true;
          if(coupon.discountType === 'amount-discount') {
            couponDiscount = parseFloat(coupon.discountValue);
          }
          else if(coupon.discountType === 'percentage-discount') {
            couponDiscount = parseFloat(cartTotal / 100) * parseFloat(coupon.discountValue);
            if(coupon.maximumSpend && coupon.maximumSpend != 0) {
              if (couponDiscount > coupon.maximumSpend) {
                couponDiscount = coupon.maximumSpend;
              }
            }
          }
          else if(coupon.discountType === 'free-shipping') {
            isCouponFreeShipping = true;
            couponDiscount = cart.totalSummary.totalShipping;
            cart.totalSummary.totalShipping = 0;
          }
          else {
            isDiscountTypeValid = false;
            console.log('Invalid discount type');
            success = false;
            message = 'Something wrong with the Coupon code';
          }
          if(isDiscountTypeValid) {
            couponCard.couponApplied = true;
            couponCard.appliedCouponCode = couponCode;
            couponCard.appliedCouponDiscount = couponDiscount;
            couponCard.isCouponFreeShipping = isCouponFreeShipping;
            if(!isCouponFreeShipping) {
              cart.totalSummary.couponDiscountTotal = couponDiscount;
            }
            success = true;
            message = 'Coupon code applied successfully';
          }
        }
        else {
          couponCard = await againCalculateCart(coupon, cart, Product, couponCode);
          if(couponCard.couponApplied) {
            if(!couponCard.isCouponFreeShipping) {
              cart.totalSummary.couponDiscountTotal = couponCard.appliedCouponDiscount;
            }
            success = true;
            message = 'Coupon code applied successfully';
          }
          else {
            success = false;
            message = 'Coupon not applicable on cart';
          }
        }
      }
      else {
        success = false;
        message = 'Coupon not applicable on cart';
      }
    } else {
      success = false;
      message = 'Coupon no longer applicable';
    }
  }
  cart.success = success;
  cart.message = message;
  cart.couponCard = couponCard;
  if(cart.couponCard.couponApplied) {
    cart.totalSummary.grandTotal = cart.totalSummary.grandTotal - cart.couponCard.appliedCouponDiscount;
  }
  return cart;
}
module.exports.calculateCoupon = calculateCoupon;

const addOrder = async(args) => {
  
  let { userId, couponCode } = args;

  let calculatedCart;
  if(couponCode) {
    calculatedCart = await calculateCoupon(userId, null, couponCode);
  }
  else {
    calculatedCart = await calculateCart(userId, null);
  }

  if(!calculatedCart.success) {
    return {
      message: calculatedCart.message,
      success: calculatedCart.success,
    };
  }

  if(!calculatedCart.cartItems.length) {
    return MESSAGE_RESPONSE("NOT_EXIST", "Cart", false);
  }

  var errors = _validate(["userId"], args);
  if (!isEmpty(errors)) {
    return {
      message: errors,
      success: false,
    };
  }
  errors = _validatenested(
    "billing",
    [
      "firstname",
      "lastname",
      "address",
      "city",
      "zip",
      //"email",
      "phone",
      "paymentMethod",
    ], args);
  if (!isEmpty(errors)) {
    return {
      message: errors,
      success: false,
    };
  }

  errors = _validatenested(
    "shipping",
    [
      "firstname",
      "lastname",
      "address",
      "city",
      "zip",
      "country",
      "state",
      //"email",
      "phone",
    ], args);
  if (!isEmpty(errors)) {
    return {
      message: errors,
      success: false,
    };
  }

  const setting = await Setting.findOne({});

  const validPaymentModes = Object.entries(setting.payment)
  .filter(([key, value]) => value.enable)
  .map(([key, value]) => value.title.toLowerCase().replaceAll(" ",""));

  if (!validPaymentModes.includes(args.billing.paymentMethod)) {
    return MESSAGE_RESPONSE("InvalidField", "Payment mode", false); 
  }

  let status = 'pending', redirectUrl, paypalOrderId, razorpayOrderId;
  if(args.billing.paymentMethod !== 'cashondelivery') {
    status = 'processing';
  }
  
  const orderNumber = await generateOrderNumber(Order, Setting)

  let orderProducts = [];
  calculatedCart.cartItems.map(item => {
    if(item.available) {
      let orderProduct = item;
      orderProduct.taxPercentage=0;
      orderProducts.push(orderProduct);
    }
  });

  let orderCouponCard = calculatedCart.couponCard;
  if(!orderCouponCard) {
    orderCouponCard = {
      couponApplied:false
    }
  }
  let currencycode = setting.store.currency_options.currency.toUpperCase();

  calculatedCart.totalSummary.currency_code = currencycode;

  const newOrder = new Order({
    orderNumber: orderNumber,
    userId: args.userId,
    billing: args.billing,
    shipping: args.shipping,
    paymentStatus: status,
    shippingStatus: "inprogress",
    products:orderProducts,
    couponCard:orderCouponCard,
    totalSummary:calculatedCart.totalSummary
  });
  
  const savedOrder = await newOrder.save();

  let environmentBool = process.env.NODE_ENV.trim() === 'production';
  if (args.billing.paymentMethod === 'cashondelivery' || args.billing.paymentMethod === 'banktransfer') {
    const cart = await Cart.findOne({ userId: new mongoose.Types.ObjectId(args.userId) });

    for (let product of cart.products) {
      let updatedProduct = await Product.findByIdAndUpdate(
        product.productId,
        {
          $inc: { quantity: -product.qty },
        },
        { new: true }
      );
      sendLowStockEmailNotification(updatedProduct, setting);
    }

    savedOrder.email = savedOrder.billing.email;
    sendEmailTemplate("ORDER_PLACED", savedOrder, setting);
    let temp = {...savedOrder.toObject(), email: setting.store.inventory.notification_recipients};
    sendEmailTemplate("ADMIN_NEW_ORDER", temp, setting);
    sendPushNotificationTemplate("ADMIN", "NEW_ORDER_PLACED_SELLER", setting, savedOrder._id);
    sendPushNotificationTemplate(savedOrder.userId, "ORDER_PLACED_CUSTOMER", setting, savedOrder._id);
    
    emptyCart(cart);
  } else if(args.billing.paymentMethod === 'stripe') {
    
    const testMode = _.get(setting, 'payment.stripe.test_mode');
    const secretKey = environmentBool ? (testMode ? 'sandbox_secret_key' : 'live_secret_key') : 'sandbox_secret_key';

    let Secret_Key = _.get(setting, `payment.stripe.${secretKey}`);

    if(!Secret_Key) {
      return MESSAGE_RESPONSE("PaymentNotConfigured", "Stripe", false);
    }
    const stripe = require('stripe')(Secret_Key);

    const line_items = calculatedCart.cartItems.map(item=> {
      let itemImage = '';
      if(isUrlValid(`${APP_KEYS.frontendBaseUrl}${item.productImage}`)) {
        itemImage = `${APP_KEYS.frontendBaseUrl}${item.productImage}`;
      }
      else {
        itemImage = `${APP_KEYS.frontendBaseUrl}${APP_KEYS.noImagePlaceHolder}`;
      }
      return{
        price_data: {
          currency: currencycode,
          product_data: {
            name: item.productTitle,
            images: [itemImage],
            metadata: {
              id: item.productId.toString()
            },
          },
          unit_amount: (calculatedCart.totalSummary.grandTotal)*100
        },
        quantity: (1),
      }
    })
    
    let successUrl = `${APP_KEYS.stripeBaseSuccessUrl}?userId=${userId}&orderId=${savedOrder._id}`;
    let cancelUrl = `${APP_KEYS.stripeBaseCancelUrl}?userId=${userId}&orderId=${savedOrder._id}`;
    const session = await stripe.checkout.sessions.create({
      line_items,
      mode: 'payment',
      success_url: successUrl,
      cancel_url: cancelUrl
    });
    // console.log('stripe session', session);
    redirectUrl = session.url;

    //let updateOrderRes = await Order.updateOne({ _id: savedOrder._id}, { $set: { transactionDetail : { sessionId : session.id } }});
    let updateOrderRes = await Order.updateOne({ _id: savedOrder._id}, { $set: { transactionDetail : session } });
    
  } else if(args.billing.paymentMethod === 'paypal') {
    
    const paypal = require('@paypal/checkout-server-sdk');

    const testMode = _.get(setting, 'payment.paypal.test_mode');

    const clientIdKey = environmentBool ? (testMode ? 'sandbox_client_id' : 'live_client_id') : 'sandbox_client_id';
    const secretKey = environmentBool ? (testMode ? 'sandbox_secret_key' : 'live_secret_key') : 'sandbox_secret_key';

    let paypal_client_id = _.get(setting, `payment.paypal.${clientIdKey}`);
    let paypal_client_secret = _.get(setting, `payment.paypal.${secretKey}`);

    // const Environment = process.env.NODE_ENV === 'production' ? paypal.core.LiveEnvironment : paypal.core.SandboxEnvironment
    const Environment = environmentBool ? (testMode ? paypal.core.SandboxEnvironment : paypal.core.LiveEnvironment) : paypal.core.SandboxEnvironment;
    const paypalClient = new paypal.core.PayPalHttpClient(
      new Environment(
        paypal_client_id, paypal_client_secret
      )
    )

    const request = new paypal.orders.OrdersCreateRequest();
    request.prefer('return=representation');
    const paypalItems = calculatedCart.cartItems.map(item=> {
      return{
        // trim name to 120 chars
        name: item.productTitle.length > 120 ? item.productTitle.substring(0, 120) : item.productTitle,
        unit_amount: {
          currency_code: currencycode,
          value: (+item.productPrice)
        },
        quantity: (+item.qty)
      }
    });
    const requestBody = {
      intent:'CAPTURE',
      purchase_units: [
        {
          amount: {
            currency_code: currencycode,
            value: calculatedCart.totalSummary.grandTotal,
            breakdown: {
              item_total: {
                currency_code: currencycode,
                value: calculatedCart.totalSummary.cartTotal
              },
              tax_total: {
                currency_code: currencycode,
                value: calculatedCart.totalSummary.totalTax
              },
              shipping: {
                currency_code: currencycode,
                value: calculatedCart.totalSummary.totalShipping
              },
              discount: {
                currency_code: currencycode,
                value: (!calculatedCart.totalSummary.couponDiscountTotal ? 0 : calculatedCart.totalSummary.couponDiscountTotal)
              }
            }
          },
          items: paypalItems
        }
      ]
    };
    request.requestBody(requestBody);
    const order = await paypalClient.execute(request);
    paypalOrderId = order.result.id;
    
    let updateOrderRes = await Order.updateOne({ _id: savedOrder._id}, { $set: { transactionDetail : order } });
  } else if(args.billing.paymentMethod === 'razorpay') {
  
    const Razorpay = require('razorpay');
    
    const testMode = _.get(setting, 'payment.razorpay.test_mode');

    const clientIdKey = environmentBool ? (testMode ? 'sandbox_client_id' : 'live_client_id') : 'sandbox_client_id';
    const secretKey = environmentBool ? (testMode ? 'sandbox_secret_key' : 'live_secret_key') : 'sandbox_secret_key';

    let razorpay_client_id = _.get(setting, `payment.razorpay.${clientIdKey}`);
    let razorpay_client_secret = _.get(setting, `payment.razorpay.${secretKey}`);

    const razorpayInstance = new Razorpay({
      key_id: razorpay_client_id,
      key_secret: razorpay_client_secret
    });
    let totalAmount = calculatedCart.totalSummary.grandTotal;
    totalAmount = totalAmount * 100;
    const options = {
      amount: parseInt(totalAmount),
      currency: currencycode,
      receipt: savedOrder._id
    }

    const order = await razorpayInstance.orders.create(options)
    razorpayOrderId = order.id;
    
    let updateOrderRes = await Order.updateOne({ _id: savedOrder._id}, { $set: { transactionDetail : order } });
  }

  let addOrderResponse = MESSAGE_RESPONSE("AddSuccess", "Order", true);
  addOrderResponse.redirectUrl = redirectUrl;
  addOrderResponse.paypalOrderId = paypalOrderId;
  addOrderResponse.razorpayOrderId = razorpayOrderId // Afterfrontend
  addOrderResponse.id = savedOrder._id;

  return addOrderResponse;
}
module.exports.addOrder = addOrder;

const isUrlValid = (url) => {
  // Regular expression to match a URL
  let urlPattern = /^(?:(?:https?|ftp):\/\/)?[\w.-]+(?:\.[\w.-]+)+[\w\-._~:/?#[\]@!$&'()*+,;=%]+$/;

  let result = urlPattern.test(url);
  // // Test the URL against the pattern
  return result;
}
module.exports.isUrlValid = isUrlValid;

const updatePaymentStatus = async (userId, args) => {
  try {
    const { id, paymentStatus } = args;
    let eligibleToUpdateSuccess = false;
    let testMode, clientIdKey, secretKey;

    let orderData = await Order.findOne(
      { _id: id }
    );

    orderData.email = orderData.billing.email;

    if (orderData.paymentStatus === "success") {
      return MESSAGE_RESPONSE("UpdateSuccess", "Order Payment Status", true);
    }

    if(!orderData){
      return MESSAGE_RESPONSE("UPDATE_ERROR", "Order Payment Status", false);
    }
    let paymentMethod = orderData.billing.paymentMethod;

    const setting = await Setting.findOne({}, {payment:1, appearance: 1, store: 1, notification: 1});
    let environmentBool = process.env.NODE_ENV.trim() === 'production';
    switch (paymentMethod) {
      case "stripe":

        testMode = _.get(setting, 'payment.stripe.test_mode');
        secretKey = environmentBool ? (testMode ? 'sandbox_secret_key' : 'live_secret_key') : 'sandbox_secret_key';
    
        let Secret_Key = _.get(setting, `payment.stripe.${secretKey}`);
    
        if(!Secret_Key) {
          return MESSAGE_RESPONSE("PaymentNotConfigured", "Stripe", false);
        }

        const stripe = require('stripe')(Secret_Key);

        const session = await stripe.checkout.sessions.retrieve(orderData.transactionDetail.id);

        if(session.payment_status == 'paid') {
          eligibleToUpdateSuccess = true;
        }

        break;
      case "paypal":

        const paypal = require('@paypal/checkout-server-sdk');

        testMode = _.get(setting, 'payment.paypal.test_mode');
        clientIdKey = environmentBool ? (testMode ? 'sandbox_client_id' : 'live_client_id') : 'sandbox_client_id';
        secretKey = environmentBool ? (testMode ? 'sandbox_secret_key' : 'live_secret_key') : 'sandbox_secret_key';

        let paypal_client_id = _.get(setting, `payment.paypal.${clientIdKey}`);
        let paypal_client_secret = _.get(setting, `payment.paypal.${secretKey}`);

        const Environment = environmentBool ? (testMode ? paypal.core.SandboxEnvironment : paypal.core.LiveEnvironment) : paypal.core.SandboxEnvironment;
        // const Environment = paypal.core.LiveEnvironment;
        const paypalClient = new paypal.core.PayPalHttpClient(
          new Environment(
            paypal_client_id, paypal_client_secret
          )
        )
      
        const request = new paypal.orders.OrdersGetRequest(orderData.transactionDetail.result.id);
        const paypalOrder = await paypalClient.execute(request);
  
        if(paypalOrder?.result?.status == 'COMPLETED') {
          eligibleToUpdateSuccess = true;
        }
       
        break;
      case "razorpay":
        let orderId = orderData.transactionDetail.id

        const Razorpay = require('razorpay');
    
        testMode = _.get(setting, 'payment.razorpay.test_mode');
        clientIdKey = testMode ? 'sandbox_client_id' : 'live_client_id';
        secretKey = testMode ? 'sandbox_secret_key' : 'live_secret_key';
    
        let razorpay_client_id = _.get(setting, `payment.razorpay.${clientIdKey}`);
        let razorpay_client_secret = _.get(setting, `payment.razorpay.${secretKey}`);
    
        const razorpayInstance = new Razorpay({
          key_id: razorpay_client_id,
          key_secret: razorpay_client_secret
        });

        let razorpayOrderData = await razorpayInstance.orders.fetch(orderId)

        if(razorpayOrderData.status == "paid"){
          eligibleToUpdateSuccess = true;
        }

        break;
      default:
        return MESSAGE_RESPONSE("UPDATE_ERROR", "Order Payment Status", false);
        break;
    }

    if (!eligibleToUpdateSuccess) {
      sendEmailTemplate("ORDER_FAILED", orderData, setting)
      sendPushNotificationTemplate(orderData.userId, "ORDER_FAILED_CUSTOMER", setting, orderData._id);
      return MESSAGE_RESPONSE("PaymentUnpaid", null, false);
    } else {
      try {
        let orderData = await Order.findById(id);
        if (orderData.paymentStatus != "success") {
          for (let product of orderData.products) {
            let updatedProduct = await Product.findByIdAndUpdate(
              product.productId,
              {
                $inc: { quantity: -product.qty },
              },
              { new: true }
            );
            sendLowStockEmailNotification(updatedProduct, setting);
          }
          orderData.paymentStatus = "success";
          orderData.email = orderData.billing.email;

          orderData = await orderData.save();
          sendEmailTemplate("ORDER_PLACED", orderData, setting)
          let temp = {...orderData.toObject(), email: setting.store.inventory.notification_recipients};
          sendEmailTemplate("ADMIN_NEW_ORDER", temp, setting);
          sendPushNotificationTemplate("ADMIN", "NEW_ORDER_PLACED_SELLER", setting, orderData._id);
          sendPushNotificationTemplate(orderData.userId, "ORDER_PLACED_CUSTOMER", setting, orderData._id);
        }
        const cart = await Cart.findOne({
          userId: new mongoose.Types.ObjectId(userId),
        });
        await emptyCart(cart);
      } catch (error) {
        sendEmailTemplate("ORDER_FAILED", orderData, setting)
        sendPushNotificationTemplate(orderData.userId, "ORDER_FAILED_CUSTOMER", setting, orderData._id);
        return MESSAGE_RESPONSE("UPDATE_ERROR", "Order Payment Status", false);
      }
      return MESSAGE_RESPONSE("UpdateSuccess", "Order Payment Status", true);
    }
  } catch (error) {
    return MESSAGE_RESPONSE("UPDATE_ERROR", "Order Payment Status", false);
  }
  // let { id, paymentStatus } = args;
  
  // // will add some validation to update payment status as success
  // if(paymentStatus == 'success') {
    
  // }
  // //

  // let orderUpdateRes = await Order.updateOne({_id:id }, { $set: { paymentStatus:paymentStatus } });
  // if(orderUpdateRes.acknowledged && orderUpdateRes.matchedCount == 1) {
  //   if(paymentStatus == 'success') {
  //     const cart = await Cart.findOne({ userId:new mongoose.Types.ObjectId(userId) });
  //     await emptyCart(cart);
  //   }
  //   return MESSAGE_RESPONSE("UpdateSuccess", "Order Payment Status", true);
  // }
  // else {
  //   return MESSAGE_RESPONSE("UPDATE_ERROR", "Order Payment Status", false);
  // }
};

const sendMail = async (data) => {
  try {
    // let data = JSON.stringify({
    //   from: `${addedByUsername['username']} from HB WEBSOL <client@hbwebsol.com>`,
    //   to: clientId,
    //   subject: subject,
    //   html: textbody,
    //   replyTo: req.user.email
    // });
    const { createTransport } = require('nodemailer');

    let settings = await Setting.findOne({});

    let user = settings.smtp.username;
    let pass = settings.smtp.password;
    let fromEmail = settings.smtp.from_email || "ravendel@hbwebsol.com";
    let fromName = settings.smtp.from_name || "Ravendel";
    let host = settings.smtp.server;
    let port = settings.smtp.port;

    if (!user || !pass || !host || !port) {
      console.log("SMTP credentials not found", settings._id);
      return;
    }
    
    data.from = `${fromName} <${fromEmail}>`;
    const transporter = createTransport({ 
      host: host, // mail.smtp2go.com
      port: port, // 2525
      auth: {
          user: user,
          pass: pass
      }
    })
    const response = await transporter.sendMail(data);
  } catch(error) {
    console.log("Error in sendMail : ", error.message);
  }
};

const formatPrice = (price, currency_code) => {
  const formattedPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency_code,
    minimumFractionDigits: 2,
  }).format(price);

  return formattedPrice;
};
const fillPlaceholders = async (template, data) => {
  let emailTemplate = { subject: template.subject, body: template.body };
  
  for (const unit of template.placeholders) {
    let placeholderName = unit.name;
    let placeholderValue = unit.value;
    let dataValue = placeholderValue.split('.').reduce((obj, key) => obj[key], data);

    switch (unit.type) {
      case "DATE":
        dataValue = formatDate(dataValue);
        break;
      case "FIRST_CAP":
        if(dataValue == 'cashondelivery'){
          dataValue = 'Cash On Delivery'
        }
        dataValue = dataValue[0].toUpperCase() + dataValue.slice(1);
        break;
      case "MONEY":
        dataValue = formatPrice(dataValue, data.totalSummary.currency_code);
        break;
      case "CONDITIONAL":
        if(dataValue == 0 || dataValue == null || dataValue == undefined){
          dataValue = ""
        }
        else{
          let html = unit.html;
          html = html.replaceAll("{{optional_value}}", formatPrice(dataValue, data.totalSummary.currency_code));
          dataValue = html;
        }
        break;
      case "IMAGE":
        dataValue = `${APP_KEYS.BASE_URL}${dataValue}`
        break;
      default:
        break;
    }

    emailTemplate.subject = emailTemplate.subject.replaceAll(placeholderName, dataValue);
    emailTemplate.body = emailTemplate.body.replaceAll(placeholderName, dataValue);
  }

  return emailTemplate;
};

const fillproductDetails = (looping_text, data, currency, setting) => {

  let output = "";
  for (unit of data.products)
  {
    let html = looping_text
    html = html.replaceAll("{{product_url}}", `${encodeURI(`${APP_KEYS.BASE_URL}${unit.productImage ? unit.productImage : setting.appearance.theme.placeholder_image}`)}`)    
    // html = html.replaceAll("{{product_url}}", `https://picsum.photos/200`)
    html = html.replaceAll("{{product_name}}", unit.productTitle)
    html = html.replaceAll("{{product_quantity}}", unit.qty)
    html = html.replaceAll("{{product_price}}", formatPrice(unit.mrp || unit.productPrice, currency))
    html = html.replaceAll("{{product_total_price}}", formatPrice(unit.mrpAmount || unit.productPrice * unit.qty, currency))
    output = output + html
  }
  return output;
}

const fillSocialIcons = async (icons_html, data) => {
  let output = "";
  for (const unit of data) {
    let html = icons_html
    html = html.replaceAll("{{social_name}}", unit.name)
    html = html.replaceAll("{{social_url}}", unit.handle)
    output = output + html
  }
  return output;
}

const sendEmailTemplate = async (template_name, data, settings) => {
  if(!settings){
    settings = await Setting.findOne({})
  }
  const emailTemplateModel = require("../models/EmailTemplate");
  try {
    let template = await emailTemplateModel.findOne({
      template_name: template_name,
    });

    let emailTemplate = await fillPlaceholders(template, data);

    if (template.looping_text) {
      let loopingProducts = await fillproductDetails(template.looping_text, data, settings.store.currency_options.currency.toUpperCase(), settings);
      emailTemplate.body = emailTemplate.body.replaceAll("{{looping}}", loopingProducts);
    }

    if (template.social_html) {
      let social_icons = await fillSocialIcons(template.social_html, settings.store.store_address.social_media);
      emailTemplate.body = emailTemplate.body.replace("{{social_icons}}", social_icons);
    }
    // console.log("settings.appearance.theme.logo", settings.appearance.theme.logo)
    emailTemplate.body = emailTemplate.body.replaceAll("{{main_logo}}",`${encodeURI(`${APP_KEYS.BASE_URL}${settings.appearance.theme.logo}`)}`);
    emailTemplate.body = emailTemplate.body.replaceAll("{{base_url}}",APP_KEYS.BASE_URL);

    let email_data = {
      from: APP_KEYS.FROM_EMAIL,
      to: data.email,
      subject: emailTemplate.subject,
      html: emailTemplate.body,
    };

    await sendMail(email_data);
  } catch (error) {
    console.log("Error in sendEmailTemplate", error);
  }
};
module.exports.sendEmailTemplate = sendEmailTemplate;

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return date.toLocaleDateString('en-US', options);
};
module.exports.updatePaymentStatus = updatePaymentStatus;

const toObjectID = (entryID) => {
  if(Array.isArray(entryID)) {
    return entryID.map(id => new ObjectId(id))
  }

  return new ObjectId(entryID)
}
module.exports.toObjectID = toObjectID

function getBreadcrumb(data) {
  const breadcrumbs = [];

  function getCategoryDetails(category) {
    const categoryInfo = {
      name: category.name,
      url: category.url
    };
    breadcrumbs.push(categoryInfo);
    
    if (category.children && category.children.length) {
      getCategoryDetails(category.children[0])
    }    
  }
  getCategoryDetails(data[0])

  return breadcrumbs;
}
module.exports.getBreadcrumb = getBreadcrumb

const addCategoryAttributes = async (categoryTree, specifications, modal) => {
  // get parent categories with their children
  // get checked category of the product
  const { parentChildren, checkedCategoryIDs } = getParentChildren(categoryTree, {}, [])

  const checkedCategories = await ProductCat.find({_id: toObjectID(checkedCategoryIDs)}).select("attributes")

  // populate data for product attributes
  // and update checked category attributes accordingly
  for(let cat of checkedCategories) {
    const productAttributes = cat.attributes

    specifications.forEach(spec => {
      if(!isEmpty(spec) && !isEmpty(spec.key) && !isEmpty(spec.value)) {
        let attribute = productAttributes.find(prodAttr => prodAttr.attributeId.toString() === spec.attributeId.toString())
        if(!attribute) {
          attribute = {
            attributeId: spec.attributeId,
            name: spec.key,
            values: [
              {
                attributeValueId: spec.attributeValueId,
                value: spec.value
              }
            ]
          }
          productAttributes.push(attribute)
        } else {
          let attributeValue = attribute.values.find(attrValue => attrValue.attributeValueId.toString() === spec.attributeValueId.toString())
          if(!attributeValue) {
            attributeValue = {
              attributeValueId: spec.attributeValueId,
              value: spec.value
            }
            attribute.values.push(attributeValue)
          }
        }
      }
    })

    const bulkWriteQuery = [
      {
        updateMany: {
          filter: { "_id": {$in: toObjectID(cat._id)} },
          update: {
            $set: {
              attributes: productAttributes
            }
          }
        }
      }
    ]
    await modal.bulkWrite(bulkWriteQuery)
  }

  const parentIDs = Object.keys(parentChildren).reverse()
  for(const parentID of parentIDs) {
    const parentChildrenData = await ProductCat.find({parentId: toObjectID(parentID)}).select("attributes")
    const categoryAttributes = [];
    let attributeCountMap = new Map();
    let totalCategories = parentChildrenData.length;

    // Collecting attributes and their counts
    parentChildrenData.forEach((cat) => {
      cat.attributes.forEach((attribute) => {
        if (!attributeCountMap.has(attribute.attributeId)) {
          attributeCountMap.set(attribute.attributeId, {
            attributeId: attribute.attributeId,
            name: attribute.name,
            values: [],
            count: 0
          });
        }
        let attributeData = attributeCountMap.get(attribute.attributeId);
        attributeData.values.push(...attribute.values);
        attributeData.count++;
      });
    });

    // Filtering attributes present in all objects
    attributeCountMap.forEach((attribute) => {
      if (attribute.count === totalCategories) {
        // Remove duplicates if needed
        const uniqueValues = [...new Map(attribute.values.map(item => [item.attributeValueId, item])).values()];

        categoryAttributes.push({
          attributeId: attribute.attributeId,
          name: attribute.name,
          values: uniqueValues
        });
      }
    });

    await ProductCat.findByIdAndUpdate(parentID, {$set: {attributes: categoryAttributes}})
  }
}
module.exports.addCategoryAttributes = addCategoryAttributes

const getParentChildren = (category, parentChildren, checkedCategoryIDs) => {
  category.forEach(cat => {
    if(cat.checked) {
      checkedCategoryIDs.push(cat.id)
    }
    if(cat.children && cat.children.length) {
      parentChildren[cat.id] = cat.children.map(catChild => catChild.id)

      getParentChildren(cat.children, parentChildren, checkedCategoryIDs)
    }
  });

  return {
    parentChildren,
    checkedCategoryIDs
  }
}

const sendLowStockEmailNotification = async (data, setting) => { 
  try {

    let threshold = setting.store.inventory.low_stock_threshold;
    let alert = setting.store.inventory.notifications.alert_for_minimum_stock;
    
    if(alert && data.quantity <= threshold) {
      data.email = setting.store.inventory.notification_recipients;
      sendEmailTemplate("ADMIN_LOW_STOCK", data, setting)
    }
  } catch (error) {
    console.log(error)
  }
}
module.exports.getParentChildren = getParentChildren

const getRelatedProducts = async (categoryIds, productId, model) => {
  const facetStage = { $facet: {} }
  const addFieldsStage = { $addFields: {} }
  const projectStage = { $project: {} }
  const setStage = { $set: { combinedResults: { $concatArrays: [] } } }

  categoryIds.forEach((categoryId, index) => {
    // populate data in facet stage
    const facetName = `categoryId_${categoryId}`;
    const matchStage = {
      $match: {
        categoryId: categoryId,
        _id: { $ne: toObjectID(productId) }
      }
    };
    const groupStage = {
      $group: {
        _id: null,
        productIds: { $push: "$_id" },
        products: { $push: "$$ROOT" }
      }
    };
    facetStage["$facet"][facetName] = [matchStage, groupStage];

    // populate data in add fields stage
    addFieldsStage["$addFields"][`categoryId_${categoryId}`] = {
      $arrayElemAt: [`$categoryId_${categoryId}`, 0]
    }

    // populate data in project stage
    if (index > 0) {
      const prevFacetNames = categoryIds.slice(0, index).map(id => `categoryId_${id}`);
      const productsFilterCondition = {
        $filter: {
          input: `$${facetName}.products`,
          as: "product",
          cond: {
            $not: {
              $in: ["$$product._id", {
                $reduce: {
                  input: prevFacetNames.map(name => `$${name}.productIds`),
                  initialValue: [],
                  in: { $setUnion: ["$$value", "$$this"] }
                }
              }]
            }
          }
        }
      };
      const productIdsFilterCondition = {
        $filter: {
          input: `$${facetName}.productIds`,
          as: "productId",
          cond: {
            $not: {
              // $in: ["$$product._id", prevFacetNames.map(name => `$${name}.productIds`)]
              $in: ["$$productId", {
                $reduce: {
                  input: prevFacetNames.map(name => `$${name}.productIds`),
                  initialValue: [],
                  in: { $setUnion: ["$$value", "$$this"] }
                }
              }]
            }
          }
        }
      };

      projectStage["$project"][`categoryId_${categoryId}`] = {
        products: productsFilterCondition,
        productIds: productIdsFilterCondition,
      };
    } else {
      projectStage["$project"][`categoryId_${categoryId}`] = {
        products: `$${facetName}.products`,
        productIds: `$${facetName}.productIds`
      };
    }

    // populate data in set stage
    setStage["$set"]["combinedResults"]["$concatArrays"].push(`$${facetName}.products`);
  });

  const pipeline = [
    facetStage,
    addFieldsStage,
    projectStage,
    setStage,
    {
      $project: {
        Related_Products: {
          $slice: [
            {
              $ifNull: ["$combinedResults", []]
            },
            10
          ]
        }
      }
    }
  ]

  const relatedProducts = await model.aggregate(pipeline)
  return relatedProducts[0]
}
module.exports.getRelatedProducts = getRelatedProducts

const getBoughtTogetherProducts = async (productId, model) => {
  const pipeline = [
    {
      $match: { }
    },
    {
      $lookup: {
        from: "orders",
        let: { productId: "$_id" },
        pipeline: [
          {
            $match: {
              $expr: {
                $in: [
                  "$$productId",
                  "$products.productId"
                ]
              }
            }
          },
          {
            $lookup: {
              from: "products",
              localField: "products.productId",
              foreignField: "_id",
              as: "products"
            }
          },
          {
            $project: {
              filteredProducts: {
                $filter: {
                  input: "$products",
                  as: "product",
                  cond: {
                    $ne: [
                      "$$product._id",
                      "$$productId"
                    ]
                  }
                }
              }
            }
          }
        ],
        as: "orders"
      }
    },
    { $unwind: "$orders" },
    { $sort: { "orders.date": -1 } },
    {
      $match: {
        $expr: {
          $gt: [
            { $size: "$orders.filteredProducts" },
            0
          ]
        }
      }
    },
    {
      $group: {
        _id: "$_id",
        allFilteredProducts: {
          $push: "$orders.filteredProducts"
        }
      }
    },
    {
      $set: {
        concatenatedFilteredProducts: {
          $reduce: {
            input: "$allFilteredProducts",
            initialValue: [],
            in: {
              $concatArrays: ["$$value", "$$this"]
            }
          }
        }
      }
    },
    {
      $project: {
        _id: 0,
        Bought_Together_Products: {
          $slice: [
            {
              $setUnion: [
                "$concatenatedFilteredProducts"
              ]
            },
            10
          ]
        }
      }
    }
  ]
  if(Array.isArray(productId)) {
    pipeline[0]["$match"]["_id"] = {$in: toObjectID(productId)}
  } else {
    pipeline[0]["$match"]["_id"] = toObjectID(productId) 
  }
  
  const boughtTogetherProducts = await model.aggregate(pipeline)
  if(Array.isArray(productId)) {
    return {
      Bought_Together_Products: boughtTogetherProducts
      .flatMap(item => item.Bought_Together_Products)
      .filter(item => !productId.includes(item._id.toString()))
      .filter((product, index, self) =>
        index === self.findIndex(p => p._id.toString() === product._id.toString())// Ensure uniqueness
      )
    }
  } else {
    return boughtTogetherProducts[0]
  }
}

// export const currencySetter = (settings, setCurrency) => {
//   const currency = get(settings, "currency", "usd") || settings;
//   const currencySymbols = {
//     usd: "$",
//     eur: "€",
//     gbp: "£",
//     cad: "CA$",
//     inr: "₹",
//   };
//   const selectedSymbol = currencySymbols[currency];
//   if (selectedSymbol) setCurrency(selectedSymbol);
// };

// export const formattedPrice = (value, currencyOptions) => {
//   const decimal = get(currencyOptions, "number_of_decimals", "2");
//   const thousandSeparator = get(currencyOptions, "thousand_separator", ",");
//   const decimalSeparator = get(currencyOptions, "decimal_separator", ".");
//   return value
//     .toFixed(decimal)
//     .replace(/\B(?=(\d{3})+(?!\d))/g, thousandSeparator)

//     .replace(".", decimalSeparator);
// };
// export const getPrice = (price, currencyOptions) => {
//   let fixed = 3;
//   if (typeof price === "string") {
//     return formattedPrice(parseFloat(price), currencyOptions);
//   } else if (typeof price === "number") {
//     return formattedPrice(price, currencyOptions);
//   }

//   return "0.00";
// };

module.exports.getBoughtTogetherProducts = getBoughtTogetherProducts