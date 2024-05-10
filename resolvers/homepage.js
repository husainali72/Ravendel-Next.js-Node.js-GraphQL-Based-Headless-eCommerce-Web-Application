const Setting = require("../models/Setting");
const productCategory = require("../models/ProductCat");
const products = require("../models/Product");
const mongoose = require("mongoose");
module.exports = {
  Query: {
    getHomePage: async (root, args) => {
      try {
        const setting = await Setting.findOne({});
        if (!setting) {
          throw new Error("not found");
        }
        let output = {};
        output.parentCategories = await productCategory.find({ parentId: null });
        output.parentCategories.forEach(cat => {
          cat.thumbnail_image = cat.image;
        })
        output.sections = [];

        let sections;

        switch (args.deviceType) {
          case "1":
            sections = setting.appearance.home.add_section_web;
            break;
          case "2":
            sections = setting.appearance.mobile.mobile_section;
            break;
          default:
            throw new Error("Invalid Device Type");
            break;
        }
        for (const section of sections) {
          if (section.visible) {
            let output_section = {};
            output_section.name = section.label;
            output_section.section_img = section.section_img;
            output_section.display_type = section.display_type;
            output_section.url = section.url;

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

              case "Product from Specific Category":
                let category_id = new mongoose.Types.ObjectId(section.category);
                let pipeline = [
                  {
                    $match: { _id: category_id }
                  },
                  {
                    $addFields: {
                      categoryIdString: { $toString: "$_id" }
                    }
                  },
                  {
                    $lookup: {
                      from: "products",
                      localField: "categoryIdString",
                      foreignField: "categoryId",
                      as: "products"
                    }
                  },
                  {
                    $unset: "categoryIdString"
                  }       
                ];
                
                let data = await productCategory.aggregate(pipeline);                
                output_section.name = data[0].name
                output_section.products = data[0].products

              default:
                break;
            }
            output.sections.push(output_section);
          }
        }
        return output;
      } catch (error) {
        throw new Error(error.message);
      }
    },
  },
};
