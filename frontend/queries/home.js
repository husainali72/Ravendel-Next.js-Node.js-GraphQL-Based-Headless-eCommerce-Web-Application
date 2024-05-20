import { gql } from "@apollo/client";

export const GET_HOMEPAGE_DATA_QUERY = gql`
  query HomePageSettings {
    getSettings {
      general {
        date_format
      }
      seo {
        meta_title
        meta_tag
        meta_description
      }
      store {
        currency_options {
          currency
          currency_position
          thousand_separator
          decimal_separator
          number_of_decimals
        }
        store_address {
          addressLine1
          addressLine2
          city
          country
          state
          zip
          hour
          email
          phone_number
          social_media {
            name
            handle
          }
        }
        inventory {
          manage_stock
          notifications {
            show_out_of_stock
            alert_for_minimum_stock
          }
          notification_recipients
          low_stock_threshold
          stock_display_format
          left_quantity
        }
      }
      payment {
        cash_on_delivery {
          enable
          title
          description
        }
        bank_transfer {
          enable
          title
          description
          account_details {
            account_name
            account_number
            bank_name
            short_code
            iban
            bic_swift
          }
        }
        stripe {
          enable
          title
          description
          test_mode
        }
        paypal {
          enable
          title
          description
          test_mode
          sandbox_client_id
          live_client_id
        }
        razorpay {
          enable
          title
          description
          test_mode
          sandbox_client_id
          live_client_id
        }
      }
      imageStorage {
        status
      }
      appearance {
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
          add_section_web {
            label
            visible
            category
          }
        }
        theme {
          primary_color
          playstore
          appstore
          logo
        }

        mobile {
          mobile_section {
            label
            section_img
            visible
            url
            category
          }
        }
      }
      createdAt
      updatedAt
    }
  }
`;
export const GET_HOMEPAGE_QUERY = gql`
  query HomePageData($deviceType: ID!) {
    getHomePage(deviceType: $deviceType) {
      parentCategories {
        id
        name
        url
        image
        thumbnail_image
      }
      sections {
        display_type
        name
        section_img
        products {
          name
          quantity
          rating
          pricing
          feature_image
          url
        }
      }
    }
  }
`;

export const GET_REVIEWS = gql`
  query {
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

export const FEATURE_PRODUCT_QUERY = gql`
  query {
    featureproducts {
      _id
      name
      feature_image
      pricing
      rating
      url
      categoryId {
        id
        name
      }
      quantity
      featured_product
      status
      variant
      shipping
      taxClass
    }
  }
`;
export const GET_RECENT_PRODUCTS_QUERY = gql`
  query {
    recentproducts {
      _id
      name
      feature_image
      rating
      pricing
      url
      categoryId {
        id
        name
      }
      quantity
      featured_product
      status
      variant
      shipping
      taxClass
    }
  }
`;
export const GET_RELATED_PRODUCTS_QUERY = gql`
  query ($category: customArray!, $productID: ID!) {
    relatedProducts(category: $category, productID: $productID) {
      _id
      name
      feature_image
      pricing
      rating
      url
      categoryId {
        id
        name
      }
      quantity
      featured_product
      status
      variant
      shipping
      taxClass
    }
  }
`;

export const GET_CATEGORIES_QUERY = gql`
  query {
    productCategories {
      data {
        id
        name
        parentId
        date
        updated
        url
        image
        __typename
      }
      message {
        success
        message
        __typename
      }
      __typename
    }
  }
`;
export const ON_SALE_PRODUCTS_QUERY = gql`
  query {
    onSaleProducts {
      _id
      name
      feature_image
      pricing
      rating
      url
      categoryId {
        id
        name
        __typename
      }
      quantity
      featured_product
      status
      variant
      shipping
      taxClass
      __typename
    }
  }
`;
