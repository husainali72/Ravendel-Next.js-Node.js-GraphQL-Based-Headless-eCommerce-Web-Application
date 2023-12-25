const Blog = require("../models/Blog");
const BlogTag = require("../models/BlogTag");
const {
  stringTourl,
  updateUrl,
  MESSAGE_RESPONSE,
  duplicateData
} = require("../config/helpers");
const {
  DELETE_FUNC,
  GET_BY_PAGINATIONS,
  GET_SINGLE_FUNC,
  GET_ALL_FUNC,
  CREATE_FUNC,
  UPDATE_FUNC,
} = require("../config/api_functions");

const { checkAwsFolder } = require("../config/aws");
const fs = require('fs')

var bdir = './assets/images/blog';

if (!fs.existsSync(bdir)) {
  fs.mkdirSync(bdir);
}

module.exports = {
  Query: {
    blogs: async (root, args) => {
      return await GET_ALL_FUNC(Blog, "Blogs");
    },

    blog_pagination: async (
      root,
      { limit, pageNumber, search, orderBy, order }
    ) => {
      var searchInFields = {
        $or: [
          { title: { $regex: `${search}`, $options: "i" } },
          { content: { $regex: `${search}`, $options: "i" } },
        ],
      };
      return await GET_BY_PAGINATIONS(
        limit,
        pageNumber,
        orderBy,
        order,
        searchInFields,
        Blog,
        "Blog"
      );
    },
    blog: async (root, args) => {
      return await GET_SINGLE_FUNC(args.id, Blog, "Blog");
    },
    blogsbytagurl: async (root, args, { id }) => {
      if (!args.tag_url) {
        return {
          message: MESSAGE_RESPONSE("URL_ERROR", "blog Tag", false),
        };
      }
      try {
        const blogtag = await BlogTag.findOne({ url: args.tag_url });

        if (!blogtag) {
          return {
            message: MESSAGE_RESPONSE("NOT_EXIST", "blog Tag", false),
          };
        }
        const blogs = await Blog.find({
          blog_tag: { $in: blogtag.id },
        });
        return {
          message: MESSAGE_RESPONSE("RESULT_FOUND", "blogs", true),
          data: blogs,
        };
      } catch (error) {
        return {
          message: MESSAGE_RESPONSE("RETRIEVE_ERROR", "blogs", false),
        };
      }
    },
    blogsbytagid: async (root, args) => {
      return await GET_SINGLE_FUNC(args.tag_id, BlogTag, "Blog Tag");
    },
    blogTags_pagination: async (
      root,
      { limit, pageNumber, search, orderBy, order }
    ) => {
      let searchInFields = { name: { $regex: `${search}`, $options: "i" } };

      return await GET_BY_PAGINATIONS(
        limit,
        pageNumber,
        orderBy,
        order,
        searchInFields,
        BlogTag,
        "Blog Tag"
      );
    },

    blogtags: async (root, args) => {
      return await GET_ALL_FUNC(BlogTag, "Blog Tags");
    },
  },
  Mutation: {
    addBlog: async (root, args, user) => {
      let url = "";
      if (args.url || args.title) {
        url = await updateUrl(args.url || args.title, "Blog");
      }
      //console.log('ar', args);
      await checkAwsFolder('blog');

      let data = {
        title: args.title,
        url: url,
        content: args.content || "",
        status: args.status,
        blog_tag: args.blog_tag,
        feature_image: args.feature_image,
        meta: args.meta,
        author: user.id,
      };
      let path = "assets/images/blog/";
      let validation = ["title", "status"];
      const duplicate = await duplicateData({ title: args.title }, Blog)
      if (duplicate) return MESSAGE_RESPONSE("DUPLICATE", "Blog Title", false);
      return await CREATE_FUNC(
        user.id,
        "Blog",
        Blog,
        data,
        args,
        path,
        validation
      );
    },
    updateBlog: async (root, args, { id }) => {

      await checkAwsFolder('blog');
      let path = "assets/images/blog/";

      let url = "";
      if (args.url || args.title) {
        url = await updateUrl(args.url || args.title, "Blog", args.id);
      }

      let data = {
        title: args.title,
        content: args.content,
        status: args.status,
        blog_tag: args.blog_tag,
        url: url,
        updatedImage: args.updatedImage,
        meta: args.meta,
        updated: Date.now(),
      };
      let validation = ["title", "status"];
      const duplicate = await duplicateData({ title: args.title }, Blog, args.id)
      if (duplicate) return MESSAGE_RESPONSE("DUPLICATE", "Blog Title", false);
      return await UPDATE_FUNC(
        id,
        args.id,
        Blog,
        "Blog",
        data,
        path,
        args,
        validation
      );
    },

    deleteBlog: async (root, args, { id }) => {
      return await DELETE_FUNC(id, args.id, Blog, "Blog");
    },
    addBlogTag: async (root, args, user) => {
      let url = stringTourl(args.url || args.name);
      let data = {
        name: args.name,
        url: url,
      };
      let validation = ["name"];
      const duplicate = await duplicateData({ name: args.name }, BlogTag)
      if (duplicate) return MESSAGE_RESPONSE("DUPLICATE", "Blog Tag", false);
      return await CREATE_FUNC(
        user.id,
        "Blog Tag",
        BlogTag,
        data,
        args,
        "",
        validation,
      );
    },
    updateBlogTag: async (root, args, { id }) => {
      let url = stringTourl(args.url || args.name);
      let data = {
        name: args.name,
        url: url,
        updated: Date.now(),
      }
      let validation = ["name"];
      const duplicate = await duplicateData({ name: args.name }, BlogTag, args.id)
      if (duplicate) return MESSAGE_RESPONSE("DUPLICATE", "Blog Tag", false);
      return await UPDATE_FUNC(
        id,
        args.id,
        BlogTag,
        "Blog Tag",
        data,
        "",
        args,
        validation
      );
    },
    deleteBlogTag: async (root, args, { id }) => {
      return await DELETE_FUNC(id, args.id, BlogTag, "Blog Tag");
    },
  },
}; 