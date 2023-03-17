const Faq = require("../models/Faq");
const {
  DELETE_FUNC,
  GET_BY_PAGINATIONS,
  GET_SINGLE_FUNC,
  CREATE_FUNC,
  UPDATE_FUNC,
} = require("../config/api_functions");
const { duplicateData, MESSAGE_RESPONSE } = require("../config/helpers");

module.exports = {
  Query: {
    Faq_pagination: async (
      root,
      { limit, pageNumber, search, orderBy, order }
    ) => {
      let searchInFields = { title: { $regex: `${search}`, $options: "i" } };
      return await GET_BY_PAGINATIONS(
        limit,
        pageNumber,
        orderBy,
        order,
        searchInFields,
        Faq,
        "Faqs"
      );
    },
    faq: async (root, args) => {
      return await GET_SINGLE_FUNC(args.id, Faq, "Faq");
    },
  },
  Mutation: {
    addFaq: async (root, args, user) => {
      let data = {
        title: args.title,
        content: args.content || "",
        status: args.status,
      };
      let validation = ["title", "content"];
      return await CREATE_FUNC(id, "Faq", Faq, data, args, "", validation);
    },
    updateFaq: async (root, args, { id }) => {
      let data = {
        title: args.title,
        content: args.content || "",
        status: args.status,
      };
      let validation = ["title", "content"];
      const duplicate = await duplicateData({title: data.title}, Faq, args.id)
      if(duplicate) return MESSAGE_RESPONSE("DUPLICATE", "Faq Title", false)
      return await UPDATE_FUNC(
        id,
        args.id,
        Faq,
        "Faq",
        data,
        "",
        args,
        validation
      );
    },
    deleteFaq: async (root, args, { id }) => {
      return await DELETE_FUNC(id, args.id, Faq, "Faq");
    },
  },
};
