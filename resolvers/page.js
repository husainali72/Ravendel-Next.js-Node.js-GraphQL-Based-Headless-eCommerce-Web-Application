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

module.exports = {
  Query: {
    pages: async (root, args) => {
      try {
        return await Page.find({});
      } catch (error) {
        throw new Error("Something went wrong.");
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
        throw new Error(error.custom_message);
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
        return pages || [];
      } catch (error) {
        error = checkError(error);
        throw new Error(error.custom_message);
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
          return await Page.find({});
        } else {
          throw putError("Page not exist");
        }
      } catch (error) {
        error = checkError(error);
        throw new Error(error.custom_message);
      }
    },
    deletePage: async (root, args, { id }) => {
      checkToken(id);
      try {
        const page = await Page.findByIdAndRemove(args.id);
        if (page) {
          let pages = await Page.find({});
          return pages || [];
        }
        throw putError("Page not exist");
      } catch (error) {
        error = checkError(error);
        throw new Error(error.custom_message);
      }
    },
  },
};
