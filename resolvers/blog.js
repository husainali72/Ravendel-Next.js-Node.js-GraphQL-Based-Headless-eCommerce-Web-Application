const Blog = require("../models/Blog");
const { isEmpty, putError, checkError } = require("../config/helpers");
const validate = require("../validations/blog");

module.exports = {
  Query: {
    blogs: async (root, args) => {
      try {
        return await Blog.find({});
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
    blogsbyMeta: async (root, args) => {
      try {
        const blog = await Blog.find({
          "meta.key": args.key,
          "meta.value": args.value
        });
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
  blogMeta: {
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
    addBlog: async (root, args) => {
      try {
        // Check Validation
        const errors = validate("addBlog", args);
        if (!isEmpty(errors)) {
          throw putError(errors);
        }

        const blog = await Blog.findOne({ name: args.name });
        if (blog) {
          throw putError("Name already exist.");
        } else {
          const newBlog = new Blog({
            name: args.name,
            description: args.description,
            status: args.status
          });

          return await newBlog.save();
        }
      } catch (error) {
        //console.log("here comes", error);
        error = checkError(error);
        throw new Error(error.custom_message);
      }
    },
    updateBlog: async (root, args) => {
      try {
        const blog = await Blog.findById({ _id: args.id });
        if (blog) {
          blog.name = args.name || blog.name;
          blog.description = args.description || blog.description;
          blog.status = args.status || blog.status;
          blog.updated = Date.now();

          let metArra = {};

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
          }

          return await blog.save();
        } else {
          throw putError("Blog not exist");
        }
      } catch (error) {
        error = checkError(error);
        throw new Error(error.custom_message);
      }
    },
    deleteBlog: async (root, args) => {
      const blog = await Blog.findByIdAndRemove(args.id);
      if (blog) {
        return true;
      }
      return false;
    }
  }
};
