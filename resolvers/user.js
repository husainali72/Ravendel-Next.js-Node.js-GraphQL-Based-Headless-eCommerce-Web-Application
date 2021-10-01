const User = require("../models/User");
const {
  isEmpty,
  putError,
  checkError,
  imageUpload,
  imageUnlink,
  checkToken,
} = require("../config/helpers");
const validate = require("../validations/user");
const bcrypt = require("bcryptjs");

const fs = require("fs");

var udir = './assets/images/user';
var ldir = './assets/images/user/large';
var mdir = './assets/images/user/medium';
var tdir = './assets/images/user/thumbnail';
var odir = './assets/images/user/original';

if (!fs.existsSync(udir)){
  fs.mkdirSync(udir);
}
if (!fs.existsSync(ldir)){
  fs.mkdirSync(ldir);
}
if (!fs.existsSync(mdir)){
  fs.mkdirSync(mdir);
}
if (!fs.existsSync(odir)){
  fs.mkdirSync(odir);
}
if (!fs.existsSync(tdir)){
  fs.mkdirSync(tdir);
}

module.exports = {
  Query: {
    users: async (root, args) => {
      try {
        const users = await User.find({});
        return users || [];
      } catch (error) {
        throw new Error("Something went wrong.");
      }n
    },

    // get all users with pagination.....................

    users_pagination: async (
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
      ] = await User.aggregate([
        {
          $match: {
            $or: [
              { name: { $regex: search, $options: "i" } },
              { role: { $regex: search, $options: "i" } },
              { email: { $regex: search, $options: "i" } },
            ],
          },
        },
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
      if(!edges.length){
        return {
          pagination: { totalCount: total, page: pageNumber },
          data: edges,
          message: {message: `${errorRES.RETRIEVE_ERROR} Users`, status: 200}
        };
      } else {
        return {
          pagination: { totalCount: total, page: pageNumber },
          data: edges,
          message: {message: 'Page List', status: 200}
        };
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
          "meta.value": args.value,
        });
        if (!user) {
          throw putError("User not found");
        }
        return user;
      } catch (error) {
        error = checkError(error);
        throw new Error(error.custom_message);
      }
    },
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
    },
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
            console.log(args.image);

            imgObject = await imageUpload(args.image.file, "/assets/images/user/");
            if (imgObject.success === false) {
              throw putError(imgObject.message);
            }
          }
          const newUser = new User({
            name: args.name,
            email: args.email,
            password: args.password,
            role: args.role,
            image: imgObject.data || imgObject,
          });

          newUser.password = await bcrypt.hash(args.password, 10);
          const user = await newUser.save();
          //return user;
         // return await User.find({});
         return  {message: 'user saved successfully', status: 200}
        }
      } catch (error) {
        console.log(error);
        error = checkError(error);
        return  {message: `${errorRES.CREATE_ERROR} Users`, status: 400}
      }
    },
    updateUser: async (root, args, { id }) => {

      //console.log(args);
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
           // console.log(args.updatedImage);
            let imgObject = await imageUpload(
              args.updatedImage.file,
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
         // return await User.find({});
         return  {message: 'user update successfully', status: 200}
        } else {
          throw putError("User not exist");
        }
      } catch (error) {
        error = checkError(error);
        return  {message:`${errorRES.UPDATE_ERROR} User`, status: 400}
      }
    },
    deleteUser: async (root, args, { id }) => {
      checkToken(id);
      try {
        const user = await User.findByIdAndRemove(args.id);
        if (user) {
          //return true;
          imageUnlink(user.image);
          // const users = await User.find({});
          // return users || [];
          return  {message: 'user deleted successfully', status: 200}
        }
        throw putError("User not exist");
      } catch (error) {
        error = checkError(error);
        return  {message: `${errorRES.DELETE_ERROR} User`, status: 400}
      }
    },
  },
};
