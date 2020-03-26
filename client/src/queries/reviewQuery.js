import gql from "graphql-tag";
const GET_REVIEWS = gql`
  {
    reviews {
      id
      title
      customer_id {
        id
        first_name
      }
      product_id {
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

const GET_REVIEW = gql`
  query($id: ID!) {
    review(id: $id) {
      id
      title
      customer_id {
        id
        first_name
      }
      product_id {
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

const ADD_REVIEW = gql`
  mutation(
    $title: String
    $customer_id: String
    $product_id: String
    $email: String
    $review: String
    $rating: String
    $status: String
  ) {
    addReview(
      title: $title
      customer_id: $customer_id
      product_id: $product_id
      email: $email
      review: $review
      rating: $rating
      status: $status
    ) {
      id
      title
      customer_id {
        id
        first_name
      }
      product_id {
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

const UPDATE_REVIEW = gql`
  mutation(
    $id: ID!
    $title: String
    $customer_id: String
    $product_id: String
    $email: String
    $review: String
    $rating: String
    $status: String
  ) {
    updateReview(
      id: $id
      title: $title
      customer_id: $customer_id
      product_id: $product_id
      email: $email
      review: $review
      rating: $rating
      status: $status
    ) {
      id
      title
      customer_id {
        id
        first_name
      }
      product_id {
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

const DELETE_REVIEW = gql`
  mutation($id: ID!) {
    deleteReview(id: $id) {
      id
      title
      customer_id {
        id
        first_name
      }
      product_id {
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

export { GET_REVIEWS, GET_REVIEW, ADD_REVIEW, UPDATE_REVIEW, DELETE_REVIEW };
