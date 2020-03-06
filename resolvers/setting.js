const Setting = require("../models/Setting");
const {
  isEmpty,
  putError,
  checkError,
  imageUpload,
  imageUnlink,
  checkToken
} = require("../config/helpers");
//const setting = require("../validations/setting");
//const sanitizeHtml = require("sanitize-html");

module.exports = {
  Query: {
    setting: async (root, args) => {
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
    }
  },
  Mutation: {
    addSetting: async (root, args, { id }) => {
      //checkToken(id);
      try {
        const newBlog = new Setting({
          site_name: args.site_name,
          menu: args.menu,
          footer_copyright: args.footer_copyright,
          theme: args.theme
        });

        await newBlog.save();
        return await Setting.findOne({});
      } catch (error) {
        error = checkError(error);
        throw new Error(error.custom_message);
      }
    },
    updateSetting: async (root, args, { id }) => {
      //checkToken(id);
      try {
        const setting = await Setting.findOne({});
        /* if (args.updated_site_logo) {
          let imgObject = await imageUpload(
            args.updated_site_logo,
            "/assets/images/site/"
          );
          if (imgObject.success === false) {
            throw putError(imgObject.message);
          } else {
            imageUnlink(setting.site_logo);
            setting.site_logo = imgObject.data;
          }
        } */

        setting.site_name = args.site_name;
        setting.menu = args.menu;
        setting.footer_copyright = args.footer_copyright;
        setting.theme = args.theme;
        setting.updated = Date.now();

        await setting.save();
        return await Setting.findOne({});
      } catch (error) {
        error = checkError(error);
        throw new Error(error.custom_message);
      }
    }
  }
};
