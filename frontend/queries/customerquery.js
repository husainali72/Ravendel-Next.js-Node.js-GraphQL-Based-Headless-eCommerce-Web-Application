import gql from "graphql-tag";

export const ADD_CUSTOMER = gql`
  mutation (
    $firstName: String
    $lastName: String
    $email: String
    $company: String
    $phone: String
    $password: String
  ) {
    addCustomer(
      firstName: $firstName
      lastName: $lastName
      email: $email
      company: $company
      phone: $phone
      password: $password
    ) {
      message
      success
      __typename
    }
  }
`;

export const GET_CUSTOMERS = gql`
  query {
    customers {
      data {
        id
        firstName
        lastName
        email
        company
        phone
        addressBook
        date
        updated
      }
      message {
        message
        success
      }
    }
  }
`;
export const GET_CUSTOMER_QUERY = gql`
  query ($id: ID!) {
    customer(id: $id) {
      data {
        id
        firstName
        lastName
        email
        company
        phone
        addressBook
        date
        updated
      }
    }
  }
`;
export const ADD_ADDRESSBOOK = gql`
  mutation (
    $id: ID!
    $firstName: String
    $lastName: String
    $company: String
    $phone: String
    $addressLine1: String
    $addressLine2: String
    $city: String
    $country: String
    $state: String
    $pincode: String
    $addressType: ADDRESS_TYPE
    $defaultAddress: Boolean
  ) {
    addAddressBook(
      id: $id
      firstName: $firstName
      lastName: $lastName
      company: $company
      phone: $phone
      addressLine1: $addressLine1
      addressLine2: $addressLine2
      city: $city
      country: $country
      state: $state
      pincode: $pincode
      addressType: $addressType
      defaultAddress: $defaultAddress
    ) {
      message
      success
      data
    }
  }
`;

export const UPDATE_CUSTOMER = gql`
  mutation (
    $id: ID!
    $firstName: String
    $lastName: String
    $email: String
    $company: String
    $phone: String
  ) {
    updateCustomer(
      id: $id
      firstName: $firstName
      lastName: $lastName
      email: $email
      company: $company
      phone: $phone
    ) {
      message
      success
    }
  }
`;

export const UPDATE_ADDRESSBOOK = gql`
  mutation (
    $id: ID!
    $_id: ID!
    $firstName: String
    $lastName: String
    $company: String
    $phone: String
    $addressLine1: String
    $addressLine2: String
    $city: String
    $country: String
    $state: String
    $pincode: String
    $addressType: ADDRESS_TYPE
    $defaultAddress: Boolean
  ) {
    updateAddressBook(
      id: $id
      _id: $_id
      firstName: $firstName
      lastName: $lastName
      company: $company
      phone: $phone
      addressLine1: $addressLine1
      addressLine2: $addressLine2
      city: $city
      country: $country
      state: $state
      pincode: $pincode
      addressType: $addressType
      defaultAddress: $defaultAddress
    ) {
      message
      success
    }
  }
`;

export const DELETE_ADDRESSBOOK = gql`
  mutation ($id: ID!, $_id: ID!) {
    deleteAddressBook(id: $id, _id: $_id) {
      message
      success
    }
  }
`;
export const RESET_PASSWORD = gql`
  mutation ($email: String, $oldPassword: String, $newPassword: String) {
    resetPassword(
      email: $email
      oldPassword: $oldPassword
      newPassword: $newPassword
    ) {
      message
      success
    }
  }
`;

export const GET_ORDER_BY_CUSTOMER = gql`
  query ($id: ID!) {
    cartbyUser(userId: $id) {
      date
      id
      products
      status
      total
      updated
      userId
    }
  }
`;
