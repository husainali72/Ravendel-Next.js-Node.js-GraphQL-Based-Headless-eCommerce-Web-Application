const User = require("../models/User");
const Product = require("../models/Product");
const Customer = require("../models/Customer");
const Order = require("../models/Order");
const {
  isEmpty,
  putError,
  checkError,
  imageUpload,
  imageUnlink,
  checkToken,
  MESSAGE_RESPONSE,
  _validate,
  checkRole,
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
const bcrypt = require("bcryptjs");

const fs = require("fs");
const {checkAwsFolder} = require("../config/aws");

var udir = "./assets/images/user";
var ldir = "./assets/images/user/large";
var mdir = "./assets/images/user/medium";
var tdir = "./assets/images/user/thumbnail";
var odir = "./assets/images/user/original";

if (!fs.existsSync(udir)) {
  fs.mkdirSync(udir);
}
if (!fs.existsSync(ldir)) {
  fs.mkdirSync(ldir);
}
if (!fs.existsSync(mdir)) {
  fs.mkdirSync(mdir);
}
if (!fs.existsSync(odir)) {
  fs.mkdirSync(odir);
}
if (!fs.existsSync(tdir)) {
  fs.mkdirSync(tdir);
}

module.exports = {
  Query: {
    users: async (root, args) => {
      return await GET_ALL_FUNC(User, "Users");
    },
    users_pagination: async (
      root,
      { limit, pageNumber, search, orderBy, order }
    ) => {
      var searchInFields = {
        $or: [
          { name: { $regex: search, $options: "i" } },
          { role: { $regex: search, $options: "i" } },
          { email: { $regex: search, $options: "i" } },
        ],
      };
      return await GET_BY_PAGINATIONS(
        limit,
        pageNumber,
        orderBy,
        order,
        searchInFields,
        User,
        "Users"
      );
    },
    user: async (root, args) => {
      return await GET_SINGLE_FUNC(args.id, User, "User");
    },
    //check it..........................
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
    dashboardData: async (root, args) => {
      try {
        const dashboardData = {}
        let totalSales = 0;
        dashboardData.productCount = await Product.countDocuments({
          status: "Publish",
        });
        dashboardData.userCount = await User.countDocuments({});
        dashboardData.customerCount = await Customer.countDocuments({});
        dashboardData.latestProducts = await Product.find({})
          .sort({ date: "desc" })
          .limit(2);
        let existingOrderSales = await Order.find({})
        existingOrderSales = existingOrderSales.map(orderSale=>{
          totalSales += orderSale.grand_total
        })
        dashboardData.totalSales = totalSales
        return dashboardData
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
    },
  },
  Mutation: {
    addUser: async (root, args, { id }) => {
      await checkAwsFolder('user');
      let path = "/assets/images/user/";
      let data = {
        name: args.name,
        email: args.email,
        password: args.password,
        role: args.role,
        image: args.image,
      };
      let validation = ["name", "email", "role", "password"];
      return await CREATE_FUNC(id, "User", User, data, args, path, validation);
    },
    updateUser: async (root, args, { id }) => {
      await checkAwsFolder('user');
      console.log('ARGS',args);
      if (!id) {
        return MESSAGE_RESPONSE("TOKEN_REQ", "User", false);
      }
      if (!args.id) {
        return MESSAGE_RESPONSE("ID_ERROR", "User", false);
      }
      try {
        const result = await duplicateData({email: args.email}, User, args.id)
        if(!result) return MESSAGE_RESPONSE("DUPLICATE", "User", false);

        if(args.role){
          const result = checkRole(args.role)
          if(result.success) args.role = result.role
          else return MESSAGE_RESPONSE("InvalidRole", "User", false);
        }
        const user = await User.findById({ _id: args.id });
        if (user) {
          const errors = _validate(["name", "email", "role"], args);
          if (!isEmpty(errors)) {
            return {
              message: errors,
              success: false,
            };
          }

          if (!isEmpty(args.password)) {
            user.password = await bcrypt.hash(args.password, 10);
          }

          if (args.updatedImage) {
           //  console.log('wewewewewew',args.updatedImage);
            let imgObject = await imageUpload(
              args.updatedImage.file,
              "/assets/images/user/",'User'
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
        //  console.log('USERDATA',user);
          await user.save();
          return MESSAGE_RESPONSE("UpdateSuccess", "User", true);
        } else {
          return MESSAGE_RESPONSE("NOT_EXIST", "User", false);
        }
      } catch (error) {
        return MESSAGE_RESPONSE("UPDATE_ERROR", "User", false);
      }
    },
    deleteUser: async (root, args, { id }) => {
      return await DELETE_FUNC(id, args.id, User, "User");
    },
  },
};
