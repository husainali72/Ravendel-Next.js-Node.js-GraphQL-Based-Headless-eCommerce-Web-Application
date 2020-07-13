import gql from "graphql-tag";

const ATTRIBUTE_TILE = gql`
  fragment AttributeTile on productAttribute {
    id
    name
    values
    date
    updated
  }
`;

const GENERAL_RESPONSE_TILE = gql`
  fragment GeneralRsponseTile on attributeResponse {
    id
    success
    message
  }
`;

const GET_ATTRIBUTES = gql`
  {
    product_attributes {
      ...AttributeTile
    }
  }
  ${ATTRIBUTE_TILE}
`;

const GET_ATTRIBUTE = gql`
  query($id: ID!) {
    product_attribute(id: $id) {
      ...AttributeTile
    }
  }
  ${ATTRIBUTE_TILE}
`;

const ADD_ATTRIBUTE = gql`
  mutation($attribute: AttributeInput) {
    addAttribute(attribute: $attribute) {
      ...GeneralRsponseTile
    }
  }
  ${GENERAL_RESPONSE_TILE}
`;

const UPDATE_ATTRIBUTE = gql`
  mutation($attribute: AttributeInput) {
    updateAttribute(attribute: $attribute) {
      ...GeneralRsponseTile
    }
  }
  ${GENERAL_RESPONSE_TILE}
`;

const DELETE_ATTRIBUTE = gql`
  mutation($id: ID!) {
    deleteAttribute(id: $id) {
      ...GeneralRsponseTile
    }
  }
  ${GENERAL_RESPONSE_TILE}
`;

export {
  GET_ATTRIBUTES,
  GET_ATTRIBUTE,
  ADD_ATTRIBUTE,
  UPDATE_ATTRIBUTE,
  DELETE_ATTRIBUTE,
};
