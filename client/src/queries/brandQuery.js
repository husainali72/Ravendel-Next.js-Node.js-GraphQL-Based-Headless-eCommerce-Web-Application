import gql from "graphql-tag";
const GET_BRANDS = gql`
  {
    brands {
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

const ADD_BRAND = gql`
  mutation($brands: [BrandField]) {
    addBrand(brands: $brands) {
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

const UPDATE_BRAND = gql`
  mutation(
    $id: ID!
    $name: String
    $url: String
    $updated_brand_logo: Upload
    $meta: customObject
  ) {
    updateBrand(
      id: $id
      name: $name
      url: $url
      updated_brand_logo: $updated_brand_logo
      meta: $meta
    ) {
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

const DELETE_BRAND = gql`
  mutation($id: ID!) {
    deleteBrand(id: $id) {
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

export { GET_BRANDS, GET_BRAND, ADD_BRAND, UPDATE_BRAND, DELETE_BRAND };
