// const { gql } = require("@apollo/server");
module.exports = `
  type Customer {
    id: ID
    firstName: String
    lastName: String
    email: String
    company: String
    phone: String
    password: String
    addressBook: customArray
    date: Date
    updated: Date
    gender: String
  }

  type AddressBook {
    id: ID
    _id: ID
    firstName: String
    lastName: String
    company: String
    phone: String
    addressLine1: String
    addressLine2: String
    city: String
    country: String
    state: String
    pincode: String
    date: Date
    updated: Date
  }

  type customersResponse {
    data: [Customer]
    pagination: paginationInfo
    message: statusSchema
  }
  type CustomersResponse {
    data: [Customer]
    message: statusSchema
  }
  type CustomerById {
    data: Customer
    message: statusSchema
  }
  extend type Query {
    customers_pagination(
      limit: Int
      pageNumber: Int
      search: String
      orderBy: String
      order: String
    ): customersResponse
    customers:  CustomersResponse
    customer(id: ID!): CustomerById
  }

  extend type Mutation {
    addCustomer(
      firstName: String
      lastName: String
      email: String
      company: String
      phone: String
      password: String
    ): statusSchema
    updateCustomer(
      id: ID!
      firstName: String
      lastName: String
      email: String
      company: String
      phone: String
      gender: String
    ): statusSchema
    updateCustomerPassword(
      id: ID!
      oldPassword: String
      newPassword: String
    ): statusSchema
    deleteCustomer(id: ID!): statusSchema
    addAddressBook(
      id: ID!
      firstName: String
      lastName: String
      company: String
      phone: String
      addressLine1: String
      addressLine2: String
      city: String
      country: String
      state: String
      pincode: String
      defaultAddress: Boolean
    ): statusSchema
    updateAddressBook(
      id: ID!
      _id: ID!
      firstName: String
      lastName: String
      company: String
      phone: String
      addressLine1: String
      addressLine2: String
      city: String
      country: String
      state: String
      pincode: String
      defaultAddress: Boolean
    ): statusSchema
    deleteAddressBook(id: ID!, _id: ID!): statusSchema
    resetPassword(
      email: String
      oldPassword: String
      newPassword: String
    ): statusSchema
  }
`;
