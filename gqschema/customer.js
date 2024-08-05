// const { gql } = require("@apollo/server");
module.exports = `

  enum DEVICE_TYPE {
    ANDROID
    IOS
  }

  type DEVICE_INFO {
    device_id: String
    device_type: DEVICE_TYPE
    app_version: String
  }
  
  input DEVICE_INFO_INPUT {
    device_id: String
    device_type: DEVICE_TYPE
    app_version: String
  }

  type Customer {
    id: ID
    firstName: String
    lastName: String
    email: String
    company: String
    phone: String
    password: String
    addressBook: customArray
    device_info: DEVICE_INFO
    date: Date
    updated: Date
    gender: String
  }

  enum ADDRESS_TYPE {
    Home
    Office
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
    addressType: ADDRESS_TYPE
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

  type registerSchema {
    success: Boolean
    message: String
    token: String
  }

  extend type Mutation {
    addCustomer(
      firstName: String
      lastName: String
      email: String
      company: String
      phone: String
      password: String
    ): registerSchema
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
      addressType: ADDRESS_TYPE
      city: String
      country: String
      state: String
      pincode: String
      defaultAddress: Boolean
    ): statusDataSchema
    updateAddressBook(
      id: ID!
      _id: ID!
      firstName: String
      lastName: String
      company: String
      phone: String
      addressLine1: String
      addressLine2: String
      addressType: ADDRESS_TYPE
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
    sendForgetPasswordEmail(
      email: String
    ): statusSchema
    verifyForgetPasswordToken(
      token: String
      newPassword: String
    ): statusSchema
    updateCustomerDeviceInfo(
      device_info: DEVICE_INFO_INPUT
    ): statusSchema
  }
`;
