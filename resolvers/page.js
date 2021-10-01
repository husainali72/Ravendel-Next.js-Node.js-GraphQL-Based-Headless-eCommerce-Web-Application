const Page = require("../models/Page");
const {
  isEmpty,
  checkError,
  checkToken,
  validateUrl,
  stringTourl,
} = require("../config/helpers");
const validate = require("../validations/page");
const Messages = require("../config/messages");

module.exports = {
  Query: {
    pages: async (root, args) => {
      try {
        const allPage = await Page.find({});
        return {
          message: {
            message: Messages.RESULT_FOUND.replace(":item", "Page"),
            success: true,
          },
          data: allPage,
        };
      } catch (error) {
        return {
          message: {
            message: Messages.RETRIEVE_ERROR.replace(":item", "Page"),
            success: false,
          },
        };
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

      if (!edges.length) {
        return {
          pagination: { totalCount: total, page: pageNumber },
          data: edges,
          message: {
            message: Messages.RETRIEVE_ERROR.replace(":item", "Page"),
            success: false,
          },
        };
      } else {
        return {
          pagination: { totalCount: total, page: pageNumber },
          data: edges,
          message: {
            message: Messages.RESULT_FOUND.replace(":item", "Page"),
            success: true,
          },
        };
      }
    },
    page: async (root, args) => {
      if (!args.id) {
        return {
          message: {
            message: Messages.ID_ERROR.replace(":item", "Page"),
            success: false,
          },
        };
      }
      try {
        const page = await Page.findById(args.id);
        if (!page) {
          return {
            message: {
              message: Messages.NOT_EXIST.replace(":item", "page"),
              success: false,
            },
          };
        }
        return {
          message: {
            message: Messages.RESULT_FOUND.replace(":item", "Page"),
            success: true,
          },
          data: page,
        };
      } catch (error) {
        error = checkError(error);
        return {
          message: {
            message: Messages.RETRIEVE_ERROR.replace(":item", "Page"),
            success: false,
          },
        };
      }
    },
  },
  Mutation: {
    addPage: async (root, args, { id }) => {
      if (!id) {
        return {
          message: Messages.TOKEN_REQ.replace(":item", "Page"),
          success: false,
        };
      }
      checkToken(id);
      try {
        const errors = validate("addPage", args);
        if (!isEmpty(errors)) {
          return {
            message: errors,
            success: false,
          };
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
        return {
          message: Messages.AddSuccess.replace(":item", "Page"),
          success: true,
        };
      } catch (error) {
        error = checkError(error);
        return {
          message: Messages.CREATE_ERROR.replace(":item", "Page"),
          success: false,
        };
      }
    },
    updatePage: async (root, args, { id }) => {
      if (!id) {
        return {
          message: Messages.TOKEN_REQ.replace(":item", "Page"),
          success: false,
        };
      }
      checkToken(id);
      if (!args.id) {
        return {
          message: Messages.ID_ERROR.replace(":item", "Page"),
          success: false,
        };
      }
      const errors = validate("updatePage", args);
      if (!isEmpty(errors)) {
        return {
          message: errors,
          success: false,
        };
      }
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
          return {
            message: Messages.UpdateSuccess.replace(":item", "Page"),
            success: true,
          };
        }
        return {
          message: Messages.NOT_EXIST.replace(":item", "page"),
          success: false,
        };
      } catch (error) {
        error = checkError(error);
        return {
          message: Messages.UPDATE_ERROR.replace(":item", "Page"),
          success: false,
        };
      }
    },
    deletePage: async (root, args, { id }) => {
      if (!id) {
        return {
          message: Messages.TOKEN_REQ.replace(":item", "Page"),
          success: false,
        };
      }
      checkToken(id);
      if (!args.id) {
        return {
          message: Messages.ID_ERROR.replace(":item", "Page"),
          success: false,
        };
      }
      try {
        const page = await Page.findByIdAndRemove(args.id);
        if (page) {
          let pages = await Page.find({});
          return {
            message: Messages.DELETE.replace(":item", "Page"),
            success: true,
          };
        }
        return {
          message: Messages.NOT_EXIST.replace(":item", "page"),
          success: false,
        };
      } catch (error) {
        error = checkError(error);
        return {
          message: Messages.DELETE_ERROR.replace(":item", "Page"),
          success: false,
        };
      }
    },
  },
};
