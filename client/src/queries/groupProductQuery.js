import gql from "graphql-tag";

const GET_GROUP_PRODUCTS = gql`
query {
    groups {
    data {
      id
      title
      attributes {
        _id
        values
      }
      variations {
        _id
        combinations {
          attributeValueId
          attributeId
        }
        productId
      }
      productIds
      createdAt
      updatedAt
    }
    message {
      success
      message
    }
  }
}
`;
const DELETE_GROUP_PRODUCT = gql`
mutation Mutation($deleteGroupId: ID!) {
  deleteGroup(id: $deleteGroupId) {
    success
    message
  }
}
`;

const ADD_GROUP_PRODUCT = gql`
mutation Mutation($title: String!,$status: String, $attributes: [AttributeInput], $productIds: [ID], $variations: [VariationInput]) {
  addGroup(title: $title,status: $status, attributes: $attributes, productIds: $productIds, variations: $variations) {
    success
    message
  }
}
`;
const UPDATE_GROUP_PRODUCT = gql`
mutation UpdateGroup($title: String!, $status: String, $attributes: [AttributeInput], $variations: [VariationInput], $productIds: [ID], $updateGroupId: ID!) {
  updateGroup( title: $title, status: $status, attributes: $attributes, variations: $variations, productIds: $productIds, id: $updateGroupId) {
    message
    success
  }
}
`;
const GET_GROUP_PRODUCT = gql`query Query($groupId: ID!) {
  group(id: $groupId) {
    message {
      message
      success
    }
    data {
      id
      title
      status
      attributes {
        _id
        values
      }
      variations {
        _id
        combinations {
          attributeId
          attributeValueId
        }
        productId
      }
      productIds
      createdAt
      updatedAt
    }
  }
}
`;
export {
  GET_GROUP_PRODUCTS,
  DELETE_GROUP_PRODUCT,
  ADD_GROUP_PRODUCT,
  GET_GROUP_PRODUCT,
  UPDATE_GROUP_PRODUCT
};


// Fetch Product Group
// query Query {
//   groups {
//     data {
//       id
//       title
//       attributes {
//         _id
//         values
//       }
//       variations {
//         _id
//         combinations {
//           attributeValue
//           attributeID
//         }
//         productID
//       }
//       productIDs
//       createdAt
//       updatedAt
//     }
//     message {
//       success
//       message
//     }
//   }
// }
