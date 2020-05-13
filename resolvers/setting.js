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
  },
};
