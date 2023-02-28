const Page = require("../models/Page");
const { updateUrl, duplicateData, MESSAGE_RESPONSE } = require("../config/helpers");
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
    pages: async (root, args) => {
      return await GET_ALL_FUNC(Page, " Pages");
    },
    page_pagination: async (
      root,
      { limit, pageNumber, search, orderBy, order }
    ) => {
      let searchInFields = { title: { $regex: search, $options: "i" } };
      return await GET_BY_PAGINATIONS(
        limit,
        pageNumber,
        orderBy,
        order,
        searchInFields,
        Page,
        "Pages"
      );
    },
    page: async (root, args) => {
      return await GET_SINGLE_FUNC(args.id, Page, "Page");
    },
  },
  Mutation: {
    addPage: async (root, args, { id }) => {
      let url = "";
      if (args.url || args.title) {
        url = await updateUrl(args.url || args.title, "Page");
      }
      let data = {
        title: args.title,
        content: args.content,
        status: args.status,
        url: url,
        meta: args.meta,
      };
      let validation = ["title"];
      const duplicate = await duplicateData({title: args.title}, Page)
      if(duplicate) return MESSAGE_RESPONSE("DUPLICATE", "Page", false);
      return await CREATE_FUNC(id, "Page", Page, data, args, "", validation);
    },
    updatePage: async (root, args, { id }) => {
      let url = "";
      if (args.url || args.title) {
        url = await updateUrl(args.url || args.title, "Page", args.id);
      }
      let data = {
        title: args.title,
        content: args.content,
        status: args.status,
        url: url,
        meta: args.meta,
      };
      let validation = ["title"];
      const duplicate = await duplicateData({title: args.title}, Page, args.id)
      if(duplicate) return MESSAGE_RESPONSE("DUPLICATE", "Page", false);
      return await UPDATE_FUNC(
        id,
        args.id,
        Page,
        "Page",
        data,
        "",
        args,
        validation
      );
    },
    deletePage: async (root, args, { id }) => {
      return await DELETE_FUNC(id, args.id, Page, "Page");
    },
  },
};
