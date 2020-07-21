import gql from "graphql-tag";

const GET_HOMEPAGE_DATA = gql`
  {
    getSettings {
      seo {
        meta_title
        meta_tag
        meta_description
      }
      appearance {
        theme {
          primary_color
          logo
        }
        home {
          slider {
            image
            link
            open_in_tab
          }
          add_section_in_home {
            feature_product
            recently_added_products
            most_viewed_products
            recently_bought_products
            product_recommendation
            products_on_sales
            product_from_specific_categories
          }
        }
      }
    }
  }
`;

export { GET_HOMEPAGE_DATA };
