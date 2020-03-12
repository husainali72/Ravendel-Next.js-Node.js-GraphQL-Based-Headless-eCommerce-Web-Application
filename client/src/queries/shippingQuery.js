import gql from "graphql-tag";
const GET_SHIPPING = gql`
  {
    shipping {
      id
      global
      shipping_class
      date
      updated
    }
  }
`;

const UPDATE_GLOBALSHIPPING = gql`
  mutation($global: customObject) {
    updateGlobalShipping(global: $global) {
      id
      global
      shipping_class
      date
      updated
    }
  }
`;

const ADD_SHIPPINGCLASS = gql`
  mutation($shipping_class: customObject) {
    addShippingClass(shipping_class: $shipping_class) {
      id
      global
      shipping_class
      date
      updated
    }
  }
`;

const UPDATE_SHIPPINGCLASS = gql`
  mutation($shipping_class: customObject) {
    updateShippingClass(shipping_class: $shipping_class) {
      id
      global
      shipping_class
      date
      updated
    }
  }
`;

const DELETE_SHIPPINGCLASS = gql`
  mutation($_id: String) {
    deleteShippingClass(_id: $_id) {
      id
      global
      shipping_class
      date
      updated
    }
  }
`;

export {
  GET_SHIPPING,
  UPDATE_GLOBALSHIPPING,
  ADD_SHIPPINGCLASS,
  UPDATE_SHIPPINGCLASS,
  DELETE_SHIPPINGCLASS
};
