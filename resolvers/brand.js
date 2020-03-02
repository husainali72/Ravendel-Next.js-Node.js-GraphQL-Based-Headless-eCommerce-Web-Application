const Brand = require("../models/Brand");
const {
  isEmpty,
  putError,
  checkError,
  imageUpload,
  imageUnlink,
  checkToken
} = require("../config/helpers");
const validate = require("../validations/brand");

module.exports = {
  Query: {
    brands: async (root, args) => {
      try {
        const brands = await Brand.find({});
        return brands || [];
      } catch (error) {
        throw new Error("Something went wrong.");
      }
    },
    brand: async (root, args) => {
      try {
        const brand = await Brand.findById(args.id);
        if (!brand) {
          throw putError("Brand not found");
        }
        return brand;
      } catch (error) {
        error = checkError(error);
        throw new Error(error.custom_message);
      }
    }
  },
  Mutation: {
    addBrand: async (root, args, { id }) => {
      checkToken(id);
      try {
        // Check Validation
        const errors = validate("addBrand", args);
        if (!isEmpty(errors)) {
          throw putError(errors);
        }

        const brands = await Brand.find({});

        let brands = [];
        for (let i in brands) {
          brands = args.brands.filter(brand => brand.name !== brands[i].name);
        }

        console.log("brands", brands);
        await Brand.insertMany(brands);

        return await Brand.find({});
      } catch (error) {
        error = checkError(error);
        throw new Error(error.custom_message);
      }
    }
  }
};
