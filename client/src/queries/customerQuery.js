import gql from "graphql-tag";
const GET_CUSTOMERS = gql`
  {
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

const GET_CUSTOMER = gql`
  query ($id: ID!) {
    customer(id: $id) {
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
`;

// const ADD_CUSTOMER = gql`
//   mutation(
//     $firstName: String
//     $lastName: String
//     $email: String
//     $company: String
//     $phone: String
//     $password: String
//   ) {
//     addCustomer(
//       firstName: $firstName
//       lastName: $lastName
//       email: $email
//       company: $company
//       phone: $phone
//       password: $password
//     ) {
//       id
//       firstName
//       lastName
//       email
//       company
//       phone
//       addressBook
//       date
//       updated
//     }
//   }
// `;
const ADD_CUSTOMER = gql`
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
    }
  }
`;

// const ADD_ADDRESSBOOK = gql`
//   mutation(
//     $id: ID!
//     $firstName: String
//     $lastName: String
//     $company: String
//     $phone: String
//     $addressLine1: String
//     $addressLine2: String
//     $city: String
//     $country: String
//     $state: String
//     $pincode: String
//     $defaultAddress: Boolean
//   ) {
//     addAddressBook(
//       id: $id
//       firstName: $firstName
//       lastName: $lastName
//       company: $company
//       phone: $phone
//       addressLine1: $addressLine1
//       addressLine2: $addressLine2
//       city: $city
//       country: $country
//       state: $state
//       pincode: $pincode
//       defaultAddress: $defaultAddress
//     ) {
//       id
//       firstName
//       lastName
//       email
//       company
//       phone
//       addressBook
//       date
//       updated
//     }
//   }
// `;
const ADD_ADDRESSBOOK = gql`
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

// const UPDATE_CUSTOMER = gql`
//   mutation(
//     $id: ID!
//     $firstName: String
//     $lastName: String
//     $email: String
//     $company: String
//     $phone: String
//     $password: String
//   ) {
//     updateCustomer(
//       id: $id
//       firstName: $firstName
//       lastName: $lastName
//       email: $email
//       company: $company
//       phone: $phone
//       password: $password
//     ) {
//       id
//       firstName
//       lastName
//       email
//       company
//       phone
//       addressBook
//       date
//       updated
//     }
//   }
// `;
const UPDATE_CUSTOMER = gql`
  mutation (
    $id: ID!
    $firstName: String
    $lastName: String
    $email: String
    $company: String
    $phone: String
    $password: String
  ) {
    updateCustomer(
      id: $id
      firstName: $firstName
      lastName: $lastName
      email: $email
      company: $company
      phone: $phone
      password: $password
    ) {
      message
      success
    }
  }
`;

// const UPDATE_ADDRESSBOOK = gql`
//   mutation(
//     $id: ID!
//     $_id: ID!
//     $firstName: String
//     $lastName: String
//     $company: String
//     $phone: String
//     $addressLine1: String
//     $addressLine2: String
//     $city: String
//     $country: String
//     $state: String
//     $pincode: String
//     $defaultAddress: Boolean
//   ) {
//     updateAddressBook(
//       id: $id
//       _id: $_id
//       firstName: $firstName
//       lastName: $lastName
//       company: $company
//       phone: $phone
//       addressLine1: $addressLine1
//       addressLine2: $addressLine2
//       city: $city
//       country: $country
//       state: $state
//       pincode: $pincode
//       defaultAddress: $defaultAddress
//     ) {
//       id
//       firstName
//       lastName
//       email
//       company
//       phone
//       addressBook
//       date
//       updated
//     }
//   }
// `;
const UPDATE_ADDRESSBOOK = gql`
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

// const DELETE_CUSTOMER = gql`
//   mutation($id: ID!) {
//     deleteCustomer(id: $id) {
//       id
//       firstName
//       lastName
//       email
//       company
//       phone
//       addressBook
//       date
//       updated
//     }
//   }
// `;
const DELETE_CUSTOMER = gql`
  mutation ($id: ID!) {
    deleteCustomer(id: $id) {
      message
      success
    }
  }
`;

// const DELETE_ADDRESSBOOK = gql`
//   mutation($id: ID!, $_id: ID!) {
//     deleteAddressBook(id: $id, _id: $_id) {
//       id
//       firstName
//       lastName
//       email
//       company
//       phone
//       addressBook
//       date
//       updated
//     }
//   }
// `;
const DELETE_ADDRESSBOOK = gql`
  mutation ($id: ID!, $_id: ID!) {
    deleteAddressBook(id: $id, _id: $_id) {
      message
      success
    }
  }
`;

export {
  GET_CUSTOMERS,
  GET_CUSTOMER,
  ADD_CUSTOMER,
  UPDATE_CUSTOMER,
  DELETE_CUSTOMER,
  ADD_ADDRESSBOOK,
  UPDATE_ADDRESSBOOK,
  DELETE_ADDRESSBOOK,
};
