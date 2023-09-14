import gql from "graphql-tag";
const GET_TAX = gql`
  {
    tax {
      data {
        id
        is_inclusive
        global
        taxClass
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

// const UPDATE_GLOBALTAX = gql`
//   mutation($global: customObject) {
//     updateGlobalTax(global: $global) {
//       id
//       is_inclusive
//       global
//       taxClass
//       date
//       updated
//     }
//   }
// `;
const UPDATE_GLOBALTAX = gql`
  mutation($global: customObject) {
    updateGlobalTax(global: $global) {
      message
      success
    }
  }
`;

const UPDATE_OPTIONTAX = gql`
  mutation($is_inclusive: Boolean) {
    updateOptionTax(is_inclusive: $is_inclusive) {
      message
      success
    }
  }
`;

const ADD_TAXCLASS = gql`
  mutation($taxClass: customObject) {
    addTaxClass(taxClass: $taxClass) {
      message
      success
    }
  }
`;

const UPDATE_TAXCLASS = gql`
  mutation($taxClass: customObject) {
    updateTaxClass(taxClass: $taxClass) {
      message
      success
    }
  }
`;

const DELETE_TAXCLASS = gql`
  mutation($_id: String) {
    deleteTaxClass(_id: $_id) {
      message
      success
    }
  }
`;

// const UPDATE_OPTIONTAX = gql`
//   mutation($is_inclusive: Boolean) {
//     updateOptionTax(is_inclusive: $is_inclusive) {
//       id
//       is_inclusive
//       global
//       taxClass
//       date
//       updated
//     }
//   }
// `;

// const ADD_TAXCLASS = gql`
//   mutation($taxClass: customObject) {
//     addTaxClass(taxClass: $taxClass) {
//       id
//       is_inclusive
//       global
//       taxClass
//       date
//       updated
//     }
//   }
// `;

// const UPDATE_TAXCLASS = gql`
//   mutation($taxClass: customObject) {
//     updateTaxClass(taxClass: $taxClass) {
//       id
//       is_inclusive
//       global
//       taxClass
//       date
//       updated
//     }
//   }
// `;

// const DELETE_TAXCLASS = gql`
//   mutation($_id: String) {
//     deleteTaxClass(_id: $_id) {
//       id
//       is_inclusive
//       global
//       taxClass
//       date
//       updated
//     }
//   }
// `;

export {
  GET_TAX,
  UPDATE_GLOBALTAX,
  UPDATE_OPTIONTAX,
  ADD_TAXCLASS,
  UPDATE_TAXCLASS,
  DELETE_TAXCLASS
};
