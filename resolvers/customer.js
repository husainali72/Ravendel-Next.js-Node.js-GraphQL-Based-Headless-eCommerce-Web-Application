const Customer = require("../models/Customer");
const {
  isEmpty,
  putError,
  checkError,
  checkToken,
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

module.exports = {
  Query: {
    customers: async (root, args) => {
      return await GET_ALL_FUNC(Customer, "Customers");
    },
    customers_pagination: async (
      root,
      { limit, pageNumber, search, orderBy, order }
    ) => {
      var searchInFields = { first_name: { $regex: search, $options: "i" } };

      return await GET_BY_PAGINATIONS(
        limit,
        pageNumber,
        orderBy,
        order,
        searchInFields,
        Customer, 
       "Customers"
      );
    },
    customer: async (root, args) => {
      return await GET_SINGLE_FUNC(args.id, Customer, "Customers");
    },
  },
  Mutation: {
    addCustomer: async (root, args, { id }) => {
          let data = {
            first_name: args.first_name,
            last_name: args.last_name,
            email: args.email,
            company: args.company || "",
            phone: args.phone || "",
            password : args.password
          } 
          let validation = ["first_name","last_name","email","password"];
          return await CREATE_FUNC(
            id,
            "Customer",
            Customer,
            data,
            args,
            '',
            validation
          );
    },
    updateCustomer: async (root, args, { id }) => {
      let data = {
        first_name: args.first_name,
        last_name: args.last_name,
        email: args.email,
        company: args.company || "",
        phone: args.phone || "",
        password : args.password,
        updated : Date.now()
      } 
      let validation = ["first_name","last_name","email","password"];
      return await UPDATE_FUNC(
        id,
        args.id,
        Customer,
        "Customer",
        data,
         '',
        args,
        validation
      );
             
    },
    deleteCustomer: async (root, args, { id }) => {
      return await DELETE_FUNC(id, args.id, Customer, "Customers");
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
        return { message: "AddressBook saved successfully", success: true };
      } catch (error) {
        error = checkError(error);
        return { message: `${Messages.CREATE_ERROR} AddressBook `, success: false };
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
        return { message: "AddressBook updated successfully", success: true };
      } catch (error) {
        error = checkError(error);
        return { message: `${Messages.UPDATE_ERROR} AddressBook`, success: false };
      }
    },
    deleteAddressBook: async (root, args, { id }) => {
      return await DELETE_FUNC(id, args.id, Customer, "AddressBook");
    }
  },
};
