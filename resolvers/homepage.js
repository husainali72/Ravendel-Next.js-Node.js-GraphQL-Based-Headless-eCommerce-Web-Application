const Setting = require("../models/Setting");
const brands = require("../models/Brand");
const products = require("../models/Product");
module.exports = {
  Query: {
    getMobileHomePage: async (root, args) => {
      try {
        const setting = await Setting.findOne({});
        if (!setting) {
          throw putError("not found");
        }
        let output = {};
        output.homepageBrands = await brands.find({});
        output.sections = [];

        let sections = setting.appearance.mobile.mobile_section;

        for (const section of sections) {
          if (section.visible) {
            let output_section = {};
            output_section.name = section.label;
            output_section.imageurl = section.section_img;

            switch (section.label) {
              case "Featured Product":
                output_section.products = await products
                  .find({ featured_product: true, status: "Publish" })
                  .limit(10);
                break;

              case "Recently Added Products":
                output_section.products = await products
                  .find({ status: "Publish" })
                  .sort({ $natural: -1 })
                  .limit(10);
                break;

              case "Products On Sales":
                output_section.products = await products
                  .find({
                    $and: [
                      {
                        status: "Publish",
                      },
                      {
                        "pricing.sellprice": {
                          $ne: null,
                        },
                      },
                      {
                        "pricing.sellprice": {
                          $ne: 0,
                        },
                      },
                    ],
                  })
                  .sort({ $natural: -1 })
                  .limit(10);
                break;

              case "Product from Specific Categories":
                let category_id = section.category;
                output_section.products = await products
                  .find({
                    status: "Publish",
                    categoryId: { $in: category_id },
                  })
                  .sort({ $natural: -1 })
                  .limit(10);
                break;

              default:
                break;
            }
            output.sections.push(output_section);
          }
        }
        return output;
      } catch (error) {
        throw new Error(error.custom_message);
      }
    },
  },
};
