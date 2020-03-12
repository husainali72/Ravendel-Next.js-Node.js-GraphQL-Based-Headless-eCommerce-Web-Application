const Blog = require("../models/Blog");
const {
  isEmpty,
  putError,
  checkError,
  imageUpload,
  imageUnlink,
  checkToken,
  stringTourl
} = require("../config/helpers");
const validate = require("../validations/blog");
const sanitizeHtml = require("sanitize-html");

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
    blog: async (root, args) => {
      try {
        const blog = await Blog.findById(args.id);
        if (!blog) {
          throw putError("Blog not found");
        }
        return blog;
      } catch (error) {
        error = checkError(error);
        throw new Error(error.custom_message);
      }
    }
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

        const blog = await Blog.findOne({ title: args.title });
        if (blog) {
          throw putError("Title already exist.");
        } else {
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

          let url = stringTourl(args.url || args.title);

          const newBlog = new Blog({
            title: args.title,
            url: url,
            content: args.content || "",
            status: args.status,
            feature_image: imgObject.data || imgObject,
            meta: args.meta,
            author: user.id
          });

          await newBlog.save();
          return await Blog.find({});
        }
      } catch (error) {
        error = checkError(error);
        throw new Error(error.custom_message);
      }
    },
    updateBlog: async (root, args, { id }) => {
      checkToken(id);
      try {
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

          blog.title = args.title || blog.title;
          blog.content = args.content || blog.content;
          blog.status = args.status || blog.status;

          let url = stringTourl(args.url || blog.title);
          blog.url = url;
          blog.meta = args.meta;
          blog.updated = Date.now();
          await blog.save();
          return await Blog.find({});
        } else {
          throw putError("Blog not exist");
        }
      } catch (error) {
        error = checkError(error);
        throw new Error(error.custom_message);
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
          const blogs = await Blog.find({});
          return blogs || [];
        }
        throw putError("Blog not exist");
      } catch (error) {
        error = checkError(error);
        throw new Error(error.custom_message);
      }
    }
  }
};
