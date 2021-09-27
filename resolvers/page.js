const Page = require("../models/Page");
const {
  isEmpty,
  putError,
  checkError,
  checkToken,
  validateUrl,
  stringTourl,
} = require("../config/helpers");
const validate = require("../validations/page");
const errorRES = require("../error");

module.exports = {
  Query: {
    pages: async (root, args) => {
      try {
        return await Page.find({});
      } catch (error) {
        throw new Error("Something went wrong.");
      }
    },
    // all apge get with pagination.....................

    page_pagination: async (
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
      ] = await Page.aggregate([
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
          message: {message: `${errorRES.RETRIEVE_ERROR} Page `, status: 200}
        };
      } else {
        return {
          pagination: { totalCount: total, page: pageNumber },
          data: edges,
          message: {message: 'Page List', status: 200}
        };
      }
    },
    page: async (root, args) => {
      try {
        const page = await Page.findById(args.id);
        if (!page) {
          throw putError("Page not found");
        }
        return page;
      } catch (error) {
        error = checkError(error);
        return  {message: error.custom_message, status: 404}
      }
    },
  },
  Mutation: {
    addPage: async (root, args, { id }) => {
      checkToken(id);
      try {
        // Check Validation
        const errors = validate("addPage", args);
        if (!isEmpty(errors)) {
          throw putError(errors);
        }

        var url = stringTourl(args.url || args.title);
        var duplicate = true;
        while (duplicate) {
          let page = await Page.findOne({ url: url });
          if (page) {
            url = validateUrl(url);
          } else {
            duplicate = false;
          }
        }

        const newPage = new Page({
          title: args.title,
          content: args.content,
          status: args.status,
          url: url,
          meta: args.meta,
        });

        await newPage.save();

        let pages = await Page.find({});
        return  {message: 'page saved successfully', status: 200}
      } catch (error) {
        error = checkError(error);
        return  {message: `${errorRES.CREATE_ERROR} Page`, status: 400}
      }
    },
    updatePage: async (root, args, { id }) => {
      checkToken(id);
      try {
        const page = await Page.findById({ _id: args.id });
        if (page) {
          var url = stringTourl(args.url || args.title);
          var duplicate = true;
          while (duplicate) {
            let page = await Page.findOne({ url: url, _id: { $nin: args.id } });
            if (page) {
              url = validateUrl(url);
            } else {
              duplicate = false;
            }
          }

          page.title = args.title;
          page.content = args.content;
          page.status = args.status;
          page.url = url;
          page.meta = args.meta;
          page.updatedAt = Date.now();
          await page.save();
          return  {message: 'Page updated successfully', status: 200}
        } else {
          return  {message: 'Page not exist', status: 404}
        }
      } catch (error) {
        error = checkError(error);
        return  {message: `${errorRES.UPDATE_ERROR} Page`, status: 400}
      }
    },
    deletePage: async (root, args, { id }) => {
      checkToken(id);
      try {
        const page = await Page.findByIdAndRemove(args.id);
        if (page) {
          let pages = await Page.find({});
          return  {message: 'Page deleted successfully', status: 200}
        }
        throw putError("Page not exist");
      } catch (error) {
        error = checkError(error);
        return  {message: `${errorRES.DELETE_ERROR} Page`, status: 404}
      }
    },
  },
};
