import gql from "graphql-tag";
const GET_TAX = gql`
  {
    tax {
      id
      is_inclusive
      global
      tax_class
      date
      updated
    }
  }
`;

const UPDATE_GLOBALTAX = gql`
  mutation($global: customObject) {
    updateGlobalTax(global: $global) {
      id
      is_inclusive
      global
      tax_class
      date
      updated
    }
  }
`;

const UPDATE_OPTIONTAX = gql`
  mutation($is_inclusive: Boolean) {
    updateOptionTax(is_inclusive: $is_inclusive) {
      id
      is_inclusive
      global
      tax_class
      date
      updated
    }
  }
`;

const ADD_TAXCLASS = gql`
  mutation($tax_class: customObject) {
    addTaxClass(tax_class: $tax_class) {
      id
      is_inclusive
      global
      tax_class
      date
      updated
    }
  }
`;

const UPDATE_TAXCLASS = gql`
  mutation($tax_class: customObject) {
    updateTaxClass(tax_class: $tax_class) {
      id
      is_inclusive
      global
      tax_class
      date
      updated
    }
  }
`;

const DELETE_TAXCLASS = gql`
  mutation($_id: String) {
    deleteTaxClass(_id: $_id) {
      id
      is_inclusive
      global
      tax_class
      date
      updated
    }
  }
`;

export {
  GET_TAX,
  UPDATE_GLOBALTAX,
  UPDATE_OPTIONTAX,
  ADD_TAXCLASS,
  UPDATE_TAXCLASS,
  DELETE_TAXCLASS
};
