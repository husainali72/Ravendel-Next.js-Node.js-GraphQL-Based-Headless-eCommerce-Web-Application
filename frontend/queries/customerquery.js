import gql from "graphql-tag";

export const ADD_CUSTOMER = gql`
       mutation (
         $first_name: String,
         $last_name: String, 
         $email: String, 
         $company: String,
         $phone: String,
         $password: String)
          {
            addCustomer(
              first_name: $first_name,
              last_name: $last_name,
              email: $email,
              company: $company,
              phone: $phone,
              password: $password
                      ) {
                          message
                          success
                          __typename
                          }
}
`;

export const GET_CUSTOMERS = gql`
  query{
    customers {
      data {
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
      message {
        message
        success
      }
    }
  }
`;
export const GET_CUSTOMER_QUERY = gql`
  query($id: ID!) {
    customer(id: $id) {
      data{
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
  }
`;
export const ADD_ADDRESSBOOK = gql`
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
      message
      success
    }
  }
`;

export const UPDATE_CUSTOMER = gql`
  mutation(
    $id: ID!
    $first_name: String
    $last_name: String
    $email: String
    $company: String
    $phone: String
  ) {
    updateCustomer(
      id: $id
      first_name: $first_name
      last_name: $last_name
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
      message
      success
    }
  }
`;

export const DELETE_ADDRESSBOOK = gql`
mutation($id: ID!, $_id: ID!) {
  deleteAddressBook(id: $id, _id: $_id) {
    message
    success
  }
}
`;


export const GET_ORDER_BY_CUSTOMER = gql`
query ($id:ID!){
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
