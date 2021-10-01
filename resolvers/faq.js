const Faq = require("../models/Faq");
const {
  isEmpty,
  putError,
  checkError,
  imageUpload,
  imageUnlink,
  checkToken,
  stringTourl,
  validateUrl,
  updateUrl,
} = require("../config/helpers");
const validate = require("../validations/faq");
const sanitizeHtml = require("sanitize-html");

module.exports = {
  Query: {

      Faq_pagination: async (
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
      ] = await Faq.aggregate([
        {
          $match: { title: { $regex: search, $options: "i" } },
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

      if(!edges.length){
        return {
          pagination: { totalCount: total, page: pageNumber },
          data: edges,
          message: {message: 'Faq not found', statuscode: 200}
        };
      } else {
        return {
          pagination: { totalCount: total, page: pageNumber },
          data: edges,
          message: {message: 'Faq List', statuscode: 200}
        };
      }
    },
    faq: async (root, args) => {
      try {
        const faq = await Faq.findById(args.id);
        if (!faq) {
          throw putError("Faq not found");
        }
        return faq;
      } catch (error) {
        error = checkError(error);
        return  {message: error.custom_message, statuscode: 404}
      }
    },
  },
  Mutation: {
    addFaq: async (root, args, user) => {
      checkToken(user.id);
      try {
        // Check Validation
        const errors = validate("addFaq", args);
        if (!isEmpty(errors)) {
          throw putError(errors);
        }

        const newFaq = new Faq({
          title: args.title,
          content: args.content || "",
          status: args.status,
        });

        await newFaq.save();
        return  {message: 'Faq saved successfully', statuscode: 200}
      } catch (error) {
        error = checkError(error);
        return  {message: error.custom_message, statuscode: 400}
      }
    },
    updateFaq: async (root, args, { id }) => {
      checkToken(id);
      try {
        // Check Validation
        const errors = validate("updateFaq", args);
        if (!isEmpty(errors)) {
          throw putError(errors);
        }

        const faq = await Faq.findById({ _id: args.id });
        if (faq) {


          faq.title = args.title;
          faq.content = args.content;
          faq.status = args.status;
          faq.updated = Date.now();
          await faq.save();
          return  {message: 'Faq updated successfully', statuscode: 200}
        } else {
          return  {message: 'Faq not exist', statuscode: 404}
        }
      } catch (error) {
        error = checkError(error);
        return  {message: error.custom_message, statuscode: 400}
      }
    },
    deleteFaq: async (root, args, { id }) => {
      checkToken(id);
      try {
        const faq = await Faq.findByIdAndRemove(args.id);
        if (faq) {

          const faqs = await Faq.find({});
          return  {message: 'Faq deleted successfully', statuscode: 200}
        }
        throw putError("Faq not exist");
      } catch (error) {
        error = checkError(error);
        return  {message: error.custom_message, statuscode: 404}
      }
    },
  },
};