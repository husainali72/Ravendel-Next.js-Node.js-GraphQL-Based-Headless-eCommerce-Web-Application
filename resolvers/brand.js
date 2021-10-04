const Brand = require("../models/Brand");
const {
  isEmpty,
  updateUrl,
} = require("../config/helpers");
const {
  DELETE_FUNC,
  GET_BY_PAGINATIONS,
  GET_SINGLE_FUNC,
  GET_ALL_FUNC,
  CREATE_FUNC,
  UPDATE_FUNC,
} = require("../config/api_functions");

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

      return await CREATE_FUNC(id, "Brand", Brand, addBrands, "addBrand");
    },
    updateBrand: async (root, args, { id }) => {
      let path = "/assets/images/brand/";
      let url = await updateUrl(args.url, "Brand");

      let data = {
        name: args.name,
        url: url,
        meta: args.meta,
        updated: Date.now(),
      };
      return await UPDATE_FUNC(
        id,
        "updateBrand",
        args.id,
        Brand,
        "Brand",
        data,
        path
      );
    },
    deleteBrand: async (root, args, { id }) => {
      return await DELETE_FUNC(id, args.id, Brand, "Brands");
    },
  },
};

/**
 * const Brand = require("../models/Brand");
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
const Messages = require("../error");


module.exports = {
  Query: {
    brands: async (root, args) => {
      try {
        const brands = await Brand.find({});
        return brands || [];
      } catch (error) {
        m;
        throw new Error("Something went wrong.");
      }
    },

    // get all brands with pagination.......................

    brands_pagination: async (
      root,
      { limit, pageNumber, search, orderBy, order }
    ) => {
      var sort = orderBy ? orderBy : "_id";
      var sortDirection = order === "DESC" ? -1 : 1;
      const [
        {
          total: [total = 0],
          edges,
        },
      ] = await Brand.aggregate([
        {
          $match: { name: { $regex: search, $options: "i" } },
        },
        {
          $facet: {
            total: [{ $group: { _id: null, count: { $sum: 1 } } }],
            edges: [
              { $sort: { [sort]: sortDirection } },
              { $skip: limit * (pageNumber - 1) },
              { $limit: limit },
            ],
          },
        },
        {
          $project: {
            total: "$total.count",
            edges: "$edges",
          },
        },
      ]);
      if (!edges.length) {
        return {
          pagination: { totalCount: total, page: pageNumber },
          data: edges,
          message: { message: `${Messages.RETRIEVE_ERROR} Brands`, status: 200 },
        };
      } else {
        return {
          pagination: { totalCount: total, page: pageNumber },
          data: edges,
          message: { message: "Brands list fetched", status: 200 },
        };
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
        //return await Brand.find({});
        return { message: "Brand saved successfully", status: 200 };
      } catch (error) {
        error = checkError(error);
        return { message: `${Messages.CREATE_ERROR} Brands`, status: 400 };
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
          // return await Brand.find({});
          return { message: "Brand updated successfully", status: 200 };
        } else {
          return { message: "Brand not exist", status: 404 };
        }
      } catch (error) {
        error = checkError(error);
        return { message: `${Messages.UPDATE_ERROR} Brands`, status: 400 };
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
          // const brands = await Brand.find({});
          // return brands || [];
          return { message: "Brand deleted successfully", status: 200 };
        }
        throw putError("Brand not exist");
      } catch (error) {
        error = checkError(error);
        return { message: `${Messages.DELETE_ERROR} Brands`, status: 404 };
      }
    },
  },
};

 */
