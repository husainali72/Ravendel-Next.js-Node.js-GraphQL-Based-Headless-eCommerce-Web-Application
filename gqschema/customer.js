const { gql } = require("apollo-server-express");
module.exports = gql`
  type Customer {
    id: ID
    first_name: String
    last_name: String
    email: String
    company: String
    phone: String
    password: String
    address_book: customArray
    date: Date
    updated: Date
  }

  type AddressBook {
    id: ID
    _id: ID
    first_name: String
    last_name: String
    company: String
    phone: String
    address_line1: String
    address_line2: String
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
  type Customers_response {
    data: [Customer]
    message: statusSchema
  }
  type Customer_By_Id {
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
    customers:  Customers_response
    customer(id: ID!): Customer_By_Id
  }

  extend type Mutation {
    addCustomer(
      first_name: String
      last_name: String
      email: String
      company: String
      phone: String
      password: String
    ): statusSchema
    updateCustomer(
      id: ID!
      first_name: String
      last_name: String
      email: String
      company: String
      phone: String
      password: String
    ): statusSchema
    deleteCustomer(id: ID!): statusSchema
    addAddressBook(
      id: ID!
      first_name: String
      last_name: String
      company: String
      phone: String
      address_line1: String
      address_line2: String
      city: String
      country: String
      state: String
      pincode: String
      default_address: Boolean
    ): statusSchema
    updateAddressBook(
      id: ID!
      _id: ID!
      first_name: String
      last_name: String
      company: String
      phone: String
      address_line1: String
      address_line2: String
      city: String
      country: String
      state: String
      pincode: String
      default_address: Boolean
    ): statusSchema
    deleteAddressBook(id: ID!, _id: ID!): statusSchema
  }
`;
