const Messages = require("./messages");
const Validator = require("validator");

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

const updateUrl = async (url, table) => {
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
  }

  var duplicate = true;
  while (duplicate) {
    let data = await Table.findOne({ url: url });
    if (data) {
      url = validateUrl(url);
    } else {
      duplicate = false;
      return Promise.resolve(url);
    }
  }
};

module.exports.updateUrl = updateUrl;

/*-------------------------------------------------------------------------------------------------------*/

const fs = require("fs");
const Jimp = require("jimp");
const sharp = require("sharp");
const imgType = ["original", "large", "medium", "thumbnail"]

//const path = require("path");
//const pathToFile = path.dirname(require.main.filename);

const sizes = {
  thumbnail: [150, 150],
  medium: [300, 300],
  large: [1024, 1024],
};

const sharpResize = (path, i, uploadPath, filename) => {
  return new Promise((resolve, reject) => {
    try {
      sharp(path)
        .resize(sizes[i][0], sizes[i][1])
        .toBuffer()
        .then((data) => {
          fs.writeFileSync(`.${uploadPath + i}/${filename}`, data);
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

      let original = uploadPath + "original/" + filename;
      let large = uploadPath + "large/" + filename;
      let medium = uploadPath + "medium/" + filename;
      let thumbnail = uploadPath + "thumbnail/" + filename;
      let path = "." + original;

      if (!fs.existsSync("." + uploadPath + "original/")) {
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
          let awsoriginalpath, awslargepath, awsmediumpath, awsthumbnailpath;
          if (nametype == 'Blog') {
            awsoriginalpath = 'blog/feature/original';
            awslargepath = 'blog/feature/large';
            awsmediumpath = 'blog/feature/medium';
            awsthumbnailpath = 'blog/feature/thumbnail';
          }

          if (nametype == 'Setting') {
            awsoriginalpath = 'setting/original';
            awslargepath = 'setting/large';
            awsmediumpath = 'setting/medium';
            awsthumbnailpath = 'setting/thumbnail';
          }

          if (nametype == 'ProductCategory') {
            awsoriginalpath = 'product/category/original';
            awslargepath = 'product/category/large';
            awsmediumpath = 'product/category/medium';
            awsthumbnailpath = 'product/category/thumbnail';
          }

          if (nametype == 'Brand') {
            awsoriginalpath = 'brand/original';
            awslargepath = 'brand/large';
            awsmediumpath = 'brand/medium';
            awsthumbnailpath = 'brand/thumbnail';
          }


          if (nametype == 'User') {
            awsoriginalpath = 'user/original';
            awslargepath = 'user/large';
            awsmediumpath = 'user/medium';
            awsthumbnailpath = 'user/thumbnail';
          }

          if (nametype == 'productgallery') {
            awsoriginalpath = 'product/gallery/original';
            awslargepath = 'product/gallery/large';
            awsmediumpath = 'product/gallery/medium';
            awsthumbnailpath = 'product/gallery/thumbnail';
          }

          if (nametype == 'productfeature') {
            awsoriginalpath = 'product/feature/original';
            awslargepath = 'product/feature/large';
            awsmediumpath = 'product/feature/medium';
            awsthumbnailpath = 'product/feature/thumbnail';
          }

          if (nametype == 'productvarient') {
            awsoriginalpath = 'product/varient/original';
            awslargepath = 'product/varient/large';
            awsmediumpath = 'product/varient/medium';
            awsthumbnailpath = 'product/varient/thumbnail';
          }

          const awsoriginal = await uploadFile(original, filename, awsoriginalpath);


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

          const awslarge = await uploadFile(large, filename, awslargepath);
          const awsmedium = await uploadFile(medium, filename, awsmediumpath);
          const awsthumbnail = await uploadFile(thumbnail, filename, awsthumbnailpath);
          // delete file once uploaded on AWS
          if(!awsoriginal || awsoriginal) {
            imgType.map(type => {
              let filePath = `.${uploadPath}${type}/${filename}`;
              fs.unlinkSync(filePath);
            })
          }
          return resolve({
            success: true,
            data: {
              original: awsoriginal,
              large: awslarge,
              medium: awsmedium,
              thumbnail: awsthumbnail,
            },
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
  for (let i in imgObject) {
    //console.log('IMAGEOBJECT',imgObject[i]);
    FileDelete(imgObject[i]);
    fs.unlink("./assets/images/" + imgObject[i], function (err) {
      if (err) console.log(err);
    });
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
      if (!args[name] || Validator.isEmpty(args[name])) {
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


const checkRole = (role, roleOptions) => {
  role = role.toUpperCase()
  if(roleOptions.includes(role)) return {role: role, success: true}
  else return {success: false}
}
module.exports.checkRole = checkRole;

const duplicateData = async(args, model, updateId) => {
  let docs = await model.find(args)
  docs = docs.filter(doc=>{
    if(doc._id.toString() !== updateId.toString()) return doc
  })
  if(docs.length > 0) return false
  else return true
}
module.exports.duplicateData = duplicateData

const subTotalDetailsEntry = async(couponCode, couponModel, shippingModel, taxModel) => {
  const subTotalDetails = {}
  // assign shipping_name
  let shipping = await shippingModel.findOne({})
  shipping = shipping.shipping_class.filter(shipClass => {
    if(shipping.global.is_global && shipping.global.shipping_class.toString() === shipClass._id.toString()) return subTotalDetails.shipping_name = shipClass.name
  })
  // assign tax_name
  let tax = await taxModel.findOne({})
  tax = tax.tax_class.filter(taxClass => {
    if(tax.global.is_global && tax.global.tax_class.toString() === taxClass._id.toString()) return subTotalDetails.tax_name = taxClass.name
  })
  // assign coupon_code, amount, type
  const coupon = await couponModel.findOne({code: couponCode})
  if(!coupon) {
    subTotalDetails.coupon_code = "None"
    subTotalDetails.coupon_type = ""
    subTotalDetails.coupon_value = 0
  } else {
    subTotalDetails.coupon_code = couponCode
    subTotalDetails.coupon_type = coupon.discount_type
    subTotalDetails.coupon_value = coupon.discount_value
  } 
  return subTotalDetails
}
module.exports.subTotalDetailsEntry = subTotalDetailsEntry

const subTotalSummaryEntry = async(products, couponCode, couponModel, shippingModel, taxModel) => {
  const subTotalSummary = []
  let orderSubTotal = 0, orderGrandTotal = 0;
  let shippingValue, taxValue, couponValue, couponType;
  // assign shipping_value
  let shipping = await shippingModel.findOne({})
  shipping = shipping.shipping_class.filter(shipClass => {
    if(shipping.global.is_global && shipping.global.shipping_class.toString() === shipClass._id.toString()) return shippingValue = shipClass.amount
  })
  // assign tax_value
  let tax = await taxModel.findOne({})
  tax = tax.tax_class.filter(taxClass => {
    if(tax.global.is_global && tax.global.tax_class.toString() === taxClass._id.toString()) return taxValue = taxClass.percentage
  })
  // assign coupon_code, amount, type
  const coupon = await couponModel.findOne({code: couponCode})
  if(!coupon) {
    couponType = ""
    couponValue = 0
  } else {
    couponType = coupon.discount_type
    couponValue = coupon.discount_value
  } 
  // assign total and subtotal for individual product
  products.map(product=>{
    // console.log(product)
    let subTotalSummaryItem = {}
    let subTotal, taxCalc, shippingCalc, couponCalc;
    subTotalSummaryItem.coupon_type = couponType
    subTotalSummaryItem.coupon_value = couponValue
    subTotalSummaryItem.shipping_value = shippingValue
    subTotalSummaryItem.tax_value = taxValue
    subTotal = product.cost * product.qty
    subTotalSummaryItem.sub_total = subTotal
    // calculate tax
    taxCalc = taxValue !== 0 ? subTotal*taxValue/100 : 0
    // calculate shipping
    shippingCalc = shippingValue !== 0 ? subTotal*shippingValue/100 : 0
    // calculate coupon
    if(!couponType || !couponValue) couponCalc = 0
    else if(couponType === "precantage-discount") couponCalc = couponValue !== 0 ? subTotal*couponValue/100 : 0
    else if(couponType === "amount-discount") couponCalc = couponValue !== 0 ? couponValue : 0
    // add tax add shipping subtract coupon
    subTotalSummaryItem.total = subTotal + taxCalc + shippingCalc - couponCalc
    // add subtotal value for order subtotal
    orderSubTotal += subTotal
    // add grandtotal value for order grandtotal
    orderGrandTotal += subTotalSummaryItem.total
    // push item to orderSummary array
    subTotalSummary.push(subTotalSummaryItem)
  })
  return {
    subTotalSummary,
    orderSubTotal,
    orderGrandTotal
  }
}
module.exports.subTotalSummaryEntry = subTotalSummaryEntry

module.exports.MESSAGE_RESPONSE = MESSAGE_RESPONSE;

