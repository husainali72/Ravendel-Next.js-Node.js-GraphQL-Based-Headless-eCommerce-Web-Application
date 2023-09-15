import gql from "graphql-tag";
const GET_REVIEWS = gql`
  {
    reviews {
      data {
        id
        title
        customerId {
          id
          firstName
        }
        productId {
          _id
          name
        }
        email
        review
        rating
        status
        date
        updated
      }
      message {
        success
        message
      }
    }
  } 
`;
// const GET_REVIEWS = gql`
//   {
//     reviews {
//       data {
//         id
//         title
//         customerId {
//           id
//           firstName
//         }
//         productId {
//           id
//           name
//         }
//         email
//         review
//         rating
//         status
//         date
//         updated
//       }
//     }
//   }
// `;

const GET_REVIEW = gql`
  query ($id: ID!) {
    review(id: $id) {
      id
      title
      customerId {
        id
        firstName
      }
      productId {
        id
        name
      }
      email
      review
      rating
      status
      date
      updated
    }
  }
`;

// const ADD_REVIEW = gql`
//   mutation (
//     $title: String
//     $customerId: String
//     $productId: String
//     $email: String
//     $review: String
//     $rating: String
//     $status: String
//   ) {
//     addReview(
//       title: $title
//       customerId: $customerId
//       productId: $productId
//       email: $email
//       review: $review
//       rating: $rating
//       status: $status
//     ) {
//       id
//       title
//       customerId {
//         id
//         firstName
//       }
//       productId {
//         id
//         name
//       }
//       email
//       review
//       rating
//       status
//       date
//       updated
//     }
//   }
// `;
const ADD_REVIEW = gql`
  mutation (
    $title: String
    $customerId: String
    $productId: String
    $email: String
    $review: String
    $rating: String
    $status: String
  ) {
    addReview(
      title: $title
      customerId: $customerId
      productId: $productId
      email: $email
      review: $review
      rating: $rating
      status: $status
    ) {
      message
      success
    }
  }
`;

// const UPDATE_REVIEW = gql`
//   mutation (
//     $id: ID!
//     $title: String
//     $customerId: String
//     $productId: String
//     $email: String
//     $review: String
//     $rating: String
//     $status: String
//   ) {
//     updateReview(
//       id: $id
//       title: $title
//       customerId: $customerId
//       productId: $productId
//       email: $email
//       review: $review
//       rating: $rating
//       status: $status
//     ) {
//       id
//       title
//       customerId {
//         id
//         firstName
//       }
//       productId {
//         id
//         name
//       }
//       email
//       review
//       rating
//       status
//       date
//       updated
//     }
//   }
// `;
const UPDATE_REVIEW = gql`
  mutation (
    $id: ID!
    $title: String
    $customerId: String
    $productId: String
    $email: String
    $review: String
    $rating: String
    $status: String
  ) {
    updateReview(
      id: $id
      title: $title
      customerId: $customerId
      productId: $productId
      email: $email
      review: $review
      rating: $rating
      status: $status
    ) {
      message
      success
    }
  }
`;

// const DELETE_REVIEW = gql`
//   mutation ($id: ID!) {
//     deleteReview(id: $id) {
//       id
//       title
//       customerId {
//         id
//         firstName
//       }
//       productId {
//         id
//         name
//       }
//       email
//       review
//       rating
//       status
//       date
//       updated
//     }
//   }
// `;
const DELETE_REVIEW = gql`
  mutation ($id: ID!) {
    deleteReview(id: $id) {
      message
      success
    }
  }
`;

export { GET_REVIEWS, GET_REVIEW, ADD_REVIEW, UPDATE_REVIEW, DELETE_REVIEW };
