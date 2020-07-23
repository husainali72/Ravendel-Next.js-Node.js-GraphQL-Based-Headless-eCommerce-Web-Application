import gql from "graphql-tag";
const GET_BRANDS = gql`
  {
    brands {
      id
      name
    }
  }
`;

const GET_BRAND = gql`
  query($id: ID!) {
    brand(id: $id) {
      id
      name
      url
      brand_logo
      meta {
        title
        description
        keywords
      }
      date
      updated
    }
  }
`;

export { GET_BRANDS, GET_BRAND };
