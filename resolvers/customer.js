const Customer = require("../models/Customer");
const {
  isEmpty,
  putError,
  checkError,
  imageUpload,
  imageUnlink,
  checkToken,
} = require("../config/helpers");
const validate = require("../validations/customer");
const bcrypt = require("bcryptjs");
const errorRES = require("../error");

module.exports = {
  Query: {
    customers: async (root, args) => {
      try {
        const customers = await Customer.find({});
        return customers || [];
      } catch (error) {
        throw new Error("Something went wrong.");
      }
    },
    // get all customers with pagination ........................

    customers_pagination: async (
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
      ] = await Customer.aggregate([
        {
          $match: { first_name: { $regex: search, $options: "i" } },
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
      if (!edges.length) {
        return {
          pagination: { totalCount: total, page: pageNumber },
          data: edges,
          message: { message:  `${errorRES.RETRIEVE_ERROR} Customers`, status: 200 },
        };
      } else {
        return {
          pagination: { totalCount: total, page: pageNumber },
          data: edges,
          message: { message: "Customers list fetched", status: 200 },
        };
      }
    },
    customer: async (root, args) => {
      try {
        const customer = await Customer.findById(args.id);
        if (!customer) {
          throw putError("User not found");
        }
        return customer;
      } catch (error) {
        error = checkError(error);
        throw new Error(error.custom_message);
      }
    },
  },
  Mutation: {
    addCustomer: async (root, args, { id }) => {
      checkToken(id);
      try {
        // Check Validation
        const errors = validate("addCustomer", args);
        if (!isEmpty(errors)) {
          throw putError(errors);
        }

        const customer = await Customer.findOne({ email: args.email });

        if (customer) {
          throw putError("Email already exist.");
        } else {
          const newCustomer = new Customer({
            first_name: args.first_name,
            last_name: args.last_name,
            email: args.email,
            company: args.company || "",
            phone: args.phone || "",
          });

          newCustomer.password = await bcrypt.hash(args.password, 10);
          const user = await newCustomer.save();
          //return user;
          //return await Customer.find({});
          return { message: "Customer saved successfully", status: 200 };
        }
      } catch (error) {
        error = checkError(error);
        return { message: `${errorRES.CREATE_ERROR} Customers`, status: 400 };
      }
    },
    updateCustomer: async (root, args, { id }) => {
      checkToken(id);
      try {
        const customer = await Customer.findById({ _id: args.id });
        if (customer) {
          // Check Validation
          const errors = validate("updateCustomer", args);
          if (!isEmpty(errors)) {
            throw putError(errors);
          }

          if (!isEmpty(args.password)) {
            customer.password = await bcrypt.hash(args.password, 10);
          }

          customer.first_name = args.first_name;
          customer.last_name = args.last_name;
          customer.email = args.email;
          customer.company = args.company;
          customer.phone = args.phone;
          //customer.address_book = args.address_book;
          customer.updated = Date.now();

          await customer.save();
          //return await Customer.find({});
          return { message: "Customer updated successfully", status: 200 };
        } else {
          return { message: "Customer not exist", status: 404 };
        }
      } catch (error) {
        error = checkError(error);
        return { message:  `${errorRES.UPDATE_ERROR} Customers`, status: 400 };
      }
    },
    deleteCustomer: async (root, args, { id }) => {
      checkToken(id);
      try {
        const customer = await Customer.findByIdAndRemove(args.id);
        if (customer) {
          // const customers = await Customer.find({});
          // return customers || [];
          return { message: "customer deleted successfully", status: 200 };
        }
        throw putError("customer not exist");
      } catch (error) {
        error = checkError(error);
        return { message: `${errorRES.DELETE_ERROR} Customers`, status: 404 };
      }
    },
    addAddressBook: async (root, args, { id }) => {
      checkToken(id);
      try {
        // Check Validation
        const errors = validate("addAddressBook", args);
        if (!isEmpty(errors)) {
          throw putError(errors);
        }

        const customer = await Customer.findById({ _id: args.id });

        if (!customer) {
          throw putError("Something went wrong.");
        }

        if (args.default_address) {
          for (let i in customer.address_book) {
            if (customer.address_book[i].default_address) {
              customer.address_book[i].default_address = false;
            }
          }
        }

        delete args.id;
        customer.address_book.push(args);
        customer.updated = Date.now();

        await customer.save();
        //return await Customer.find({});
        return { message: "AddressBook saved successfully", status: 200 };
      } catch (error) {
        error = checkError(error);
        return { message: `${errorRES.CREATE_ERROR} AddressBook `, status: 400 };
      }
    },
    updateAddressBook: async (root, args, { id }) => {
      checkToken(id);
      try {
        // Check Validation
        const errors = validate("updateAddressBook", args);
        if (!isEmpty(errors)) {
          throw putError(errors);
        }

        const customer = await Customer.findById({ _id: args.id });

        if (!customer) {
          throw putError("Something went wrong.");
        }
        console.log("here comes", args.default_address);
        delete args.id;
        customer.address_book = customer.address_book.map((address) => {
          if (args.default_address) {
            address.default_address = false;
          }

          if (address._id == args._id) {
            address = args;
          }
          return address;
        });

        customer.updated = Date.now();
        await customer.save();
        //return await Customer.find({});
        return { message: "AddressBook updated successfully", status: 200 };
      } catch (error) {
        error = checkError(error);
        return { message: `${errorRES.UPDATE_ERROR} AddressBook`, status: 400 };
      }
    },
    deleteAddressBook: async (root, args, { id }) => {
      checkToken(id);
      try {
        const customer = await Customer.findById({ _id: args.id });

        if (!customer) {
          throw putError("Something went wrong.");
        }

        var customer_address_book = customer.address_book;

        for (let i in customer_address_book) {
          if (customer_address_book[i]._id == args._id) {
            customer.address_book = [];
            delete customer_address_book[i];
            customer.address_book = customer_address_book;
            break;
          }
        }

        await customer.save();
       // return await Customer.find({});
       return { message: "AddressBook deleted successfully", status: 200 };
      } catch (error) {
        error = checkError(error);
        return { message: `${errorRES.DELETE_ERROR} AddressBook`, status: 404 };
      }
    },
  },
};
