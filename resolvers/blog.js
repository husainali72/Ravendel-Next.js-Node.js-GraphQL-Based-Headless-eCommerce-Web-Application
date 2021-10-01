const Blog = require("../models/Blog");
const BlogTag = require("../models/BlogTag");
const {
  stringTourl,
  updateUrl,
  MESSAGE_RESPONSE,
} = require("../config/helpers");
const {
  DELETE_FUNC,
  GET_BY_PAGINATIONS,
  GET_SINGLE_FUNC,
  GET_ALL_FUNC,
  GET_BY_URL,
  CREATE_FUNC,
  UPDATE_FUNC,
} = require("../config/api_functions");

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
          { title: { $regex: search, $options: "i" } },
          { content: { $regex: search, $options: "i" } },
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
          message: MESSAGE_RESPONSE("URL_ERROR", "blogTag", false),
        };
      }
      try {
        const blogtag = await BlogTag.findOne({ url: args.tag_url });
        if (!blogtag) {
          return {
            message: MESSAGE_RESPONSE("NOT_EXIST", "blogTag", false),
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
      return await GET_SINGLE_FUNC(args.tag_id, Blog, "BlogTag");
    },
    // blogsbytagurl: async (root, args) => {
    //   return await GET_BY_URL(BlogTag, args.tag_url, "BlogTag");
    // },
    blogTags_pagination: async (
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
        BlogTag,
        "Blog Tag"
      );
    },

    blogtags: async (root, args) => {
      return await GET_ALL_FUNC(BlogTag, "BlogTags");
    },
  },
  Mutation: {
    addBlog: async (root, args, user) => {
      var url = await updateUrl(args.url || args.title, "Blog");
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
      let path = "/assets/images/blog/feature/";
      return await CREATE_FUNC(user.id, "Blog", Blog, data, "addBlog", path);
    },
    updateBlog: async (root, args, { id }) => {
      let path = "/assets/images/blog/feature/";
      var url = await updateUrl(args.url || args.title, "Blog");

      let data = {
        title: args.title,
        content: args.content,
        status: args.status,
        blog_tag: args.blog_tag,
        url: url,
        meta: args.meta,
        updated: Date.now(),
      };
      return await UPDATE_FUNC(
        id,
        "updateBlog",
        args.id,
        Blog,
        "Blog",
        data,
        path
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
      return await CREATE_FUNC(user.id, "BlogTag", BlogTag, data, "addBlogTag");
    },
    updateBlogTag: async (root, args, { id }) => {
      let url = stringTourl(args.url || args.name);
      let data = {
        name: args.name,
        url: url,
        updated: Date.now(),
      };
      return await UPDATE_FUNC(
        id,
        "updateBlogTag",
        args.id,
        BlogTag,
        "Blog Tag",
        data
      );
    },
    deleteBlogTag: async (root, args, { id }) => {
      return await DELETE_FUNC(id, args.id, BlogTag, "Blog Tag");
    },
  },
};

/*
BACKP=============== 27-09-2021
const Blog = require("../models/Blog");
const BlogTag = require("../models/BlogTag");
const {
  isEmpty,
  putError,
  checkError,
  imageUpload,
  imageUnlink,
  checkToken,
  stringTourl,
  validateUrl,
  updateUrl
} = require("../config/helpers");
const validate = require("../validations/blog");
const errorRES = require("../error");

module.exports = { 
  Query: {
    blogs: async (root, args) => {
      try {
        const blogs = await Blog.find({});
        return blogs || [];
      } catch (error) {
        throw new Error("Something went wrong.");
      }
    },

    // get all blog with pagination .............................

    blog_pagination: async (
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
      ] = await Blog.aggregate([
        { $match: { title: { $regex: search, $options: "i" } } },
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
          message: { message: `${errorRES.RETRIEVE_ERROR} blog`, status: 200 },
        };
      } else {
        return {
          pagination: { totalCount: total, page: pageNumber },
          data: edges,
          message: { message: "Blog List", status: 200 },
        };
      }
    },
    blog: async (root, args) => {
      try {
        const blog = await Blog.findById(args.id);
        if (!blog) {
          throw putError("Blog not found");
        }
        return blog;
        // return { message: '', statuscode: 200, data: blog };
      } catch (error) {
        error = checkError(error);
        return { message: error.custom_message, statuscode: 404 };
      }
    },
    blogsbytagid: async (root, args, { id }) => {
      try {
        const blogs = await Blog.find({
          blog_tag: { $in: args.tag_id },
        });
        return blogs || [];
      } catch (error) {
        error = checkError(error);
        throw new Error(error.custom_message);
      }
    },
    blogsbytagurl: async (root, args, { id }) => {
      try {
        const blogtag = await BlogTag.findOne({ url: args.tag_url });
        if (!blogtag) {
          throw putError("404 Not found");
        }
        const blogs = await Blog.find({
          blog_tag: { $in: blogtag.id },
        });
        return blogs || [];
      } catch (error) {
        error = checkError(error);
        throw new Error(error.custom_message);
      }
    },

    // get all blog tag with pagination

    blogTags_pagination: async (
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
      ] = await BlogTag.aggregate([
        { $match: { name: { $regex: search, $options: "i" } } },
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
          message: { message:  `${errorRES.RETRIEVE_ERROR} blog`, status: 200 },
        };
      } else {
        return {
          pagination: { totalCount: total, page: pageNumber },
          data: edges,
          message: { message: "Tags List", status: 200 },
        };
      }
    },

    blogtags: async (root, args) => {
      try {
        const blogtags = await BlogTag.find({});
        return blogtags || [];
      } catch (error) {
        throw new Error("Something went wrong.");
      }
    },
  },
  Mutation: {
    addBlog: async (root, args, user) => {
      checkToken(user.id);
      try {
        // Check Validation
        const errors = validate("addBlog", args);
        if (!isEmpty(errors)) {
          throw putError(errors);
        }

        let imgObject = "";
        if (args.feature_image) {
          imgObject = await imageUpload(
            args.feature_image,
            "/assets/images/blog/feature/"
          );

          if (imgObject.success === false) {
            throw putError(imgObject.message);
          }
        }

        var url = await updateUrl(args.url || args.title, "Blog");

        const newBlog = new Blog({
          title: args.title,
          url: url,
          content: args.content || "",
          status: args.status,
          blog_tag: args.blog_tag,
          feature_image: imgObject.data || imgObject,
          meta: args.meta,
          author: user.id,
        });

        await newBlog.save();
        return { message: "Blog saved successfully", status: 200 };
      } catch (error) {
        error = checkError(error);
        return { message:  `${errorRES.CREATE_ERROR} blog`, status: 400 };
      }
    },
    updateBlog: async (root, args, { id }) => {
      checkToken(id);
      try {
        // Check Validation
        const errors = validate("updateBlog", args);
        if (!isEmpty(errors)) {
          throw putError(errors);
        }

        const blog = await Blog.findById({ _id: args.id });
        if (blog) {
          if (args.updatedImage) {
            let imgObject = await imageUpload(
              args.updatedImage,
              "/assets/images/blog/feature/"
            );
            if (imgObject.success === false) {
              throw putError(imgObject.message);
            } else {
              imageUnlink(blog.feature_image);
              blog.feature_image = imgObject.data;
            }
          }

          var url = await updateUrl(args.url || args.title, "Blog");

          blog.title = args.title;
          blog.content = args.content;
          blog.status = args.status;
          blog.blog_tag = args.blog_tag;
          blog.url = url;
          blog.meta = args.meta;
          blog.updated = Date.now();
          await blog.save();
          return { message: "Blog updated successfully", status: 200 };
        } else {
          return { message: "Blog not exist", statuscode: 404 };
        }
      } catch (error) {
        error = checkError(error);
        return { message: `${errorRES.UPDATE_ERROR} blog`, status: 400 };
      }
    },
    deleteBlog: async (root, args, { id }) => {
      checkToken(id);
      try {
        const blog = await Blog.findByIdAndRemove(args.id);
        if (blog) {
          //return true;
          if (blog.feature_image) {
            imageUnlink(blog.feature_image);
          }
          //const blogs = await Blog.find({});
          return { message: "Blog deleted successfully", status: 200 };
        }
        throw putError("Blog not exist");
      } catch (error) {
        error = checkError(error);
        return { message:  `${errorRES.DELETE_ERROR} blog`, status: 404 };
      }
    },
    addBlogTag: async (root, args, user) => {
      //checkToken(user.id);
      console.log('user.id', user.id)
      if(!user.id){
        return {message: 'Authentication token is invalid, please log in', status: 401}
      }
      try {
        // Check Validation
        const errors = validate("addBlogTag", args);
        if (!isEmpty(errors)) {
          // throw putError(errors);

          return { message: errors || 'Something went wrong', status: 400 };
        }

        const blogtag = await BlogTag.findOne({ name: args.name });
        if (blogtag) {
          throw putError(
            "A term with the name provided already exists in this taxonomy."
          );
        }

        let url = stringTourl(args.url || args.name);

        const newTag = new BlogTag({
          name: args.name,
          url: url,
        });

        await newTag.save();
        //return await BlogTag.find({});
        return { message: "Tag saved successfully", statuscode: 200 };
      } catch (error) {
        error = checkError(error);
        return { message: `${errorRES.CREATE_ERROR} blogTag`, status: 400 };
      }
    },
    updateBlogTag: async (root, args, { id }) => {
      checkToken(id);
      try {
        // Check Validation
        const errors = validate("updateBlogTag", args);
        if (!isEmpty(errors)) {
          throw putError(errors);
        }
        const blogtag = await BlogTag.findById({ _id: args.id });
        if (blogtag) {
          blogtag.name = args.name;
          let url = stringTourl(args.url || args.name);
          blogtag.url = url;
          blogtag.updated = Date.now();
          await blogtag.save();
          return { message: "Tag updated successfully", statuscode: 200 };
        } else {
          throw putError("Tag not exist");
        }
      } catch (error) {
        error = checkError(error);
        return { message: `${errorRES.UPDATE_ERROR} blogTag`, statuscode: 404 };
      }
    },
    deleteBlogTag: async (root, args, { id }) => {
      checkToken(id);
      try {
        const blogtag = await BlogTag.findByIdAndRemove(args.id);
        if (blogtag) {
          const blogtags = await BlogTag.find({});
          return { message: "Tag deleted successfully", statuscode: 200 };
        }
        throw putError("Tag not exist");
      } catch (error) {
        error = checkError(error);
        return { message: `${errorRES.DELETE_ERROR} blogTag`, statuscode: 404 };
      }
    },
  },
};


*/
