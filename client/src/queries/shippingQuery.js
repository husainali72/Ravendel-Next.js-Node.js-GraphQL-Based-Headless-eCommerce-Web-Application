import gql from "graphql-tag";
const GET_SHIPPING = gql`
  {
    shipping {
      data {
        id
        global
        shippingClass
        date
        updated
      }
      message{
        message
        success
      }
    }
  }
`;

// const UPDATE_GLOBALSHIPPING = gql`
//   mutation($global: customObject) {
//     updateGlobalShipping(global: $global) {
//       id
//       global
//       shippingClass
//       date
//       updated
//     }
//   }
// `;
const UPDATE_GLOBALSHIPPING = gql`
  mutation ($global: customObject) {
    updateGlobalShipping(global: $global) {
      message
      success
    }
  }
`;

// const ADD_SHIPPINGCLASS = gql`
//   mutation($shippingClass: customObject) {
//     addShippingClass(shippingClass: $shippingClass) {
//       id
//       global
//       shippingClass
//       date
//       updated
//     }
//   }
// `;

const ADD_SHIPPINGCLASS = gql`
  mutation($shippingClass: customObject) {
    addShippingClass(shippingClass: $shippingClass) {
      message
      success
    }
  }
`;

// const UPDATE_SHIPPINGCLASS = gql`
//   mutation($shippingClass: customObject) {
//     updateShippingClass(shippingClass: $shippingClass) {
//       id
//       global
//       shippingClass
//       date
//       updated
//     }
//   }
// `;

const UPDATE_SHIPPINGCLASS = gql`
  mutation($shippingClass: customObject) {
    updateShippingClass(shippingClass: $shippingClass) {
      message
      success
    }
  }
`;

// const DELETE_SHIPPINGCLASS = gql`
//   mutation($_id: String) {
//     deleteShippingClass(_id: $_id) {
//       id
//       global
//       shippingClass
//       date
//       updated
//     }
//   }
// `;
const DELETE_SHIPPINGCLASS = gql`
  mutation($_id: String) {
    deleteShippingClass(_id: $_id) {
      message
      success
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
