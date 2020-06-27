const Brand = require("../models/Brand");
const {
  isEmpty,
  putError,
  checkError,
  imageUpload,
  imageUnlink,
  checkToken,
  stringTourl,
  updateUrl,
} = require("../config/helpers");
const validate = require("../validations/brand");
const slugify = require("slugify");

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
    },
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
        return await Brand.find({});
      } catch (error) {
        error = checkError(error);
        throw new Error(error.custom_message);
      }
    },
    updateBrand: async (root, args, { id }) => {
      checkToken(id);
      try {
        // Check Validation
        const errors = validate("updateBrand", args);
        if (!isEmpty(errors)) {
          throw putError(errors);
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
          return await Brand.find({});
        } else {
          throw putError("Brand not exist");
        }
      } catch (error) {
        error = checkError(error);
        throw new Error(error.custom_message);
      }
    },
    deleteBrand: async (root, args, { id }) => {
      checkToken(id);
      try {
        const brand = await Brand.findByIdAndRemove(args.id);
        if (brand) {
          //return true;
          if (brand.brand_logo) {
            imageUnlink(brand.brand_logo);
          }
          const brands = await Brand.find({});
          return brands || [];
        }
        throw putError("Brand not exist");
      } catch (error) {
        error = checkError(error);
        throw new Error(error.custom_message);
      }
    },
  },
};
