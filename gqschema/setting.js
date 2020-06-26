const { gql } = require("apollo-server-express");
module.exports = gql`
  type Setting {
    id: ID
    general: General
    media: Media
    smtp: SMTP
    seo: SEO
    store: Store
    paymnet: Payment
    appearance: Appearance
    createdAt: Date
    updatedAt: Date
  }

  type dateformat {
    id: String
    value: String
  }

  type General {
    date_format: String
    time_zone: String
  }

  type Media {
    thumbnail: Height_Width
    medium: Height_Width
    large: Height_Width
  }

  type Height_Width {
    width: Int
    height: Int
  }

  type SMTP {
    server: String
    username: String
    password: String
    port: String
  }

  type SEO {
    meta_title: String
    meta_tag: String
    meta_description: String
  }

  type Store {
    currency_options: CURRENCY_OPTIONS
    store_address: STORE_ADDRESS
    measurements: MEASUREMENTS
    inventory: INVENTORY
  }

  type CURRENCY_OPTIONS {
    currency: String
    currency_position: String
    thousand_separator: String
    decimal_separator: String
    number_of_decimals: Int
  }

  type STORE_ADDRESS {
    address_line1: String
    address_line2: String
    city: String
    country: String
    state: String
    zip: String
  }

  type MEASUREMENTS {
    weight_unit: String
    dimensions_unit: String
  }

  type INVENTORY {
    manage_stock: Boolean
    notifications: INVENTORY_NOTIFICATIONS
    notification_recipients: String
    low_stock_threshold: Int
    out_of_stock_threshold: Int
    out_of_stock_visibility: Boolean
    stock_display_format: String
  }

  type INVENTORY_NOTIFICATIONS {
    show_out_of_stock: Boolean
    alert_for_minimum_stock: Boolean
  }

  type Payment {
    cash_on_delivery: CASH_ON_DELIVERY
    bank_transfer: BANK_TRANSFER
    stripe: STRIPE
    paypal: PAYPAL
  }

  type CASH_ON_DELIVERY {
    enable: Boolean
    title: String
    description: String
    instructions: String
  }

  type BANK_TRANSFER {
    enable: Boolean
    title: String
    description: String
    instructions: String
    account_details: ACCOUNT_DETAILS
  }

  type ACCOUNT_DETAILS {
    account_name: String
    account_number: String
    bank_name: String
    short_code: String
    iban: String
    bic_swift: String
  }

  type STRIPE {
    enable: Boolean
    title: String
    description: String
    inline_credit_card_form: Boolean
    statement_descriptor: String
    capture: Boolean
    test_mode: Boolean
    publishable_key: String
    secret_key: String
    webhook_key: String
  }

  type PAYPAL {
    enable: Boolean
    title: String
    description: String
    paypal_email: String
    ipn_email_notification: Boolean
    receiver_email: String
    paypal_identity_token: String
    invoice_prefix: String
    test_mode: Boolean
    api_username: String
    api_password: String
    api_signature: String
  }

  type Appearance {
    home: APPEARANCE_HOME
    theme: APPEARANCE_THEME
  }

  type SLIDER {
    image: customObject
    link: String
    open_in_tab: Boolean
  }

  type APPEARANCE_HOME {
    slider: [SLIDER]
    add_section_in_home: ADD_SECTION_IN_HOME
  }

  type ADD_SECTION_IN_HOME {
    feature_product: Boolean
    recently_added_products: Boolean
    most_viewed_products: Boolean
    recently_bought_products: Boolean
    product_recommendation: Boolean
    products_on_sales: Boolean
    product_from_specific_categories: Boolean
  }

  type APPEARANCE_THEME {
    primary_color: String
    logo: customObject
  }

  input inventory_notification {
    show_out_of_stock: Boolean
    alert_for_minimum_stock: Boolean
  }

  input account_details {
    account_name: String
    account_number: String
    bank_name: String
    short_code: String
    iban: String
    bic_swift: String
  }

  input slider_input {
    update_image: Upload
    image: customObject
    link: String
    open_in_tab: Boolean
  }

  input add_section_in_home {
    feature_product: Boolean
    recently_added_products: Boolean
    most_viewed_products: Boolean
    recently_bought_products: Boolean
    product_recommendation: Boolean
    products_on_sales: Boolean
    product_from_specific_categories: Boolean
  }

  extend type Query {
    setting: Setting
    getDateformat: [dateformat]
    getSettings: Setting
  }

  extend type Mutation {
    updateGeneral(date_format: String, time_zone: String): Setting
    updateMedia(
      thumbnail: customObject
      medium: customObject
      large: customObject
    ): Setting
    updateSMTP(
      server: String
      username: String
      password: String
      port: Int
    ): Setting
    updateSEO(
      meta_title: String
      meta_tag: String
      meta_description: String
    ): Setting
    updateStoreCurrency(
      currency: String
      currency_position: String
      thousand_separator: String
      decimal_separator: String
      number_of_decimals: Int
    ): Setting
    updateStoreAddress(
      address_line1: String
      address_line2: String
      city: String
      country: String
      state: String
      zip: String
    ): Setting
    updateStoreMeasurements(
      weight_unit: String
      dimensions_unit: String
    ): Setting
    updateStoreInventory(
      manage_stock: Boolean
      notifications: inventory_notification
      notification_recipients: String
      low_stock_threshold: Int
      out_of_stock_threshold: Int
      out_of_stock_visibility: Boolean
      stock_display_format: String
    ): Setting
    updatePaymnetCOD(
      enable: Boolean
      title: String
      description: String
      instructions: String
    ): Setting
    updatePaymnetBank(
      enable: Boolean
      title: String
      description: String
      instructions: String
      account_details: account_details
    ): Setting
    updatePaymnetStripe(
      enable: Boolean
      title: String
      description: String
      inline_credit_card_form: Boolean
      statement_descriptor: String
      capture: Boolean
      test_mode: Boolean
      publishable_key: String
      secret_key: String
      webhook_key: String
    ): Setting
    updatePaymentPaypal(
      enable: Boolean
      title: String
      description: String
      paypal_email: String
      ipn_email_notification: Boolean
      receiver_email: String
      paypal_identity_token: String
      invoice_prefix: String
      test_mode: Boolean
      api_username: String
      api_password: String
      api_signature: String
    ): Setting
    updateAppearanceHome(
      slider: [slider_input]
      add_section_in_home: add_section_in_home
    ): Setting
    updateAppeanranceTheme(primary_color: String, new_logo: Upload): Setting
  }
`;
