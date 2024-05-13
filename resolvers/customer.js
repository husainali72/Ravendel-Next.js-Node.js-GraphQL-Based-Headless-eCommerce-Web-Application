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
      var searchInFields = { firstName: { $regex: `${search}`, $options: "i" } };

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
        firstName: args.firstName,
        lastName: args.lastName,
        email: args.email,
        company: args.company || "",
        phone: args.phone || "",
        password: args.password,
      };
      let validation = ["firstName", "lastName", "email", "password"];
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
        firstName: args.firstName,
        lastName: args.lastName,
        email: args.email,
        gender: args.gender,
        company: args.company || "",
        phone: args.phone || "",
        updated: Date.now(),
      };
      let validation = ["firstName", "lastName", "email"];
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
        return MESSAGE_RESPONSE("TOKEN_REQ", "Address", false);
      }
      try {
        const errors = _validate(
          [
            "firstName",
            "lastName",
            "addressLine1",
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
          return MESSAGE_RESPONSE("NOT_EXIST", "Address", false);
        }

        if (args.defaultAddress) {
          for (let i in customer.addressBook) {
            if (customer.addressBook[i].defaultAddress) {
              customer.addressBook[i].defaultAddress = false;
            }
          }
        }
        delete args.id;
        customer.addressBook.push(args);
        customer.updated = Date.now();
        await customer.save();
        return MESSAGE_RESPONSE("AddSuccess", "Address", true);
      } catch (error) {
        error = checkError(error);
        return MESSAGE_RESPONSE("CREATE_ERROR", "Address", false);
      }
    },
    updateAddressBook: async (root, args, { id }) => {
      if (!id) {
        return MESSAGE_RESPONSE("TOKEN_REQ", "Address", false);
      }
      try {
        const errors = _validate(
          [
            "firstName",
            "lastName",
            "addressLine1",
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
        if(!customer.addressBook.length > 0){
          return MESSAGE_RESPONSE("NOT_EXIST", "Address", false);
        }
        customer.addressBook = customer.addressBook.map((address) => {
          if (args.defaultAddress) {
            address.defaultAddress = false;
          }
          if (address._id == args._id) {
            address = args;
          }
          return address;
        });

        customer.updated = Date.now();
        await customer.save();
        return MESSAGE_RESPONSE("UpdateSuccess", "Address", true);
      } catch (error) {
        return MESSAGE_RESPONSE("UPDATE_ERROR", "Address", false);
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
//           let addressbook = customer.addressBook
         
  
//           if (!args._id) {
//             return MESSAGE_RESPONSE("ID_ERROR", "customer", false);
//           }
//           let ids  = args._id;
//           let filteraddressbook = addressbook.filter((e)=> {  e._id == ids  })

//           if(!filteraddressbook.length){
//             return MESSAGE_RESPONSE("NOT_EXIST", "addressBook", false);
//           }
       
//           const addressBook = await Customer.updateOne(
//             { _id: customerID },
//             {
//               $pull: { addressBook: { _id: { $in: ids } } },
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

        var customer_addressBook = customer.addressBook;

        for (let i in customer_addressBook) {
          if (customer_addressBook[i]._id == args._id) {
            customer.addressBook = [];
            delete customer_addressBook[i];
            customer.addressBook = customer_addressBook;
            break;
          }
        }
        await customer.save();
        return MESSAGE_RESPONSE("DeleteSuccess", "Address", true);
      },
    resetPassword: async (root, args, { id }) => {
      const bcrypt = require("bcryptjs");
      const pattern = /^(?=.*?[A-Za-z])(?=.*?[0-9]).{8,}$/;

      const customer = await Customer.findOne({ email: args.email });
      if (!customer) {
        return MESSAGE_RESPONSE("NOT_FOUND", "User", false);
      }

      let match = await bcrypt.compare(args.oldPassword, customer.password);

      if (match) {
        let isValid = pattern.test(args.newPassword);
        if (isValid) {
          customer.password = await bcrypt.hash(args.newPassword, 10);
          await customer.save();
        } else {
          return MESSAGE_RESPONSE("InvalidPassword", null, false);
        }
      } else {
        return MESSAGE_RESPONSE("InvalidOldPassword", null, false);
      }

      return MESSAGE_RESPONSE("UpdateSuccess", "Password", true);
    },
  },
};
