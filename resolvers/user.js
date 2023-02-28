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
  duplicateData,
  populateYearMonth,
  populateSales
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
const moment = require('moment')
const {checkAwsFolder} = require("../config/aws");
const roleOptions = ["USER", "AUTHOR", "SUBSCRIBER", "MANAGER", "EDITOR"]
const fs = require("fs");

var udir = "./assets/images/user";
// var ldir = "./assets/images/user/large";
// var mdir = "./assets/images/user/medium";
// var tdir = "./assets/images/user/thumbnail";
// var odir = "./assets/images/user/original";

if (!fs.existsSync(udir)) {
  fs.mkdirSync(udir);
}
// if (!fs.existsSync(ldir)) {
//   fs.mkdirSync(ldir);
// }
// if (!fs.existsSync(mdir)) {
//   fs.mkdirSync(mdir);
// }
// if (!fs.existsSync(odir)) {
//   fs.mkdirSync(odir);
// }
// if (!fs.existsSync(tdir)) {
//   fs.mkdirSync(tdir);
// }

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
        // calculate total sales
        let totalSales = 0;
        const ordersByYearMonth = []
        const existingOrders = await Order.find({})
        if(existingOrders.length){
          existingOrders.map(orderSale=>{
            totalSales += orderSale.grand_total
          })
          // orders and sales by year and month
          for(let order of existingOrders){
            let paymentSuccessSubTotal = order.payment_status !== "success" ? 0 : order.subtotal
            let paymentSuccessGrandTotal = order.payment_status !== "success" ? 0 : order.grand_total
            let orderMonth = order.date.getMonth()
            let orderYear = order.date.getFullYear()
            // if year array is empty add new year with month
            if(!ordersByYearMonth.length){
              let populateYear = populateYearMonth(order, orderYear, orderMonth, paymentSuccessSubTotal, paymentSuccessGrandTotal, true)
              ordersByYearMonth.push(populateYear)
            }
            // else add data in existing year array
            else{
              // find existing year
              let existingYear = ordersByYearMonth.find(year=>(year.year === orderYear) ? year : false)
              // if existing year and order year matches then
              if(existingYear){
                // find existing month
                let existingMonth = existingYear.months.find(month=>(month.month === moment(orderMonth+1, "MM").format("MMM")) ? month : false)
                // if existing month and order month matches then add order in that month
                if(existingMonth){
                  existingMonth.orders.push(order)
                  // set sales figure in month
                  populateSales(existingMonth, order, paymentSuccessSubTotal, paymentSuccessGrandTotal)
                }
                // else add new month
                else{
                  let populateMonth = populateYearMonth(order, orderYear, orderMonth, paymentSuccessSubTotal, paymentSuccessGrandTotal, false)
                  existingYear.months.push(populateMonth)
                }
                // set sales figure in year
                populateSales(existingYear, order, paymentSuccessSubTotal, paymentSuccessGrandTotal)
              }
              // else add new year with month
              else{
                let populateYear = populateYearMonth(order, orderYear, orderMonth, paymentSuccessSubTotal, paymentSuccessGrandTotal, true)
                ordersByYearMonth.push(populateYear)
              }
            }
          }
          // sort year and months if two or more years exist
          if(ordersByYearMonth.length > 1)
            ordersByYearMonth.sort((year1, year2)=>{
              year1.months.sort((month1, month2)=>{
                // sort months in ascending order - jan, feb, mar...
                return moment().month(month1.month).format("M") - moment().month(month2.month).format("M")
              })
              year2.months.sort((month1, month2)=>{
                // sort months in ascending order - jan, feb, mar...
                return moment().month(month1.month).format("M") - moment().month(month2.month).format("M")
              })
              // sort years in decsending order - 2023, 2022, 2021...
              return Number.parseInt(year2.year) - Number.parseInt(year1.year)
            })
          // sort only months when only one year exist
          else 
            ordersByYearMonth[0].months.sort((month1, month2)=>{
              // sort months in ascending order - jan, feb, mar...
              return moment().month(month1.month).format("M") - moment().month(month2.month).format("M")
            })
        }
        // insert values to dashboard object
        const dashboardData = {}
        dashboardData.productCount = await Product.countDocuments({status: "Publish"});
        dashboardData.userCount = await User.countDocuments({});
        dashboardData.customerCount = await Customer.countDocuments({});
        dashboardData.latestProducts = await Product.find({}).sort({ date: "desc" }).limit(2);
        dashboardData.latestOrders = existingOrders ? existingOrders.reverse().splice(0, 2) : []
        dashboardData.totalSales = totalSales
        dashboardData.ordersByYearMonth = ordersByYearMonth
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
      const duplicate = await duplicateData({email: args.email}, User)
        if(duplicate) return MESSAGE_RESPONSE("DUPLICATE", "User", false);
      const result = checkRole(args.role, roleOptions)
      if(result.success) args.role = result.role
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
      // console.log('ARGS',args);
      if (!id) {
        return MESSAGE_RESPONSE("TOKEN_REQ", "User", false);
      }
      if (!args.id) {
        return MESSAGE_RESPONSE("ID_ERROR", "User", false);
      }
      try {
        const duplicate = await duplicateData({email: args.email}, User, args.id)
        if(duplicate) return MESSAGE_RESPONSE("DUPLICATE", "User", false);

        if(args.role){
          const result = checkRole(args.role, roleOptions)
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
            let imgObject = await imageUpload(
              args.updatedImage.file,
              "/assets/images/user/",'User'
            );
            user.image = imgObject.data;
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
