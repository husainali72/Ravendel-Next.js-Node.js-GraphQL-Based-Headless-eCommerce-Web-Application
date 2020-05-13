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
        address_line1: {
          type: String,
        },
        address_line2: {
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
        out_of_stock_threshold: {
          type: Number,
        },
        out_of_stock_visibility: {
          type: Boolean,
        },
        stock_display_format: {
          type: String,
        },
      },
    },
    paymnet: {
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
        instructions: {
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
        instructions: {
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
        inline_credit_card_form: {
          type: Boolean,
        },
        statement_descriptor: {
          type: String,
        },
        capture: {
          type: Boolean,
        },
        test_mode: {
          type: Boolean,
        },
        publishable_key: {
          type: String,
        },
        secret_key: {
          type: String,
        },
        webhook_key: {
          type: String,
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
        paypal_email: {
          type: String,
        },
        ipn_email_notification: {
          type: String,
        },
        receiver_email: {
          type: String,
        },
        paypal_identity_token: {
          type: String,
        },
        invoice_prefix: {
          type: String,
        },
        test_mode: {
          type: Boolean,
        },
        api_username: {
          type: String,
        },
        api_password: {
          type: String,
        },
        api_signature: {
          type: String,
        },
      },
    },
    appearance: {
      home: {
        slider: [
          {
            image: {
              original: {
                type: String,
              },
              large: {
                type: String,
              },
              medium: {
                type: String,
              },
              thumbnail: {
                type: String,
              },
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
        },
      },
      theme: {
        primary_color: {
          type: String,
        },
      },
    },
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
        currency: "dollar",
        currency_position: "left",
        thousand_separator: ",",
        decimal_separator: ".",
        number_of_decimals: 2,
      },
      store_address: {
        address_line1: "Central Perk",
        address_line2: "",
        city: "New York",
        country: "USA",
        state: "New York",
        zip: "100104",
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
        out_of_stock_threshold: 1,
        out_of_stock_visibility: true,
        stock_display_format: "1",
      },
    },
    paymnet: {
      cash_on_delivery: {
        enable: true,
        title: "Title comes here",
        description: "Description comes here",
        instructions: "Instruction comes here",
      },
      bank_transfer: {
        enable: true,
        title: "Title comes here",
        description: "Description comes here",
        instructions: "Instruction comes here",
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
        inline_credit_card_form: true,
        statement_descriptor: "",
        capture: true,
        test_mode: true,
        publishable_key: "",
        secret_key: "",
        webhook_key: "",
      },
      paypal: {
        enable: true,
        title: "",
        description: "",
        paypal_email: "",
        ipn_email_notification: "",
        receiver_email: "abc@gmail.com",
        paypal_identity_token: "",
        invoice_prefix: "",
        test_mode: true,
        api_username: "",
        api_password: "",
        api_signature: "",
      },
    },
    appearance: {
      home: {
        slider: [
          {
            image: {
              original: "",
              large: "",
              medium: "",
              thumbnail:
                "/assets/images/blog/feature/thumbnail/1587797503342-gallery-4-thumb.jpg",
            },
            link: "https://www.google.com/",
            open_in_tab: true,
          },
          {
            image: {
              original: "",
              large: "",
              medium: "",
              thumbnail:
                "/assets/images/blog/feature/thumbnail/1587797503342-gallery-4-thumb.jpg",
            },
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
      },
      theme: {
        primary_color: "#154050",
      },
    },
  });

  await newSettings.save();
};
