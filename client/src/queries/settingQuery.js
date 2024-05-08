import gql from "graphql-tag";

const SETTING_TILE_DATA = gql`
  fragment SettingTile on Setting {
    id
    general {
      date_format
      time_zone
    }
    media {
      thumbnail {
        width
        height
      }
      medium {
        width
        height
      }
      large {
        width
        height
      }
    }
    smtp {
      server
      username
      password
      port
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
      measurements {
        weight_unit
        dimensions_unit
      }
      inventory {
        manage_stock
        notifications {
          show_out_of_stock
          alert_for_minimum_stock
        }
        notification_recipients
        low_stock_threshold
        out_of_stock_threshold
        out_of_stock_visibility
        stock_display_format
        left_quantity
      }
      order_options {
        order_prefix
        order_digits
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
        sandbox_publishable_key
        live_publishable_key
        sandbox_secret_key
        live_secret_key
      }
      paypal {
        enable
        title
        description
        test_mode
        sandbox_secret_key
        live_secret_key
        sandbox_client_id
        live_client_id
      }
      razorpay {
        enable
        title
        description
        test_mode
        sandbox_secret_key
        live_secret_key
        sandbox_client_id
        live_client_id
      }
    }
    notification {
      one_signal {
        app_id
        rest_api_key
      }
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
          section_img
          url
          display_type
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
        slider {
          image
          link
          open_in_tab
        }
        mobile_section {
          label
          section_img
          visible
          url
          display_type
          category
        }
      }
    }
    imageStorage {
      status
      s3_id
      s3_key
    }
    zipcode {
      id
      zipcode
    }
    createdAt
    updatedAt
  }
`;

const GET_DATES = gql`
  {
    getDateformat {
      id
      value
    }
  }
`;

const GET_SETTINGS = gql`
  {
    getSettings {
      ...SettingTile
    }
  }
  ${SETTING_TILE_DATA}
`;

const UPDATE_GENERAL = gql`
  mutation ($date_format: String, $time_zone: String) {
    updateGeneral(date_format: $date_format, time_zone: $time_zone) {
      ...SettingTile
    }
  }
  ${SETTING_TILE_DATA}
`;

const UPDATE_MEDIA = gql`
  mutation (
    $thumbnail: customObject
    $medium: customObject
    $large: customObject
  ) {
    updateMedia(thumbnail: $thumbnail, medium: $medium, large: $large) {
      ...SettingTile
    }
  }
  ${SETTING_TILE_DATA}
`;

const UPDATE_SMTP = gql`
  mutation ($server: String, $username: String, $password: String, $port: Int) {
    updateSMTP(
      server: $server
      username: $username
      password: $password
      port: $port
    ) {
      ...SettingTile
    }
  }
  ${SETTING_TILE_DATA}
`;

const UPDATE_SEO = gql`
  mutation ($meta_title: String, $meta_tag: String, $meta_description: String) {
    updateSEO(
      meta_title: $meta_title
      meta_tag: $meta_tag
      meta_description: $meta_description
    ) {
      ...SettingTile
    }
  }
  ${SETTING_TILE_DATA}
`;
const UPDATE_IMAGE_STORAGE = gql`
  mutation ($status: String, $s3_id: String, $s3_key: String) {
    updateImageStorage(status: $status, s3_id: $s3_id, s3_key: $s3_key) {
      ...SettingTile
    }
  }
  ${SETTING_TILE_DATA}
`;

const UPDATE_STORE_CURRENCY = gql`
  mutation (
    $currency: String
    $currency_position: String
    $thousand_separator: String
    $decimal_separator: String
    $number_of_decimals: Int
  ) {
    updateStoreCurrency(
      currency: $currency
      currency_position: $currency_position
      thousand_separator: $thousand_separator
      decimal_separator: $decimal_separator
      number_of_decimals: $number_of_decimals
    ) {
      ...SettingTile
    }
  }
  ${SETTING_TILE_DATA}
`;

const UPDATE_STORE_ADDRESS = gql`
  mutation (
    $addressLine1: String
    $addressLine2: String
    $city: String
    $country: String
    $state: String
    $hour: String
    $email: String
    $phone_number: String
    $social_media: [social_media_input]
  ) {
    updateStoreAddress(
      addressLine1: $addressLine1
      addressLine2: $addressLine2
      city: $city
      country: $country
      state: $state
      hour: $hour
      email: $email
      phone_number: $phone_number
      social_media: $social_media
    ) {
      ...SettingTile
    }
  }
  ${SETTING_TILE_DATA}
`;

const UPDATE_STORE_MEASUREMENTS = gql`
  mutation ($weight_unit: String, $dimensions_unit: String) {
    updateStoreMeasurements(
      weight_unit: $weight_unit
      dimensions_unit: $dimensions_unit
    ) {
      ...SettingTile
    }
  }
  ${SETTING_TILE_DATA}
`;

const UPDATE_STORE_INVENTORY = gql`
  mutation (
    $manage_stock: Boolean
    $notifications: inventory_notification
    $notification_recipients: String
    $low_stock_threshold: Int
    $out_of_stock_threshold: Int
    $out_of_stock_visibility: Boolean
    $stock_display_format: String
    $left_quantity: Int
  ) {
    updateStoreInventory(
      manage_stock: $manage_stock
      notifications: $notifications
      notification_recipients: $notification_recipients
      low_stock_threshold: $low_stock_threshold
      out_of_stock_threshold: $out_of_stock_threshold
      out_of_stock_visibility: $out_of_stock_visibility
      stock_display_format: $stock_display_format
      left_quantity: $left_quantity
    ) {
      ...SettingTile
    }
  }
  ${SETTING_TILE_DATA}
`;

const UPDATE_STORE_ORDER = gql`
  mutation ($order_prefix: String, $order_digits: Int) {
    updateStoreOrder(order_prefix: $order_prefix, order_digits: $order_digits) {
      ...SettingTile
    }
  }
  ${SETTING_TILE_DATA}
`;
const UPDATE_IMAGE_STORE = gql`
  mutation ($status: String, $s3_id: String, $s3_key: String) {
    updateImageStorage(status: $status, s3_id: $s3_id, s3_key: $s3_key) {
      ...SettingTile
    }
  }
  ${SETTING_TILE_DATA}
`;

const UPDATE_PAYMENT_COD = gql`
  mutation ($enable: Boolean, $title: String) {
    updatePaymnetCOD(enable: $enable, title: $title) {
      ...SettingTile
    }
  }
  ${SETTING_TILE_DATA}
`;

const UPDATE_PAYMENT_BANK = gql`
  mutation (
    $enable: Boolean
    $title: String
    $description: String
    $account_details: account_details
  ) {
    updatePaymnetBank(
      enable: $enable
      title: $title
      description: $description
      account_details: $account_details
    ) {
      ...SettingTile
    }
  }
  ${SETTING_TILE_DATA}
`;

const UPDATE_PAYMENT_STRIPE = gql`
  mutation (
    $enable: Boolean
    $title: String
    $description: String
    $test_mode: Boolean
    $sandbox_secret_key: String
    $live_secret_key: String
    $sandbox_publishable_key: String
    $live_publishable_key: String
  ) {
    updatePaymnetStripe(
      enable: $enable
      title: $title
      description: $description
      test_mode: $test_mode
      sandbox_secret_key: $sandbox_secret_key
      live_secret_key: $live_secret_key
      sandbox_publishable_key: $sandbox_publishable_key
      live_publishable_key: $live_publishable_key
    ) {
      ...SettingTile
    }
  }
  ${SETTING_TILE_DATA}
`;

const UPDATE_PAYMENT_PAYPAL = gql`
  mutation (
    $enable: Boolean
    $title: String
    $description: String
    $test_mode: Boolean
    $sandbox_secret_key: String
    $live_secret_key: String
    $sandbox_client_id: String
    $live_client_id: String
  ) {
    updatePaymentPaypal(
      enable: $enable
      title: $title
      description: $description
      test_mode: $test_mode
      sandbox_secret_key: $sandbox_secret_key
      live_secret_key: $live_secret_key
      sandbox_client_id: $sandbox_client_id
      live_client_id: $live_client_id
    ) {
      ...SettingTile
    }
  }
  ${SETTING_TILE_DATA}
`;
const UPDATE_PAYMENT_RAZORPAY = gql`
  mutation (
    $enable: Boolean
    $title: String
    $description: String
    $razorpay_email: String
    $receiver_email: String
    $test_mode: Boolean
    $sandbox_secret_key: String
    $live_secret_key: String
    $sandbox_client_id: String
    $live_client_id: String
  ) {
    updatePaymentRazorpay(
      enable: $enable
      title: $title
      description: $description
      razorpay_email: $razorpay_email
      receiver_email: $receiver_email
      test_mode: $test_mode
      sandbox_secret_key: $sandbox_secret_key
      live_secret_key: $live_secret_key
      sandbox_client_id: $sandbox_client_id
      live_client_id: $live_client_id
    ) {
      ...SettingTile
    }
  }
  ${SETTING_TILE_DATA}
`;

const UPDATE_NOTIFICATION_ONESIGNAL = gql`
  mutation ($app_id: String, $rest_api_key: String) {
    updateNotificationOneSignal(app_id: $app_id, rest_api_key: $rest_api_key) {
      ...SettingTile
    }
  }
  ${SETTING_TILE_DATA}
`;

const UPDATE_APPEARANCE_HOME = gql`
  mutation (
    $slider: [slider_input]
    $add_section_in_home: add_section_in_home
  ) {
    updateAppearanceHome(
      slider: $slider
      add_section_in_home: $add_section_in_home
    ) {
      ...SettingTile
    }
  }
  ${SETTING_TILE_DATA}
`;

const UPDATE_APPEARANCE_HOME_NEW = gql`
  mutation (
    $slider: [slider_input]
    $add_section_in_home: add_section_in_home
    $add_section_web: [add_section_web_input]
  ) {
    updateAppearanceHome(
      slider: $slider
      add_section_in_home: $add_section_in_home
      add_section_web: $add_section_web
    ) {
      ...SettingTile
    }
  }
  ${SETTING_TILE_DATA}
`;

const UPDATE_APPEARANCE_MOBILE = gql`
  mutation ($mobile_add_section_in_home: [mobile_add_section_in_home]) {
    updateAppearanceMobile(
      slider: $slider
      mobile_add_section_in_home: $mobile_add_section_in_home
    ) {
      ...SettingTile
    }
  }
  ${SETTING_TILE_DATA}
`;

const UPDATE_APPEARANCE_MOBILE_NEW = gql`
  mutation ($slider: [slider_input], $mobile_section: [mobile_section_input]) {
    updateAppearanceMobile(slider: $slider, mobile_section: $mobile_section) {
      ...SettingTile
    }
  }
  ${SETTING_TILE_DATA}
`;
const GET_ZIPCODE = gql`
  query ($id: ID!) {
    zipcode(id: $id) {
      data {
        id
        zipcode
      }
      message {
        message
        success
      }
    }
  }
`;

const ADD_ZIPCODE = gql`
  mutation ($zipcode: String!) {
    addZipcode(zipcode: $zipcode) {
      message
      success
    }
  }
`;

const UPDATE_ZIPCODE = gql`
  mutation ($id: ID!, $zipcode: String!) {
    updateZipcode(id: $id, zipcode: $zipcode) {
      message
      success
    }
  }
`;
const UPLOAD_ZIPCODE_FILE = gql`
  mutation ($zipcode_file: Upload) 
  {
    addZipCodeUsingFile(zipcode_file: $zipcode_file) {
      message
      success
    }
  }
`;

const DELETE_ZIPCODE = gql`
  mutation ($id: ID!) {
    deleteZipcode(id: $id) {
      message
      success
    }
  }
`;
const UPDATE_APPEARANCE_THEME = gql`
  mutation (
    $primary_color: String
    $new_logo: Upload
    $playstore: String
    $appstore: String
    $logo: String
  ) {
    updateAppeanranceTheme(
      primary_color: $primary_color
      new_logo: $new_logo
      playstore: $playstore
      appstore: $appstore
      logo: $logo
    ) {
      ...SettingTile
    }
  }
  ${SETTING_TILE_DATA}
`;
//https://www.apollographql.com/docs/tutorial/introduction/

export {
  GET_DATES,
  UPDATE_GENERAL,
  GET_SETTINGS,
  UPDATE_MEDIA,
  UPDATE_SMTP,
  UPDATE_SEO,
  UPDATE_STORE_CURRENCY,
  UPDATE_STORE_ADDRESS,
  UPDATE_STORE_MEASUREMENTS,
  UPDATE_STORE_INVENTORY,
  UPDATE_STORE_ORDER,
  UPDATE_PAYMENT_COD,
  UPDATE_PAYMENT_BANK,
  UPDATE_PAYMENT_STRIPE,
  UPDATE_PAYMENT_PAYPAL,
  UPDATE_PAYMENT_RAZORPAY,
  UPDATE_NOTIFICATION_ONESIGNAL,
  UPDATE_APPEARANCE_HOME,
  UPDATE_APPEARANCE_MOBILE,
  UPDATE_APPEARANCE_THEME,
  UPDATE_APPEARANCE_HOME_NEW,
  UPDATE_APPEARANCE_MOBILE_NEW,
  GET_ZIPCODE,
  ADD_ZIPCODE,
  UPDATE_ZIPCODE,
  DELETE_ZIPCODE,
  UPDATE_IMAGE_STORAGE,
  UPLOAD_ZIPCODE_FILE,
};
