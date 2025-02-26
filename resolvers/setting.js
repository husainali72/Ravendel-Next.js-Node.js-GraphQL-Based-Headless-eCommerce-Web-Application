const Setting = require("../models/Setting");
const Zipcode = require("../models/Zipcode");
const Categories = require("../models/ProductCat");
const {
  isEmpty,
  putError,
  checkError,
  imageUpload,
  imageUnlink,
  checkToken,
  getdate,
  addZipcodes,
  MESSAGE_RESPONSE,
} = require("../config/helpers");
//const setting = require("../validations/setting");
//const sanitizeHtml = require("sanitize-html");
const { checkAwsFolder } = require("../config/aws");
const fs = require("fs");

var sdir = "./assets/images/setting";
// var ldir = './assets/images/setting/large';
// var mdir = './assets/images/setting/medium';
// var tdir = './assets/images/setting/thumbnail';
// var odir = './assets/images/setting/original';

if (!fs.existsSync(sdir)) {
  fs.mkdirSync(sdir);
}
// if (!fs.existsSync(ldir)){
//   fs.mkdirSync(ldir);
// }
// if (!fs.existsSync(mdir)){
//   fs.mkdirSync(mdir);
// }
// if (!fs.existsSync(odir)){
//   fs.mkdirSync(odir);
// }
// if (!fs.existsSync(tdir)){
//   fs.mkdirSync(tdir);
// }

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
  Setting: {
    zipcode: async (root, args) => {
      try {
        const zipcodes = await Zipcode.find();
        const setting = await Setting.find();
        if (zipcodes)
          return { status: setting[0].zipcode.status, zipcodes: zipcodes };
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
        setting.smtp.from_email = args.from_email;
        setting.smtp.from_name = args.from_name;
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
        setting.store.store_address.addressLine1 = args.addressLine1;
        setting.store.store_address.addressLine2 = args.addressLine2;
        setting.store.store_address.city = args.city;
        setting.store.store_address.country = args.country;
        setting.store.store_address.state = args.state;
        setting.store.store_address.zip = args.zip;
        setting.store.store_address.hour = args.hour;
        setting.store.store_address.email = args.email;
        setting.store.store_address.phone_number = args.phone_number;

        let socialMedia = []
        for (let media of args.social_media) {
          socialMedia.push({
            name: media.name,
            handle: media.handle,
          })
        }

        setting.store.store_address.social_media = socialMedia;
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
        setting.store.inventory.stock_display_format =
          args.stock_display_format;
        setting.store.inventory.left_quantity = args.left_quantity;

        return await setting.save();
      } catch (error) {
        error = checkError(error);
        throw new Error(error.custom_message);
      }
    },
    updateStoreOrder: async (root, args, { id }) => {
      checkToken(id);
      try {
        const setting = await Setting.findOne({});
        let { order_prefix, order_digits } = args
        setting.store.order_options.order_prefix = order_prefix
        setting.store.order_options.order_digits = order_digits
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
        setting.payment.cash_on_delivery.enable = args.enable;
        setting.payment.cash_on_delivery.title = args.title;
        setting.payment.cash_on_delivery.description = args.description;
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
        setting.payment.bank_transfer.enable = args.enable;
        setting.payment.bank_transfer.title = args.title;
        setting.payment.bank_transfer.description = args.description;
        setting.payment.bank_transfer.account_details.account_name =
          args.account_details.account_name;
        setting.payment.bank_transfer.account_details.account_number =
          args.account_details.account_number;
        setting.payment.bank_transfer.account_details.bank_name =
          args.account_details.bank_name;
        setting.payment.bank_transfer.account_details.short_code =
          args.account_details.short_code;
        setting.payment.bank_transfer.account_details.iban =
          args.account_details.iban;
        setting.payment.bank_transfer.account_details.bic_swift =
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
        setting.payment.stripe.enable = args.enable;
        setting.payment.stripe.title = args.title;
        setting.payment.stripe.description = args.description;
        setting.payment.stripe.test_mode = args.test_mode;
        setting.payment.stripe.sandbox_secret_key = args.sandbox_secret_key;
        setting.payment.stripe.live_secret_key = args.live_secret_key;
        setting.payment.stripe.sandbox_publishable_key = args.sandbox_publishable_key;
        setting.payment.stripe.live_publishable_key = args.live_publishable_key;
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
        setting.payment.paypal.enable = args.enable;
        setting.payment.paypal.title = args.title;
        setting.payment.paypal.description = args.description;
        setting.payment.paypal.test_mode = args.test_mode;
        setting.payment.paypal.sandbox_secret_key = args.sandbox_secret_key;
        setting.payment.paypal.live_secret_key = args.live_secret_key;
        setting.payment.paypal.sandbox_client_id = args.sandbox_client_id;
        setting.payment.paypal.live_client_id = args.live_client_id;
        return await setting.save();
      } catch (error) {
        error = checkError(error);
        throw new Error(error.custom_message);
      }
    },
    updatePaymentRazorpay: async (root, args, { id }) => {
      checkToken(id);
      try {
        const setting = await Setting.findOne({});
        setting.payment.razorpay.enable = args.enable;
        setting.payment.razorpay.title = args.title;
        setting.payment.razorpay.description = args.description;
        setting.payment.razorpay.test_mode = args.test_mode;
        setting.payment.razorpay.sandbox_secret_key = args.sandbox_secret_key;
        setting.payment.razorpay.live_secret_key = args.live_secret_key;
        setting.payment.razorpay.sandbox_client_id = args.sandbox_client_id;
        setting.payment.razorpay.live_client_id = args.live_client_id;
        return await setting.save();
      } catch (error) {
        error = checkError(error);
        throw new Error(error.custom_message);
      }
    },
    updateNotificationCustomer: async (root, args, { id }) => {
      checkToken(id);
      try {
        await checkAwsFolder('setting');
        const setting = await Setting.findOne({});
        console.log(args)
        setting.notification.customer.app_id = args.app_id
        setting.notification.customer.rest_api_key = args.rest_api_key
        return await setting.save();
      } catch (error) {
        error = checkError(error);
        throw new Error(error.custom_message);
      }
    },
    updateNotificationSeller: async (root, args, { id }) => {
      checkToken(id);
      try {
        await checkAwsFolder('setting');
        const setting = await Setting.findOne({});
        setting.notification.seller.app_id = args.app_id
        setting.notification.seller.rest_api_key = args.rest_api_key
        return await setting.save();
      } catch (error) {
        error = checkError(error);
        throw new Error(error.custom_message);
      }
    },
    updateImageStorage: async (root, args, { id }) => {
      checkToken(id);
      try {
        await checkAwsFolder('setting');
        const setting = await Setting.findOne({});
        setting.imageStorage.status = args.status
        if (args.status === 's3') {
          setting.imageStorage.s3_id = args.s3_id
          setting.imageStorage.s3_key = args.s3_key
        } else if (args.status !== 's3') {
          setting.imageStorage.s3_id = ''
          setting.imageStorage.s3_key = ''
        }
        return await setting.save();
      } catch (error) {
        error = checkError(error);
        throw new Error(error.custom_message);
      }
    },

    updateZipCodeStatus: async (root, args, context) => {
      try {
        // Find the settings document
        const setting = await Setting.findOne({});
        if (!setting) {
          throw new Error("Settings not found.");
        }

        // Update the status field in the zipcode object
        setting.zipcode.status = args.status;

        // Save the changes
        await setting.save();

        return MESSAGE_RESPONSE("UpdateSuccess", "Zipcode", true);
      } catch (error) {
        console.error("Error updating ZIP code status:", error);
        throw new Error(
          error.custom_message || "Failed to update ZIP code status."
        );
      }
    },

    updateAppearanceHome: async (root, args, { id }) => {
      checkToken(id);
      try {
        await checkAwsFolder('setting');
        const setting = await Setting.findOne({});
        //console.log('Slider',setting.appearance.home.slider);
        // console.log('Argument',args.slider);

        var slider = [];
        for (let i in args.slider) {
          let imgObject = {};
          if (args.slider[i].update_image) {
            imgObject = await imageUpload(
              args.slider[i].update_image[0].file,
              "assets/images/setting/", "Setting"
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

        let add_section_web = [];
        for (let i in args.add_section_web) {
          let imgObject = {};
          if (args.add_section_web[i].update_image) {
            imgObject = await imageUpload(
              args.add_section_web[i].update_image[0].file,
              "assets/images/setting/", "Setting"
            );

            if (imgObject.success === false) {
              throw putError(imgObject.message);
            }
          }

          add_section_web.push({
            label: args.add_section_web[i].label,
            section_img: imgObject.data || args.add_section_web[i].section_img,
            visible: args.add_section_web[i].visible,
            category: args.add_section_web[i].category ? args.add_section_web[i].category : null,
            url: args.add_section_web[i].url,
            display_type : args.add_section_web[i].display_type
          });
        }


        // if(setting.appearance.home.add_section_in_home.product_from_specific_categories === true) {
        //   setting.appearance.home.add_section_in_home.category_id = args.add_section_in_home.category_id
        // }else{
        //   setting.appearance.home.add_section_in_home.category_id = ""
        // }

        // var add_section_web = [];
        // for (let i in args.add_section_web) {
        //   add_section_web.push({
        //     label: args.add_section_web[i].label,
        //     name: args.add_section_web[i].name,
        //     visible: args.add_section_web[i].visible
        //   });
        // }

        setting.appearance.home.slider = slider;
        setting.appearance.home.add_section_in_home = args.add_section_in_home;
        setting.appearance.home.add_section_web = add_section_web;
        return await setting.save();
      } catch (error) {
        error = checkError(error);
        throw new Error(error.custom_message);
      }
    },
    updateAppearanceMobile: async (root, args, { id }) => {
      checkToken(id);
      try {
        await checkAwsFolder('setting');
        const setting = await Setting.findOne({});

        var slider = [];
        for (let i in args.slider) {
          let imgObject = {};
          if (args.slider[i].update_image) {
            imgObject = await imageUpload(
              args.slider[i].update_image[0].file,
              "assets/images/setting/", "Setting"
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

        var mobile_section = [];
        for (let i in args.mobile_section) {
          let imgObject = {};
          if (args.mobile_section[i].update_image) {
            imgObject = await imageUpload(
              args.mobile_section[i].update_image[0].file,
              "assets/images/setting/", "Setting"
            );

            if (imgObject.success === false) {
              throw putError(imgObject.message);
            }
          }

          mobile_section.push({
            label: args.mobile_section[i].label,
            section_img: imgObject.data || args.mobile_section[i].section_img,
            url: args.mobile_section[i].url,
            visible: args.mobile_section[i].visible,
            category: args.mobile_section[i].category ? args.mobile_section[i].category : null,
            display_type : args.mobile_section[i].display_type
          });
        }

        setting.appearance.mobile.slider = slider;
        setting.appearance.mobile.mobile_section = mobile_section;
        return await setting.save();
      } catch (error) {
        error = checkError(error);
        throw new Error(error.custom_message);
      }
    },
    updateAppeanranceTheme: async (root, args, { id }) => {
      checkToken(id);
      try {
        await checkAwsFolder('setting');
        const setting = await Setting.findOne({});
        let logoObject = {};
        if (args.new_logo) {
          logoObject = await imageUpload(
            args.new_logo[0].file,
            "assets/images/setting/", "Setting"
          );

          if (logoObject.success === false) {
            throw putError(logoObject.message);
          }
        }
        let placeholderObject = {};
        if (args.new_placeholder_image) {
          placeholderObject = await imageUpload(
            args.new_placeholder_image[0].file,
            "assets/images/setting/", "Setting"
          );

          if (placeholderObject.success === false) {
            throw putError(placeholderObject.message);
          }
        }

        const theme = {
          primary_color: args.primary_color,
          playstore: args.playstore,
          appstore: args.appstore,
          logo: logoObject.data || args.logo,
          placeholder_image: placeholderObject.data || args.placeholder_image
        };

        setting.appearance.theme = theme
        return await setting.save();
      } catch (error) {
        error = checkError(error);
        throw new Error(error.custom_message);
      }
    },
  },
};
