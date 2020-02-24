const User = require("../models/User");
const {
  isEmpty,
  putError,
  checkError,
  imageUpload,
  imageUnlink,
  checkToken
} = require("../config/helpers");
const validate = require("../validations/user");
const bcrypt = require("bcryptjs");

module.exports = {
  Query: {
    users: async (root, args) => {
      try {
        const users = await User.find({});
        return users || [];
      } catch (error) {
        throw new Error("Something went wrong.");
      }
    },
    user: async (root, args) => {
      try {
        const user = await User.findById(args.id);
        if (!user) {
          throw putError("User not found");
        }
        return user;
      } catch (error) {
        error = checkError(error);
        throw new Error(error.custom_message);
      }
    },
    usersbyMeta: async (root, args) => {
      try {
        const user = await User.find({
          "meta.key": args.key,
          "meta.value": args.value
        });
        if (!user) {
          throw putError("User not found");
        }
        return user;
      } catch (error) {
        error = checkError(error);
        throw new Error(error.custom_message);
      }
    }
  },
  userMeta: {
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
      } catch (error) {
        error = checkError(error);
        throw new Error(error.custom_message);
      }
    }
  },
  Mutation: {
    addUser: async (root, args, { id }) => {
      checkToken(id);
      try {
        // Check Validation
        const errors = validate("addUser", args);
        if (!isEmpty(errors)) {
          throw putError(errors);
        }

        const user = await User.findOne({ email: args.email });

        if (user) {
          throw putError("Email already exist.");
        } else {
          let imgObject = "";
          if (args.image) {
            imgObject = await imageUpload(args.image, "/assets/images/user/");
            if (imgObject.success === false) {
              throw putError(imgObject.message);
            }
          }
          const newUser = new User({
            name: args.name,
            email: args.email,
            password: args.password,
            role: args.role,
            image: imgObject.data || imgObject
          });

          newUser.password = await bcrypt.hash(args.password, 10);
          const user = await newUser.save();
          //return user;
          return await User.find({});
        }
      } catch (error) {
        console.log(error);
        error = checkError(error);
        throw new Error(error.custom_message);
      }
    },
    updateUser: async (root, args, { id }) => {
      checkToken(id);
      try {
        const user = await User.findById({ _id: args.id });
        if (user) {
          // Check Validation
          const errors = validate("updateUser", args);
          if (!isEmpty(errors)) {
            throw putError(errors);
          }

          if (!isEmpty(args.password)) {
            user.password = await bcrypt.hash(args.password, 10);
          }

          if (args.updatedImage) {
            let imgObject = await imageUpload(
              args.updatedImage,
              "/assets/images/user/"
            );

            if (imgObject.success === false) {
              throw putError(imgObject.message);
            } else {
              imageUnlink(user.image);
              user.image = imgObject.data;
            }
          }

          user.name = args.name;
          user.email = args.email;
          user.role = args.role;
          user.updated = Date.now();
          let metArra = {};

          for (let i in args.meta) {
            metArra[args.meta[i].key] = args.meta[i];
          }

          for (let i in user.meta) {
            if (metArra[user.meta[i].key]) {
              user.meta[i].value = metArra[user.meta[i].key].value;
              delete metArra[user.meta[i].key];
            }
          }

          if (Object.keys(metArra).length) {
            for (let i in metArra) {
              user.meta.unshift(metArra[i]);
            }
          }

          await user.save();
          return await User.find({});
        } else {
          throw putError("User not exist");
        }
      } catch (error) {
        error = checkError(error);
        throw new Error(error.custom_message);
      }
    },
    deleteUser: async (root, args, { id }) => {
      checkToken(id);
      try {
        const user = await User.findByIdAndRemove(args.id);
        if (user) {
          //return true;
          imageUnlink(user.image);
          const users = await User.find({});
          return users || [];
        }
        throw putError("User not exist");
      } catch (error) {
        error = checkError(error);
        throw new Error(error.custom_message);
      }
    }
  }
};
