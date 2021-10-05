const Brand = require("../models/Brand");
const { isEmpty, updateUrl, MESSAGE_RESPONSE } = require("../config/helpers");
const {
  DELETE_FUNC,
  GET_BY_PAGINATIONS,
  GET_SINGLE_FUNC,
  GET_ALL_FUNC,
  CREATE_FUNC,
  UPDATE_FUNC,
} = require("../config/api_functions");
const validate = require("../validations/brand");

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
      if (!id) {
        return MESSAGE_RESPONSE("TOKEN_REQ", "brand", false);
      }
      try {
        const errors = validate("addBrand", args);
        if (!isEmpty(errors)) {
          return {
            message: errors,
            success: false,
          };
        }
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
        return MESSAGE_RESPONSE("AddSuccess", "Order", true);
      } catch (error) {
        return MESSAGE_RESPONSE("CREATE_ERROR", "Order", false);
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
        const errors = validate("updateBrand", args);
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
              args.updated_brand_logo,
              "/assets/images/brand/"
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

          await brand.save();
          return MESSAGE_RESPONSE("UpdateSuccess", "Brands", true);
        } else {
          return MESSAGE_RESPONSE("NOT_EXIST", "Brands", false);
        }
      } catch (error) {
        return MESSAGE_RESPONSE("UPDATE_ERROR", "Brands", false);
      }
    },
    deleteBrand: async (root, args, { id }) => {
      return await DELETE_FUNC(id, args.id, Brand, "Brands");
    },
  },
};

// let path = "/assets/images/brand/";
// let url = await updateUrl(args.url, "Brand");

// let data = {
//   name: args.name,
//   url: url,
//   meta: args.meta,
//   updated: Date.now(),
// };
// return await UPDATE_FUNC(
//   id,
//   "updateBrand",
//   args.id,
//   Brand,
//   "Brand",
//   data,
//   path
// );
