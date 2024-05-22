const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const SeetingSchema = new Schema(
  {
    general: {
      date_format: {
        type: String,
      },
      time_zone: {
        type: String,
      },
    },
    media: {
      thumbnail: {
        width: {
          type: Number,
        },
        height: {
          type: Number,
        },
      },
      medium: {
        width: {
          type: Number,
        },
        height: {
          type: Number,
        },
      },
      large: {
        width: {
          type: Number,
        },
        height: {
          type: Number,
        },
      },
    },
    smtp: {
      server: {
        type: String,
      },
      username: {
        type: String,
      },
      password: {
        type: String,
      },
      port: {
        type: Number,
      },
    },
    imageStorage: {
      status: {
        type: String,
      },
      s3_id: {
        type: String,
      },
      s3_key: {
        type: String,
      },
    },
    seo: {
      meta_title: {
        type: String,
      },
      meta_tag: {
        type: String,
      },
      meta_description: {
        type: String,
      },
    },
    store: {
      currency_options: {
        currency: {
          type: String,
        },
        currency_position: {
          type: String,
        },
        thousand_separator: {
          type: String,
        },
        decimal_separator: {
          type: String,
        },
        number_of_decimals: {
          type: Number,
        },
      },
      store_address: {
        addressLine1: {
          type: String,
        },
        addressLine2: {
          type: String,
        },
        city: {
          type: String,
        },
        country: {
          type: String,
        },
        state: {
          type: String,
        },
        zip: {
          type: String,
        },
        hour: {
          type: String
        },
        email: {
          type: String
        },
        phone_number: {
          type: Number
        },
        social_media: [
          {
            name: String,
            handle: String
          }
        ]
      },
      measurements: {
        weight_unit: {
          type: String,
        },
        dimensions_unit: {
          type: String,
        },
      },
      inventory: {
        manage_stock: {
          type: Boolean,
        },
        notifications: {
          show_out_of_stock: {
            type: Boolean,
          },
          alert_for_minimum_stock: {
            type: Boolean,
          },
        },
        notification_recipients: {
          type: String,
        },
        low_stock_threshold: {
          type: Number,
        },
        stock_display_format: {
          type: String,
        },
        left_quantity: {
          type: Number,
        },
      },
      order_options: {
        order_prefix: {
          type: String,
        },
        order_digits: {
          type: Number
        }
      }
    },
    payment: {
      cash_on_delivery: {
        enable: {
          type: Boolean,
        },
        title: {
          type: String,
        },
        description: {
          type: String,
        },
      },
      bank_transfer: {
        enable: {
          type: Boolean,
        },
        title: {
          type: String,
        },
        description: {
          type: String,
        },
        account_details: {
          account_name: {
            type: String,
          },
          account_number: {
            type: String,
          },
          bank_name: {
            type: String,
          },
          short_code: {
            type: String,
          },
          iban: {
            type: String,
          },
          bic_swift: {
            type: String,
          },
        },
      },
      stripe: {
        enable: {
          type: Boolean,
        },
        title: {
          type: String,
        },
        description: {
          type: String,
        },
        test_mode: {
          type: Boolean,
        },
        webhook_key: {
          type: String,
        },
        sandbox_secret_key: {
          type: String
        },
        live_secret_key: { 
          type: String
        },
        sandbox_publishable_key: {
          type: String
        },
        live_publishable_key: {
          type: String
        },

      },
      paypal: {
        enable: {
          type: Boolean,
        },
        title: {
          type: String,
        },
        description: {
          type: String,
        },
        test_mode: {
          type: Boolean,
        },
        sandbox_secret_key: {
          type: String
        },
        live_secret_key: { 
          type: String
        },
        sandbox_client_id: {
          type: String
        },
        live_client_id: {
          type: String
        },
      },
      razorpay: {
        enable: {
          type: Boolean
        },
        title: {
          type: String
        },
        description: {
          type: String
        },
        test_mode: {
          type: Boolean
        },
        sandbox_secret_key: {
          type: String
        },
        live_secret_key: { 
          type: String
        },
        sandbox_client_id: {
          type: String
        },
        live_client_id: {
          type: String
        },

      }
    },
    notification: {
      one_signal: {
        app_id: {
          type: String,
        },
        rest_api_key: {
          type: String,
        },
      }
    },
    appearance: {
      home: {
        slider: [
          {
            // image: {
            //   original: {
            //     type: String,
            //   },
            //   large: {
            //     type: String,
            //   },
            //   medium: {
            //     type: String,
            //   },
            //   thumbnail: {
            //     type: String,
            //   },
            // },
            image: {
              type: String
            },
            link: {
              type: String,
            },
            open_in_tab: {
              type: Boolean,
            },
          },
        ],
        add_section_in_home: {
          feature_product: {
            type: Boolean,
          },
          recently_added_products: {
            type: Boolean,
          },
          most_viewed_products: {
            type: Boolean,
          },
          recently_bought_products: {
            type: Boolean,
          },
          product_recommendation: {
            type: Boolean,
          },
          products_on_sales: {
            type: Boolean,
          },
          product_from_specific_categories: {
            type: Boolean,
          },
          category_id: {
            type: String
          }
        },
        add_section_web: []
      },
      mobile: {
        slider: [
          {
            image: {
              type: String
            },
            link: {
              type: String,
            },
            open_in_tab: {
              type: Boolean,
            },
          },
        ],
        mobile_section: [],
      },
      theme: {
        primary_color: {
          type: String,
        },
        playstore: {
          type: String
        },
        appstore: {
          type: String
        },
        logo: {
          type: String
        },
        placeholder_image: {
          type: String
        }
      },
    },
    zipcode: [
      {
        zipcode: {
          type: String
        }
      }
    ]
  },
  {
    timestamps: true,
  }
);

var Settings = (module.exports = mongoose.model("Setting", SeetingSchema));

module.exports.createSettings = async () => {
  const settings = await Settings.findOne({});
  if (settings) {
    return;
  }

  var newSettings = new Settings({
    general: {
      date_format: "1",
      time_zone: "Africa/Addis_Ababa",
    },
    media: {
      thumbnail: {
        width: 150,
        height: 150,
      },
      medium: {
        width: 300,
        height: 300,
      },
      large: {
        width: 1024,
        height: 1024,
      },
    },
    smtp: {
      server: "smtp.gmail.com",
      username: "smtp@gmail.com",
      password: "123456",
      port: 587,
    },
    seo: {
      meta_title: "Meta Title",
      meta_tag: "Ecommerce, Shop",
      meta_description: "Description comes here",
    },
    store: {
      currency_options: {
        currency: "usd",
        currency_position: "left",
        thousand_separator: ",",
        decimal_separator: ".",
        number_of_decimals: 2,
      },
      store_address: {
        addressLine1: "Central Perk",
        addressLine2: "",
        city: "New York",
        country: "USA",
        state: "New York",
        zip: "100104",
        hour: "Mon to Fri, 9am to 6pm",
        email: "example@gmail.com",
        phone_number: "9898989898",
        social_media: [
          {
            name: "Facebook",
            handle: "",
          },
          {
            name: "Instagram",
            handle: "",
          },
          {
            name: "Pinterest",
            handle: "",
          },
          {
            name: "Youtube",
            handle: "",
          },
          {
            name: "Twitter",
            handle: "",
          }
        ]
      },
      measurements: {
        weight_unit: "kg",
        dimensions_unit: "cm",
      },
      inventory: {
        manage_stock: true,
        notifications: {
          show_out_of_stock: true,
          alert_for_minimum_stock: true,
        },
        notification_recipients: "abc@gmail.com, xyz@gmail.com",
        low_stock_threshold: 5,
        stock_display_format: "1",
        left_quantity: "0"
      },
      order_options: {
        order_prefix: "#",
        order_digits: 5
      }
    },
    payment: {
      cash_on_delivery: {
        enable: true,
        title: "Title comes here",
        description: "Description comes here",
      },
      bank_transfer: {
        enable: true,
        title: "Title comes here",
        description: "Description comes here",
        account_details: {
          account_name: "",
          account_number: "",
          bank_name: "",
          short_code: "",
          iban: "",
          bic_swift: "",
        },
      },
      stripe: {
        enable: true,
        title: "",
        description: "",
        test_mode: true,
        sandbox_secret_key: "",
        live_secret_key: "",
        sandbox_publishable_key: "",
        live_publishable_key: ""
      },
      paypal: {
        enable: true,
        title: "",
        description: "",
        test_mode: true,
        sandbox_secret_key: "",
        live_secret_key: "",
        sandbox_client_id: "",
        live_client_id: ""
      },
      razorpay: {
        enable: true,
        title: "",
        description: "",
        test_mode: true,
        sandbox_secret_key: "",
        live_secret_key: "",
        sandbox_client_id: "",
        live_client_id: ""
      },
    },
    notification: {
      one_signal: {
        app_id: "",
        rest_api_key: ""
      }
    },
    appearance: {
      home: {
        slider: [
          {
            image: "",
            link: "https://www.google.com/",
            open_in_tab: true,
          },
        ],
        add_section_in_home: {
          feature_product: true,
          recently_added_products: false,
          most_viewed_products: false,
          recently_bought_products: false,
          product_recommendation: false,
          products_on_sales: false,
          product_from_specific_categories: false,
        },

        add_section_web: [
          {
            label: "Featured Product",
            name: "feature_product",
            visible: true,
          },
          {
            label: "Recently Added Products",
            name: "recently_added_products",
            visible: true,
          },
          {
            label: "Products On Sales",
            name: "products_on_sales",
            visible: true,
          },
          // {
          //   label: "Product Recommendation",
          //   name: "product_recommendation",
          //   visible: true,
          // },
          {
            label: "Product from Specific Category",
            name: "product_from_specific_category",
            category: null,
            visible: true,
          },
        ],

      },
      theme: {
        primary_color: "#154050",
        playstore: "https://play.google.com/store/apps/details?id=com.ravendel",
        appstore: "https://apps.apple.com/us/app/ravendel/id1351162341",
        logo: "",
        placeholder_image: ""
      },
      mobile: {
        slider: [
          {
            image: "",
            link: "https://www.google.com/",
            open_in_tab: true,
          },
        ],
        mobile_section: [
          {
            label: "Featured Product",
            section_img: "",
            visible: false,
            url: "feature_product",
          },
          {
            label: "Recently Added Products",
            section_img: "",
            visible: false,
            url: "recently_added_products",
          },
          {
            label: "Products On Sales",
            section_img: "",
            visible: false,
            url: "products_on_sales",
          },
          // {
          //   label: "Product Recommendation",
          //   section_img: "",
          //   visible: false,
          //   url: "product_recommendation",
          // },
          {
            label: "Product from Specific Category",
            section_img: "",
            visible: false,
            url: "product_from_specific_categories",
            category: null
          },
        ],
      }
    }
  });

  await newSettings.save();
};
