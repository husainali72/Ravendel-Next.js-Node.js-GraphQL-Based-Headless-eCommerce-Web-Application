const Customer = require("../models/Customer");
const {
  isEmpty,
  checkError,
  MESSAGE_RESPONSE,
  _validate,
  duplicateData
} = require("../config/helpers");
const {
  DELETE_FUNC,
  GET_BY_PAGINATIONS,
  GET_SINGLE_FUNC,
  GET_ALL_FUNC,
  CREATE_FUNC,
  UPDATE_FUNC,
  UPDATE_PASSWORD_FUNC,
} = require("../config/api_functions");

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
        ///////////////////////////////
        queryName: "addCustomer",
        ///////////////////////////////
        first_name: args.first_name,
        last_name: args.last_name,
        email: args.email,
        company: args.company || "",
        phone: args.phone || "",
        password: args.password,
      };
      let validation = ["first_name", "last_name", "email", "password"];
      const duplicate = await duplicateData({email: args.email}, Customer)
      if(duplicate) return MESSAGE_RESPONSE("DUPLICATE", "Customer", false);
      return await CREATE_FUNC(
        id,
        "Customer",
        Customer,
        data,
        args,
        "",
        validation
      );
    },
    updateCustomer: async (root, args, { id }) => {
      let data = {
        first_name: args.first_name,
        last_name: args.last_name,
        email: args.email,
        gender: args.gender,
        company: args.company || "",
        phone: args.phone || "",
        updated: Date.now(),
      };
      let validation = ["first_name", "last_name", "email"];
      const duplicate = await duplicateData({email: args.email}, Customer, args.id)
      if(duplicate) return MESSAGE_RESPONSE("DUPLICATE", "Customer", false);
      return await UPDATE_FUNC(
        id,
        args.id,
        Customer,
        "Customer",
        data,
        "",
        args,
        validation
      );
    },
    updateCustomerPassword: async (root, args, { id })=>{
      let data = {
        oldPassword: args.oldPassword,
        newPassword: args.newPassword,
      };
      let validation = ["oldPassword", "newPassword"];
      return await UPDATE_PASSWORD_FUNC(
        id,
        args.id,
        Customer,
        "Customer",
        data,
        validation
      )
    },
    deleteCustomer: async (root, args, { id }) => {
      return await DELETE_FUNC(id, args.id, Customer, "Customers");
    },
    addAddressBook: async (root, args, { id }) => {
      if (!id) {
        return MESSAGE_RESPONSE("TOKEN_REQ", "addAddressBook", false);
      }
      try {
        const errors = _validate(
          [
            "first_name",
            "last_name",
            "address_line1",
            "pincode",
            "city",
            "country",
          ],
          args
        );
        if (!isEmpty(errors)) {
          return {
            message: errors,
            success: false,
          };
        }
        const customer = await Customer.findById({ _id: args.id });
        if (!customer) {
          return MESSAGE_RESPONSE("NOT_EXIST", "addAddressBook", false);
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
        return MESSAGE_RESPONSE("AddSuccess", "addAddressBook", true);
      } catch (error) {
        error = checkError(error);
        return MESSAGE_RESPONSE("CREATE_ERROR", "addAddressBook", false);
      }
    },
    updateAddressBook: async (root, args, { id }) => {
      if (!id) {
        return MESSAGE_RESPONSE("TOKEN_REQ", "addAddressBook", false);
      }
      try {
        const errors = _validate(
          [
            "first_name",
            "last_name",
            "address_line1",
            "pincode",
            "city",
            "country",
          ],
          args
        );
        if (!isEmpty(errors)) {
          return {
            message: errors,
            success: false,
          };
        }
        const customer = await Customer.findById({ _id: args.id });
        if (!customer) {
          return MESSAGE_RESPONSE("NOT_EXIST", "Customer", false);
        }
        delete args.id;
        if(!customer.address_book.length > 0){
          return MESSAGE_RESPONSE("NOT_EXIST", "addAddressBook", false);
        }
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
        return MESSAGE_RESPONSE("UpdateSuccess", "addAddressBook", true);
      } catch (error) {
        return MESSAGE_RESPONSE("UPDATE_ERROR", "addAddressBook", false);
      }
    },

//     deleteAddressBook: async (root, args, { id ,_id}) => {
//       // return await DELETE_FUNC(id, args.id, Customer, "AddressBook");
//       if (!id) {
//         return MESSAGE_RESPONSE("TOKEN_REQ", "addressBook", false);
//       }
//       if (!args.id) {
//         return MESSAGE_RESPONSE("ID_ERROR", "Customer", false);
//       }
//       try {
//         const customer = await Customer.findById({ _id: args.id });
//         if (!customer) {
//           return MESSAGE_RESPONSE("NOT_EXIST", "addressBook", false);
//         }
//         if (customer) {
//           let customerID = customer._id
//           let addressbook = customer.address_book
         
  
//           if (!args._id) {
//             return MESSAGE_RESPONSE("ID_ERROR", "customer", false);
//           }
//           let ids  = args._id;
//           let filteraddressbook = addressbook.filter((e)=> {  e._id == ids  })

//           if(!filteraddressbook.length){
//             return MESSAGE_RESPONSE("NOT_EXIST", "addressBook", false);
//           }
       
//           const address_Book = await Customer.updateOne(
//             { _id: customerID },
//             {
//               $pull: { address_book: { _id: { $in: ids } } },
//             });

//           return MESSAGE_RESPONSE("DELETE", "addressBook", true);
//         }
       
//       } catch (error) {
//         return MESSAGE_RESPONSE("DELETE_ERROR", "addressBook", false);
//       }

    deleteAddressBook: async (root, args, { id }) => {
      //return await DELETE_FUNC(id, args.id, Customer, "AddressBook");
      const customer = await Customer.findById({ _id: args.id });
        if (!customer) {
          //throw putError("Something went wrong.");
          return MESSAGE_RESPONSE("NOT_EXIST", "Customer", false);
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
        return MESSAGE_RESPONSE("DeleteSuccess", "addAddressBook", true);

    },
  },
};
