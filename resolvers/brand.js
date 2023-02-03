const Brand = require("../models/Brand");
const Product = require("../models/Product");
const {
  isEmpty,
  updateUrl,
  MESSAGE_RESPONSE,
  _validate,
  imageUpload,
  imageUnlink,
  putError,
  duplicateData
} = require("../config/helpers");
const {
  DELETE_FUNC,
  GET_BY_PAGINATIONS,
  GET_SINGLE_FUNC,
  GET_ALL_FUNC,
} = require("../config/api_functions");

const {checkAwsFolder} = require("../config/aws");
const fs = require("fs");
var sdir = './assets/images/brand';
var ldir = './assets/images/brand/large';
var mdir = './assets/images/brand/medium';
var tdir = './assets/images/brand/thumbnail';
var odir = './assets/images/brand/original';

if (!fs.existsSync(sdir)){
  fs.mkdirSync(sdir);
}
if (!fs.existsSync(ldir)){
  fs.mkdirSync(ldir);
}
if (!fs.existsSync(mdir)){
  fs.mkdirSync(mdir);
}
if (!fs.existsSync(odir)){
  fs.mkdirSync(odir);
}
if (!fs.existsSync(tdir)){
  fs.mkdirSync(tdir);
}

module.exports = {
  Query: {
    brands: async (root, args) => {
      return await GET_ALL_FUNC(Brand, "Brands");
    },
    brands_pagination: async (
      root,
      { limit, pageNumber, search, orderBy, order }
    ) => {
      let searchInFields = { name: { $regex: search, $options: "i" } };
      return await GET_BY_PAGINATIONS(
        limit,
        pageNumber,
        orderBy,
        order,
        searchInFields,
        Brand,
        "Brands"
      );
    },
    brand: async (root, args) => {
      return await GET_SINGLE_FUNC(args.id, Brand, "Brand");
    },
  },
  Mutation: {
    addBrand: async (root, args, { id }) => {
      await checkAwsFolder('brand');
      if (!id) {
        return MESSAGE_RESPONSE("TOKEN_REQ", "brand", false);
      }
      try {
        if (args.brands && !args.brands.length) {
          return {
            message: errors,
            success: false,
          };
        }
        // const errors = _validate(["brands"], args);
        // if (!isEmpty(errors)) {
        //   return {
        //     message: errors,
        //     success: false,
        //   };
        // }
        const brands = await Brand.find({});
        let brandList = brands.map((brand) => brand.name);
        let addBrands = [];
        for (let i in args.brands) {
          if (
            !isEmpty(args.brands[i].name) &&
            !~brandList.indexOf(args.brands[i].name)
          ) {
            args.brands[i].url = await updateUrl(args.brands[i].name, "Brand");
            args.brands[i].meta = { title: "", description: "", keywords: "" };
            addBrands.push(args.brands[i]);
          }
        }
        await Brand.insertMany(addBrands);
        return MESSAGE_RESPONSE("AddSuccess", "Brands", true);
      } catch (error) {
        return MESSAGE_RESPONSE("CREATE_ERROR", "Brands", false);
      }
    },
    updateBrand: async (root, args, { id }) => {
      await checkAwsFolder('brand');
      if (!id) {
        return MESSAGE_RESPONSE("TOKEN_REQ", "Brands", false);
      }
      if (!args.id) {
        return MESSAGE_RESPONSE("ID_ERROR", "Brands", false);
      }
      try {
        const errors = _validate(["name", "url"], args);
        if (!isEmpty(errors)) {
          return {
            message: errors,
            success: false,
          };
        }
        const brand = await Brand.findById({ _id: args.id });
        if (brand) {
          if (args.updated_brand_logo) {
            let imgObject = await imageUpload(
              args.updated_brand_logo.file,
              "/assets/images/brand/",'Brand'
            );
            if (imgObject.success === false) {
              throw putError(imgObject.message);
            } else {
              imageUnlink(brand.brand_logo);
              brand.brand_logo = imgObject.data;
            }
          }

          let url = await updateUrl(args.url, "Brand");

          brand.name = args.name;
          brand.url = url;
          brand.meta = args.meta;
          brand.updated = Date.now();

          console.log('BRAND',brand);
          const duplicate = await duplicateData({name: args.name}, Brand, args.id)
          if(duplicate) return MESSAGE_RESPONSE("DUPLICATE", "Brand", false)
          await brand.save();
          return MESSAGE_RESPONSE("UpdateSuccess", "Brands", true);
        } else {
          return MESSAGE_RESPONSE("NOT_EXIST", "Brands", false);
        }
      } catch (error) {
        console.log(error)
        return MESSAGE_RESPONSE("UPDATE_ERROR", "Brands", false);
      }
    },
    deleteBrand: async (root, args, { id }) => {
      // return await DELETE_FUNC(id, args.id, Brand, "Brands");
      if (!id) {
        return MESSAGE_RESPONSE("TOKEN_REQ", "Brand", false);
      }
      if (!args.id) {
        return MESSAGE_RESPONSE("ID_ERROR", "Brand", false);
      }
      try {
        const brand = await Brand.findByIdAndRemove(args.id);
        if (brand) {
          if (brand.brand_logo) {
            imageUnlink(brand.brand_logo);
          }
          let _id = args.id;
          const product = await Product.updateMany(
            {},
            { $unset: { brand: _id } }
          );
          console.log("dgdfhdgh");
          return MESSAGE_RESPONSE("DELETE", "Brand", true);
        }
        return MESSAGE_RESPONSE("NOT_EXIST", "Brand", false);
      } catch (error) {
        return MESSAGE_RESPONSE("DELETE_ERROR", "Brand", false);
      }
    },
  },
};
