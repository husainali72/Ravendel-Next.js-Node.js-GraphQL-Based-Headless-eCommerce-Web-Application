const Setting = require("../models/Setting");
const {
  isEmpty,
  putError,
  checkError,
  imageUpload,
  imageUnlink,
  checkToken,
  getdate,
} = require("../config/helpers");
//const setting = require("../validations/setting");
//const sanitizeHtml = require("sanitize-html");

module.exports = {
  Query: {
    getSettings: async (root, args) => {
      try {
        const setting = await Setting.findOne({});
        if (!setting) {
          throw putError("not found");
        }
        return setting;
      } catch (error) {
        error = checkError(error);
        throw new Error(error.custom_message);
      }
    },
    getDateformat: async (root, args) => {
      try {
        const dates = [];
        for (let i = 1; i <= 4; i++) {
          dates.push({
            id: i,
            value: getdate(`${i}`),
          });
        }

        return dates;
      } catch (error) {
        error = checkError(error);
        throw new Error(error.custom_message);
      }
    },
  },
  Mutation: {
    updateGeneral: async (root, args, { id }) => {
      checkToken(id);
      try {
        const setting = await Setting.findOne({});
        setting.general.date_format = args.date_format;
        setting.general.time_zone = args.time_zone;
        return await setting.save();
        //return await Setting.findOne({});
      } catch (error) {
        error = checkError(error);
        throw new Error(error.custom_message);
      }
    },
    updateMedia: async (root, args, { id }) => {
      checkToken(id);
      try {
        const setting = await Setting.findOne({});
        setting.media.thumbnail.width = args.thumbnail.width;
        setting.media.thumbnail.height = args.thumbnail.height;

        setting.media.medium.width = args.medium.width;
        setting.media.medium.height = args.medium.height;

        setting.media.large.width = args.large.width;
        setting.media.large.height = args.large.height;
        return await setting.save();
        //return await Setting.findOne({});
      } catch (error) {
        error = checkError(error);
        throw new Error(error.custom_message);
      }
    },
    updateSMTP: async (root, args, { id }) => {
      checkToken(id);
      try {
        const setting = await Setting.findOne({});
        setting.smtp.server = args.server;
        setting.smtp.username = args.username;
        setting.smtp.password = args.password;
        setting.smtp.port = args.port;
        return await setting.save();
        //return await Setting.findOne({});
      } catch (error) {
        error = checkError(error);
        throw new Error(error.custom_message);
      }
    },
    updateSEO: async (root, args, { id }) => {
      checkToken(id);
      try {
        const setting = await Setting.findOne({});
        setting.seo.meta_title = args.meta_title;
        setting.seo.meta_tag = args.meta_tag;
        setting.seo.meta_description = args.meta_description;
        return await setting.save();
      } catch (error) {
        error = checkError(error);
        throw new Error(error.custom_message);
      }
    },
    updateStoreCurrency: async (root, args, { id }) => {
      checkToken(id);
      try {
        const setting = await Setting.findOne({});
        setting.store.currency_options.currency = args.currency;
        setting.store.currency_options.currency_position =
          args.currency_position;
        setting.store.currency_options.thousand_separator =
          args.thousand_separator;
        setting.store.currency_options.decimal_separator =
          args.decimal_separator;
        setting.store.currency_options.number_of_decimals =
          args.number_of_decimals;
        return await setting.save();
      } catch (error) {
        error = checkError(error);
        throw new Error(error.custom_message);
      }
    },
    updateStoreAddress: async (root, args, { id }) => {
      checkToken(id);
      try {
        const setting = await Setting.findOne({});
        setting.store.store_address.address_line1 = args.address_line1;
        setting.store.store_address.address_line2 = args.address_line2;
        setting.store.store_address.city = args.city;
        setting.store.store_address.country = args.country;
        setting.store.store_address.state = args.state;
        setting.store.store_address.zip = args.zip;
        return await setting.save();
      } catch (error) {
        error = checkError(error);
        throw new Error(error.custom_message);
      }
    },
    updateStoreMeasurements: async (root, args, { id }) => {
      checkToken(id);
      try {
        const setting = await Setting.findOne({});
        setting.store.measurements.weight_unit = args.weight_unit;
        setting.store.measurements.dimensions_unit = args.dimensions_unit;
        return await setting.save();
      } catch (error) {
        error = checkError(error);
        throw new Error(error.custom_message);
      }
    },
    updateStoreInventory: async (root, args, { id }) => {
      checkToken(id);
      try {
        const setting = await Setting.findOne({});
        setting.store.inventory.manage_stock = args.manage_stock;
        setting.store.inventory.notifications.show_out_of_stock =
          args.notifications.show_out_of_stock;
        setting.store.inventory.notifications.alert_for_minimum_stock =
          args.notifications.alert_for_minimum_stock;
        setting.store.inventory.notification_recipients =
          args.notification_recipients;
        setting.store.inventory.low_stock_threshold = args.low_stock_threshold;
        setting.store.inventory.out_of_stock_threshold =
          args.out_of_stock_threshold;
        setting.store.inventory.out_of_stock_visibility =
          args.out_of_stock_visibility;
        setting.store.inventory.stock_display_format =
          args.stock_display_format;

        return await setting.save();
      } catch (error) {
        error = checkError(error);
        throw new Error(error.custom_message);
      }
    },
    updatePaymnetCOD: async (root, args, { id }) => {
      checkToken(id);
      try {
        const setting = await Setting.findOne({});
        setting.paymnet.cash_on_delivery.enable = args.enable;
        setting.paymnet.cash_on_delivery.title = args.title;
        setting.paymnet.cash_on_delivery.description = args.description;
        setting.paymnet.cash_on_delivery.instructions = args.instructions;

        return await setting.save();
      } catch (error) {
        error = checkError(error);
        throw new Error(error.custom_message);
      }
    },
    updatePaymnetBank: async (root, args, { id }) => {
      checkToken(id);
      try {
        const setting = await Setting.findOne({});
        setting.paymnet.bank_transfer.enable = args.enable;
        setting.paymnet.bank_transfer.title = args.title;
        setting.paymnet.bank_transfer.description = args.description;
        setting.paymnet.bank_transfer.instructions = args.instructions;
        setting.paymnet.bank_transfer.account_details.account_name =
          args.account_details.account_name;
        setting.paymnet.bank_transfer.account_details.account_number =
          args.account_details.account_number;
        setting.paymnet.bank_transfer.account_details.bank_name =
          args.account_details.bank_name;
        setting.paymnet.bank_transfer.account_details.short_code =
          args.account_details.short_code;
        setting.paymnet.bank_transfer.account_details.iban =
          args.account_details.iban;
        setting.paymnet.bank_transfer.account_details.bic_swift =
          args.account_details.bic_swift;

        return await setting.save();
      } catch (error) {
        error = checkError(error);
        throw new Error(error.custom_message);
      }
    },
    updatePaymnetStripe: async (root, args, { id }) => {
      checkToken(id);
      try {
        const setting = await Setting.findOne({});
        setting.paymnet.stripe.enable = args.enable;
        setting.paymnet.stripe.title = args.title;
        setting.paymnet.stripe.description = args.description;
        setting.paymnet.stripe.inline_credit_card_form =
          args.inline_credit_card_form;
        setting.paymnet.stripe.statement_descriptor = args.statement_descriptor;
        setting.paymnet.stripe.capture = args.capture;
        setting.paymnet.stripe.test_mode = args.test_mode;
        setting.paymnet.stripe.publishable_key = args.publishable_key;
        setting.paymnet.stripe.secret_key = args.secret_key;
        setting.paymnet.stripe.webhook_key = args.webhook_key;
        return await setting.save();
      } catch (error) {
        error = checkError(error);
        throw new Error(error.custom_message);
      }
    },
    updatePaymentPaypal: async (root, args, { id }) => {
      checkToken(id);
      try {
        const setting = await Setting.findOne({});
        setting.paymnet.paypal.enable = args.enable;
        setting.paymnet.paypal.title = args.title;
        setting.paymnet.paypal.description = args.description;
        setting.paymnet.paypal.paypal_email = args.paypal_email;
        setting.paymnet.paypal.ipn_email_notification =
          args.ipn_email_notification;
        setting.paymnet.paypal.receiver_email = args.receiver_email;
        setting.paymnet.paypal.paypal_identity_token =
          args.paypal_identity_token;
        setting.paymnet.paypal.invoice_prefix = args.invoice_prefix;
        setting.paymnet.paypal.test_mode = args.test_mode;
        setting.paymnet.paypal.api_username = args.api_username;
        setting.paymnet.paypal.api_password = args.api_password;
        setting.paymnet.paypal.api_signature = args.api_signature;
        return await setting.save();
      } catch (error) {
        error = checkError(error);
        throw new Error(error.custom_message);
      }
    },
    updateAppearanceHome: async (root, args, { id }) => {
      checkToken(id);
      try {
        const setting = await Setting.findOne({});

        var slider = [];
        let imgObject = {};
        for (let i in args.slider) {
          if (args.slider[i].update_image) {
            imgObject = await imageUpload(
              args.slider[i].update_image[0],
              "/assets/images/setting/"
            );

            if (imgObject.success === false) {
              throw putError(imgObject.message);
            }
          }

          slider.push({
            image: imgObject.data || args.slider[i].image,
            link: args.slider[i].link,
            open_in_tab: args.slider[i].open_in_tab,
          });
        }

        setting.appearance.home.slider = slider;
        setting.appearance.home.add_section_in_home = args.add_section_in_home;
        return await setting.save();
      } catch (error) {
        error = checkError(error);
        throw new Error(error.custom_message);
      }
    },
    updateAppeanranceTheme: async (root, args, { id }) => {
      checkToken(id);
      try {
        const setting = await Setting.findOne({});
        let imgObject = "";
        if (args.new_logo) {
          imgObject = await imageUpload(
            args.new_logo[0],
            "/assets/images/setting/"
          );

          if (imgObject.success === false) {
            throw putError(imgObject.message);
          }
        }

        setting.appearance.theme.primary_color = args.primary_color;
        setting.appearance.theme.logo = imgObject.data || args.logo;
        return await setting.save();
      } catch (error) {
        error = checkError(error);
        throw new Error(error.custom_message);
      }
    },
  },
};
