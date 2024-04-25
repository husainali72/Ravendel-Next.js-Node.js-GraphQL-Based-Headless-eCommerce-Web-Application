const { GraphQLDateTime } = require("graphql-iso-date");

const userResolvers = require("./user");
const pageResolvers = require("./page");
const blogResolvers = require("./blog");
const productResolvers = require("./product");
const groupResolvers = require("./group");
const cartResolvers = require("./cart");
const checkoutResolvers = require("./checkout");
const orderResolvers = require("./order");
const customerResolvers = require("./customer");
const brandResolvers = require("./brand");
const settingResolvers = require("./setting");
const taxResolvers = require("./tax");
const shippingResolvers = require("./shipping");
const couponResolvers = require("./coupon");
const reviewResolvers = require("./review");
const productAttribute = require("./product_attribute");
const zipcodeResolvers = require("./zipcode");
const faqResolvers = require("./faq");
const createWriteStream = require("fs");
// import GraphQLUpload from "graphql-upload/GraphQLUpload.mjs";
const fs = require('fs');
const util = require('util');
const unlink = util.promisify(fs.unlink);

const customScalarResolver = {
  // Date: GraphQLDateTime,
  // Upload: async (parent, args) => {
  //   const { createReadStream, filename } = await args.file;
  //   const stream = createReadStream();
  //   // Save the file to the desired location
  //   // Here, we're saving it to the 'uploads' folder with its original filename
  //   await new Promise((resolve, reject) => {
  //     stream
  //       .pipe(createWriteStream(`./uploads/${filename}`))
  //       .on('finish', resolve)
  //       .on('error', reject);
  //   });
  //   // Return the filename as confirmation
  //   return filename;
  // },
  // Upload: GraphQLUpload,
  Mutation: {
    
    Upload: async (_, { file }) => {
      const { createReadStream, filename, mimetype, encoding } = await file;

      // Create a writable stream to save the file
      const writeStream = fs.createWriteStream(`./uploads/${filename}`);

      // Pipe the file stream to the writable stream
      await new Promise((resolve, reject) => {
        createReadStream()
          .pipe(writeStream)
          .on('finish', resolve)
          .on('error', reject);
      });

      // Return information about the uploaded file
      return { filename, mimetype, encoding };
    },
  },
};

const metaKeyValueArray = {
  metaKeyValueArray: [],
};

const customArray = {
  customArray: [],
};

const customObject = {
  customObject: {},
};
module.exports = [
  customScalarResolver,
  metaKeyValueArray,
  customArray,
  customObject,
  userResolvers,
  pageResolvers,
  blogResolvers,
  productResolvers,
  groupResolvers,
  cartResolvers,
  checkoutResolvers,
  orderResolvers,
  customerResolvers,
  brandResolvers,
  settingResolvers,
  taxResolvers,
  shippingResolvers,
  couponResolvers,
  reviewResolvers,
  productAttribute,
  faqResolvers,
  zipcodeResolvers,
  productAttribute,

];
