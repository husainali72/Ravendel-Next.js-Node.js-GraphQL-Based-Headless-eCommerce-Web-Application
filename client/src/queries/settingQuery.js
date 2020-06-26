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
        address_line1
        address_line2
        city
        country
        state
        zip
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
      }
    }
    paymnet {
      cash_on_delivery {
        enable
        title
        description
        instructions
      }
      bank_transfer {
        enable
        title
        description
        instructions
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
        inline_credit_card_form
        statement_descriptor
        capture
        test_mode
        publishable_key
        secret_key
        webhook_key
      }
      paypal {
        enable
        title
        description
        paypal_email
        ipn_email_notification
        receiver_email
        paypal_identity_token
        invoice_prefix
        test_mode
        api_username
        api_password
        api_signature
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
      }
      theme {
        primary_color
        logo
      }
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
  mutation($date_format: String, $time_zone: String) {
    updateGeneral(date_format: $date_format, time_zone: $time_zone) {
      ...SettingTile
    }
  }
  ${SETTING_TILE_DATA}
`;

const UPDATE_MEDIA = gql`
  mutation(
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
  mutation($server: String, $username: String, $password: String, $port: Int) {
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
  mutation($meta_title: String, $meta_tag: String, $meta_description: String) {
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

const UPDATE_STORE_CURRENCY = gql`
  mutation(
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
  mutation(
    $address_line1: String
    $address_line2: String
    $city: String
    $country: String
    $state: String
    $zip: String
  ) {
    updateStoreAddress(
      address_line1: $address_line1
      address_line2: $address_line2
      city: $city
      country: $country
      state: $state
      zip: $zip
    ) {
      ...SettingTile
    }
  }
  ${SETTING_TILE_DATA}
`;

const UPDATE_STORE_MEASUREMENTS = gql`
  mutation($weight_unit: String, $dimensions_unit: String) {
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
  mutation(
    $manage_stock: Boolean
    $notifications: inventory_notification
    $notification_recipients: String
    $low_stock_threshold: Int
    $out_of_stock_threshold: Int
    $out_of_stock_visibility: Boolean
    $stock_display_format: String
  ) {
    updateStoreInventory(
      manage_stock: $manage_stock
      notifications: $notifications
      notification_recipients: $notification_recipients
      low_stock_threshold: $low_stock_threshold
      out_of_stock_threshold: $out_of_stock_threshold
      out_of_stock_visibility: $out_of_stock_visibility
      stock_display_format: $stock_display_format
    ) {
      ...SettingTile
    }
  }
  ${SETTING_TILE_DATA}
`;

const UPDATE_PAYMENT_COD = gql`
  mutation(
    $enable: Boolean
    $title: String
    $description: String
    $instructions: String
  ) {
    updatePaymnetCOD(
      enable: $enable
      title: $title
      description: $description
      instructions: $instructions
    ) {
      ...SettingTile
    }
  }
  ${SETTING_TILE_DATA}
`;

const UPDATE_PAYMENT_BANK = gql`
  mutation(
    $enable: Boolean
    $title: String
    $description: String
    $instructions: String
    $account_details: account_details
  ) {
    updatePaymnetBank(
      enable: $enable
      title: $title
      description: $description
      instructions: $instructions
      account_details: $account_details
    ) {
      ...SettingTile
    }
  }
  ${SETTING_TILE_DATA}
`;

const UPDATE_PAYMENT_STRIPE = gql`
  mutation(
    $enable: Boolean
    $title: String
    $description: String
    $inline_credit_card_form: Boolean
    $statement_descriptor: String
    $capture: Boolean
    $test_mode: Boolean
    $publishable_key: String
    $secret_key: String
    $webhook_key: String
  ) {
    updatePaymnetStripe(
      enable: $enable
      title: $title
      description: $description
      inline_credit_card_form: $inline_credit_card_form
      statement_descriptor: $statement_descriptor
      capture: $capture
      test_mode: $test_mode
      publishable_key: $publishable_key
      secret_key: $secret_key
      webhook_key: $webhook_key
    ) {
      ...SettingTile
    }
  }
  ${SETTING_TILE_DATA}
`;

const UPDATE_PAYMENT_PAYPAL = gql`
  mutation(
    $enable: Boolean
    $title: String
    $description: String
    $paypal_email: String
    $ipn_email_notification: Boolean
    $receiver_email: String
    $paypal_identity_token: String
    $invoice_prefix: String
    $test_mode: Boolean
    $api_username: String
    $api_password: String
    $api_signature: String
  ) {
    updatePaymentPaypal(
      enable: $enable
      title: $title
      description: $description
      paypal_email: $paypal_email
      ipn_email_notification: $ipn_email_notification
      receiver_email: $receiver_email
      paypal_identity_token: $paypal_identity_token
      invoice_prefix: $invoice_prefix
      test_mode: $test_mode
      api_username: $api_username
      api_password: $api_password
      api_signature: $api_signature
    ) {
      ...SettingTile
    }
  }
  ${SETTING_TILE_DATA}
`;

const UPDATE_APPEARANCE_HOME = gql`
  mutation($slider: [slider_input], $add_section_in_home: add_section_in_home) {
    updateAppearanceHome(
      slider: $slider
      add_section_in_home: $add_section_in_home
    ) {
      ...SettingTile
    }
  }
  ${SETTING_TILE_DATA}
`;

const UPDATE_APPEARANCE_THEME = gql`
  mutation($primary_color: String, $new_logo: Upload) {
    updateAppeanranceTheme(primary_color: $primary_color, new_logo: $new_logo) {
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
  UPDATE_PAYMENT_COD,
  UPDATE_PAYMENT_BANK,
  UPDATE_PAYMENT_STRIPE,
  UPDATE_PAYMENT_PAYPAL,
  UPDATE_APPEARANCE_HOME,
  UPDATE_APPEARANCE_THEME,
};
