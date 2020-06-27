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
  updateUrl,
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
        return await Blog.find({});
      } catch (error) {
        error = checkError(error);
        throw new Error(error.custom_message);
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
    },
    addBlogTag: async (root, args, user) => {
      checkToken(user.id);
      try {
        // Check Validation
        const errors = validate("addBlogTag", args);
        if (!isEmpty(errors)) {
          throw putError(errors);
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
        return await BlogTag.find({});
      } catch (error) {
        error = checkError(error);
        throw new Error(error.custom_message);
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
          return await BlogTag.find({});
        } else {
          throw putError("Tag not exist");
        }
      } catch (error) {
        error = checkError(error);
        throw new Error(error.custom_message);
      }
    },
    deleteBlogTag: async (root, args, { id }) => {
      checkToken(id);
      try {
        const blogtag = await BlogTag.findByIdAndRemove(args.id);
        if (blogtag) {
          const blogtags = await BlogTag.find({});
          return blogtags || [];
        }
        throw putError("Blog not exist");
      } catch (error) {
        error = checkError(error);
        throw new Error(error.custom_message);
      }
    },
  },
};
