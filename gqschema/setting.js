// const { gql } = require("@apollo/server");
module.exports = `
  type Setting {
    id: ID
    general: General
    media: Media
    smtp: SMTP
    seo: SEO
    store: Store
    payment: Payment
    notification: Notification
    imageStorage: ImageStorage
    appearance: Appearance
    zipcode: ZipcodeSetting
    createdAt: Date
    updatedAt: Date
  }


  type dateformat {
    id: String
    value: String 
  }
  
  type ZipcodeSetting {
    zipcodes: [Zipcode]
    status: Boolean
  }


  type ImageStorage {
    status: String
    s3_id: String
    s3_key: String
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
    width: Float
    height: Float
  }

  type SMTP {
    server: String
    username: String
    password: String
    port: Int
    from_email: String
    from_name: String
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
    order_options: ORDER_OPTIONS
  }

  type CURRENCY_OPTIONS {
    currency: String
    currency_position: String
    thousand_separator: String
    decimal_separator: String
    number_of_decimals: Int
  }

  type STORE_ADDRESS {
    addressLine1: String
    addressLine2: String
    city: String
    country: String
    state: String
    zip: String
    hour: String
    email: String
    phone_number: String
    social_media: [SOCIAL_MEDIA]
  }

  type SOCIAL_MEDIA {
    name: String
    handle: String
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
    stock_display_format: String
    left_quantity: Int
  }

  type INVENTORY_NOTIFICATIONS {
    show_out_of_stock: Boolean
    alert_for_minimum_stock: Boolean
  }

  type ORDER_OPTIONS {
    order_prefix: String
    order_digits: Int
  }

  type Payment {
    cash_on_delivery: CASH_ON_DELIVERY
    bank_transfer: BANK_TRANSFER
    stripe: STRIPE
    paypal: PAYPAL
    razorpay: RAZORPAY
  }

  type CASH_ON_DELIVERY {
    enable: Boolean
    title: String
    description: String
  }

  type BANK_TRANSFER {
    enable: Boolean
    title: String
    description: String
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
    test_mode: Boolean
    sandbox_secret_key: String
    live_secret_key: String
    sandbox_publishable_key: String
    live_publishable_key: String
  }

  type PAYPAL {
    enable: Boolean
    title: String
    description: String
    test_mode: Boolean
    sandbox_secret_key: String
    live_secret_key: String
    sandbox_client_id: String
    live_client_id: String
  }

  type RAZORPAY {
    enable: Boolean
    title: String
    description: String
    test_mode: Boolean
    sandbox_secret_key: String
    live_secret_key: String
    sandbox_client_id: String
    live_client_id: String
  }

  type Notification {
    customer: ONE_SIGNAL
    seller: ONE_SIGNAL
  }

  type ONE_SIGNAL {
    app_id: String,
    rest_api_key: String
  }

  type Appearance {
    home: APPEARANCE_HOME
    theme: APPEARANCE_THEME
    mobile: APPEARANCE_MOBILE
  }

  type SLIDER {
    image: String
    link: String
    open_in_tab: Boolean
  }

  type APPEARANCE_HOME {
    slider: [SLIDER]
    add_section_in_home: ADD_SECTION_IN_HOME
    add_section_web: [ADD_SECTION_WEB]
  }
  
  type ADD_SECTION_IN_HOME {
    feature_product: Boolean
    recently_added_products: Boolean
    most_viewed_products: Boolean
    recently_bought_products: Boolean
    product_recommendation: Boolean
    products_on_sales: Boolean
    product_from_specific_categories: Boolean
    category_id: String
  }
  
  enum DISPLAY_TYPE {
    GRID
    SLIDER
  }

  type ADD_SECTION_WEB {

    label: String
    section_img: String
    visible: Boolean
    category: String
    url: String
    display_type: DISPLAY_TYPE
  }

  type APPEARANCE_MOBILE {
    slider: [SLIDER]
    mobile_section: [MOBILE_SECTION]
  }

  type MOBILE_SECTION {
    label: String
    section_img: String
    visible: Boolean
    category: String
    url: String
    display_type: DISPLAY_TYPE
  }

  type APPEARANCE_THEME {
    primary_color: String
    playstore: String
    appstore: String
    logo: String
    placeholder_image: String
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
    image: String
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
    category_id: String
  }

  input mobile_section_input {
    update_image: Upload
    label: String
    section_img: String
    visible: Boolean
    category: String
    url: String
    display_type: DISPLAY_TYPE
  }

  input add_section_web_input {
    update_image: Upload
    label: String
    section_img: String
    visible: Boolean
    category: String
    url: String
    display_type: DISPLAY_TYPE
  }

  input social_media_input {
    name: String
    handle: String
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
      from_email: String
      from_name: String
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
      addressLine1: String
      addressLine2: String
      city: String
      country: String
      state: String
      zip: String
      hour: String
      email: String
      phone_number: String
      social_media: [social_media_input]
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
      stock_display_format: String
      left_quantity: Int
    ): Setting
    updateStoreOrder(
      order_prefix: String
      order_digits: Int
    ): Setting
    updatePaymnetCOD(
      enable: Boolean
      title: String
      description: String
    ): Setting
    updatePaymnetBank(
      enable: Boolean
      title: String
      description: String
      account_details: account_details
    ): Setting
    updatePaymnetStripe(
      enable: Boolean
      title: String
      description: String
      test_mode: Boolean
      sandbox_secret_key: String
      live_secret_key: String
      sandbox_publishable_key: String
      live_publishable_key: String
    ): Setting
    updateZipCodeStatus( status: Boolean! ): Setting
    updatePaymentPaypal(
      enable: Boolean
      title: String
      description: String
      test_mode: Boolean
      sandbox_secret_key: String
      live_secret_key: String
      sandbox_client_id: String
      live_client_id: String
    ): Setting
    updatePaymentRazorpay(
      enable: Boolean
      title: String
      description: String
      razorpay_email: String
      ipn_email_notification: Boolean
      receiver_email: String
      razorpay_identity_token: String
      invoice_prefix: String
      test_mode: Boolean
      sandbox_secret_key: String
      live_secret_key: String
      sandbox_client_id: String
      live_client_id: String
    ): Setting
    updateNotificationCustomer(
      app_id: String
      rest_api_key: String
    ): Setting
    updateNotificationSeller(
      app_id: String
      rest_api_key: String
    ): Setting
    updateImageStorage(
      status:String
      s3_id: String
      s3_key: String
    ): Setting
    updateAppearanceHome(
      slider: [slider_input]
      add_section_in_home: add_section_in_home
      add_section_web: [add_section_web_input]
    ): Setting
    updateAppearanceMobile(
      slider: [slider_input]
      mobile_section: [mobile_section_input]
    ): Setting
    updateAppeanranceTheme(
      primary_color: String, 
      playstore: String
      appstore: String
      new_logo: Upload
      new_placeholder_image: Upload
      logo: String
      placeholder_image: String
    ): Setting
  }
`;
