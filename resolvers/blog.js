const Blog = require("../models/Blog");
const {
  isEmpty,
  putError,
  checkError,
  imageUpload,
  imageUnlink
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

          const newBlog = new Blog({
            title: args.title,
            content: args.content || "",
            status: args.status,
            feature_image: imgObject.data || imgObject,
            author: user.id
          });

          await newBlog.save();
          return await Blog.find({});
        }
      } catch (error) {
        console.log("here comes", error);
        error = checkError(error);
        throw new Error(error.custom_message);
      }
    },
    updateBlog: async (root, args) => {
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
          blog.updated = Date.now();

          /* let metArra = {};
          for (let i in args.meta) {
            metArra[args.meta[i].key] = args.meta[i];
          }

          for (let i in blog.meta) {
            if (metArra[blog.meta[i].key]) {
              blog.meta[i].value = metArra[blog.meta[i].key].value;
              delete metArra[blog.meta[i].key];
            }
          }

          if (Object.keys(metArra).length) {
            for (let i in metArra) {
              blog.meta.unshift(metArra[i]);
            }
          } */

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
    deleteBlog: async (root, args) => {
      try {
        const blog = await Blog.findByIdAndRemove(args.id);
        if (blog) {
          //return true;
          imageUnlink(blog.feature_image);
          return await Blog.find({});
        }
        throw putError("Blog not exist");
      } catch (error) {
        error = checkError(error);
        throw new Error(error.custom_message);
      }
    }
  }
};
