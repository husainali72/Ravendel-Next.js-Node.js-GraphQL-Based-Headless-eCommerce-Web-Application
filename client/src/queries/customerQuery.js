import gql from "graphql-tag";
const GET_CUSTOMERS = gql`
  {
    customers {
      id
      first_name
      last_name
      email
      company
      phone
      address_book
      date
      updated
    }
  }
`;

const GET_CUSTOMER = gql`
  query($id: ID!) {
    customer(id: $id) {
      id
      first_name
      last_name
      email
      company
      phone
      address_book
      date
      updated
    }
  }
`;

const ADD_CUSTOMER = gql`
  mutation(
    $first_name: String
    $last_name: String
    $email: String
    $company: String
    $phone: String
    $password: String
  ) {
    addCustomer(
      first_name: $first_name
      last_name: $last_name
      email: $email
      company: $company
      phone: $phone
      password: $password
    ) {
      id
      first_name
      last_name
      email
      company
      phone
      address_book
      date
      updated
    }
  }
`;

const ADD_ADDRESSBOOK = gql`
  mutation(
    $id: ID!
    $first_name: String
    $last_name: String
    $company: String
    $phone: String
    $address_line1: String
    $address_line2: String
    $city: String
    $country: String
    $state: String
    $pincode: String
    $default_address: Boolean
  ) {
    addAddressBook(
      id: $id
      first_name: $first_name
      last_name: $last_name
      company: $company
      phone: $phone
      address_line1: $address_line1
      address_line2: $address_line2
      city: $city
      country: $country
      state: $state
      pincode: $pincode
      default_address: $default_address
    ) {
      id
      first_name
      last_name
      email
      company
      phone
      address_book
      date
      updated
    }
  }
`;

const UPDATE_CUSTOMER = gql`
  mutation(
    $id: ID!
    $first_name: String
    $last_name: String
    $email: String
    $company: String
    $phone: String
    $password: String
  ) {
    updateCustomer(
      id: $id
      first_name: $first_name
      last_name: $last_name
      email: $email
      company: $company
      phone: $phone
      password: $password
    ) {
      id
      first_name
      last_name
      email
      company
      phone
      address_book
      date
      updated
    }
  }
`;

const UPDATE_ADDRESSBOOK = gql`
  mutation(
    $id: ID!
    $_id: ID!
    $first_name: String
    $last_name: String
    $company: String
    $phone: String
    $address_line1: String
    $address_line2: String
    $city: String
    $country: String
    $state: String
    $pincode: String
    $default_address: Boolean
  ) {
    updateAddressBook(
      id: $id
      _id: $_id
      first_name: $first_name
      last_name: $last_name
      company: $company
      phone: $phone
      address_line1: $address_line1
      address_line2: $address_line2
      city: $city
      country: $country
      state: $state
      pincode: $pincode
      default_address: $default_address
    ) {
      id
      first_name
      last_name
      email
      company
      phone
      address_book
      date
      updated
    }
  }
`;

const DELETE_CUSTOMER = gql`
  mutation($id: ID!) {
    deleteCustomer(id: $id) {
      id
      first_name
      last_name
      email
      company
      phone
      address_book
      date
      updated
    }
  }
`;

const DELETE_ADDRESSBOOK = gql`
  mutation($id: ID!, $_id: ID!) {
    deleteAddressBook(id: $id, _id: $_id) {
      id
      first_name
      last_name
      email
      company
      phone
      address_book
      date
      updated
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
  DELETE_ADDRESSBOOK
};
