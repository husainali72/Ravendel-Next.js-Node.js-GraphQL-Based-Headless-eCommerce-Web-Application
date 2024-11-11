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
  duplicateData,
} = require("../config/helpers");
const {
  DELETE_FUNC,
  GET_BY_PAGINATIONS,
  GET_SINGLE_FUNC,
  GET_ALL_FUNC,
} = require("../config/api_functions");

const { checkAwsFolder } = require("../config/aws");
const fs = require("fs");

var sdir = "./assets/images/brand";
// var ldir = './assets/images/brand/large';
// var mdir = './assets/images/brand/medium';
// var tdir = './assets/images/brand/thumbnail';
// var odir = './assets/images/brand/original';

if (!fs.existsSync(sdir)) {
  fs.mkdirSync(sdir);
}
// if (!fs.existsSync(ldir)){
//   fs.mkdirSync(ldir);
// }
// if (!fs.existsSync(mdir)){
//   fs.mkdirSync(mdir);
// }
// if (!fs.existsSync(odir)){
//   fs.mkdirSync(odir);
// }
// if (!fs.existsSync(tdir)){
//   fs.mkdirSync(tdir);
// }

const processBrands = async (brands, existingBrandNames) => {
  let addBrands = [];
  let duplicateBrands = [];

  for (const brand of brands) {
    const brandName = brand.name?.trim().toLowerCase();

    if (!brandName || existingBrandNames.has(brandName)) {
      duplicateBrands.push(brand.name);
    } else {
      brand.url = await updateUrl(brand.name, "Brand");
      brand.meta = { title: "", description: "", keywords: "" };
      addBrands.push(brand);
    }
  }

  return { addBrands, duplicateBrands };
};

module.exports = {
  Query: {
    brands: async (root, args) => {
      return await GET_ALL_FUNC(Brand, "Brands");
    },
    brands_pagination: async (
      root,
      { limit, pageNumber, search, orderBy, order }
    ) => {
      let searchInFields = { name: { $regex: `${search}`, $options: "i" } };
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
      if (!id) {
        return MESSAGE_RESPONSE("TOKEN_REQ", "brand", false);
      }

      if (!args.brands || !args.brands.length) {
        return {
          message: "Brand list is required",
          success: false,
        };
      }

      try {
        const existingBrands = await Brand.find({}).select("name");
        const existingBrandNames = new Set(
          existingBrands.map((brand) => brand.name.toLowerCase())
        );

        let { addBrands, duplicateBrands } = await processBrands(
          args.brands,
          existingBrandNames
        );

        if (duplicateBrands.length) {
          return {
            message: `${duplicateBrands.join(", ")} already exists`,
            success: false,
          };
        }

        if (addBrands.length) {
          await Brand.insertMany(addBrands);
        }

        return MESSAGE_RESPONSE("AddSuccess", "Brands", true);
      } catch (error) {
        console.log(error);
        return MESSAGE_RESPONSE("CREATE_ERROR", "Brands", false);
      }
    },
    updateBrand: async (root, args, { id }) => {
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
        console.log("args", args);
        const brand = await Brand.findById({ _id: args.id });
        if (brand) {
          if (args?.updated_brand_logo) {
            // if no image then throw error
            if (!args.updated_brand_logo[0]?.file) {
              return MESSAGE_RESPONSE("ImageFileMissing", "Brand", false);
            }
            let imgObject = await imageUpload(
              args.updated_brand_logo[0].file,
              "assets/images/brand/",
              "Brand",
              args.url
            );
            if (imgObject.success === false) {
              throw putError(imgObject.message);
            } else {
              imageUnlink(brand.brand_logo);
              brand.brand_logo = imgObject.data;
            }
          }

          let url = await updateUrl(args.url, "Brand", args.id);

          brand.name = args.name;
          brand.url = url;
          brand.meta = args.meta;
          brand.updated = Date.now();

          // console.log('BRAND',brand);
          const duplicate = await duplicateData(
            { name: args.name },
            Brand,
            args.id
          );
          if (duplicate)
            return MESSAGE_RESPONSE("DUPLICATE", "Brand Name", false);
          await brand.save();
          return MESSAGE_RESPONSE("UpdateSuccess", "Brands", true);
        } else {
          return MESSAGE_RESPONSE("NOT_EXIST", "Brands", false);
        }
      } catch (error) {
        console.log(error);
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
        const brand = await Brand.deleteOne({ _id: args.id });
        if (brand) {
          if (brand.brand_logo) {
            imageUnlink(brand.brand_logo);
          }
          let _id = args.id;
          const product = await Product.updateMany(
            { brand: _id },
            { $unset: { brand: 1 } }
          );

          return MESSAGE_RESPONSE("DELETE", "Brand", true);
        }
        return MESSAGE_RESPONSE("NOT_EXIST", "Brand", false);
      } catch (error) {
        return MESSAGE_RESPONSE("DELETE_ERROR", "Brand", false);
      }
    },
  },
};
