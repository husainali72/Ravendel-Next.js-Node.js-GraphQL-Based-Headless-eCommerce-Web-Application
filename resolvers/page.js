const Page = require("../models/Page");
const { isEmpty, putError, checkError } = require("../config/helpers");
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
    pagesbyMeta: async (root, args) => {
      try {
        const page = await Page.find({
          "meta.key": args.key,
          "meta.value": args.value
        });
        if (!page) {
          throw putError("Page not found");
        }
        return page;
      } catch (error) {
        error = checkError(error);
        throw new Error(error.custom_message);
      }
    }
  },
  pageMeta: {
    meta: async (root, args) => {
      try {
        if (isEmpty(args)) {
          return root;
        }
        for (let i in root) {
          if (root[i].key == args.key && root[i].value == args.value) {
            return root[i];
          }
        }
        return [];
      } catch (error) {
        error = checkError(error);
        throw new Error(error.custom_message);
      }
    }
  },
  Mutation: {
    addPage: async (root, args) => {
      try {
        // Check Validation
        const errors = validate("addPage", args);
        if (!isEmpty(errors)) {
          throw putError(errors);
        }

        const page = await Page.findOne({ name: args.name });
        if (page) {
          throw putError("Name already exist.");
        } else {
          const newPage = new Page({
            name: args.name,
            description: args.description,
            status: args.status
          });

          return await newPage.save();
        }
      } catch (error) {
        //console.log("here comes", error);
        error = checkError(error);
        throw new Error(error.custom_message);
      }
    },
    updatePage: async (root, args) => {
      try {
        const page = await Page.findById({ _id: args.id });
        if (page) {
          page.name = args.name || page.name;
          page.description = args.description || page.description;
          page.status = args.status || page.status;
          page.updated = Date.now();

          let metArra = {};

          for (let i in args.meta) {
            metArra[args.meta[i].key] = args.meta[i];
          }

          for (let i in page.meta) {
            if (metArra[page.meta[i].key]) {
              page.meta[i].value = metArra[page.meta[i].key].value;
              delete metArra[page.meta[i].key];
            }
          }

          if (Object.keys(metArra).length) {
            for (let i in metArra) {
              page.meta.unshift(metArra[i]);
            }
          }

          return await page.save();
        } else {
          throw putError("Page not exist");
        }
      } catch (error) {
        error = checkError(error);
        throw new Error(error.custom_message);
      }
    },
    deletePage: async (root, args) => {
      const page = await Page.findByIdAndRemove(args.id);
      if (page) {
        return true;
      }
      return false;
    }
  }
};
