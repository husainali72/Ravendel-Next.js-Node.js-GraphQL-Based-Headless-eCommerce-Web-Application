const cron = require("node-cron");
const Product = require("../models/Product");
const Setting = require("../models/Setting");
const Cart = require("../models/Cart");
const Customer = require("../models/Customer");
const APP_KEYS = require("./keys");
const { sendEmail, sendEmailTemplate } = require("./helpers");

/*
// updateAdminProductLowStock everyday at 12am
const updateAdminProductLowStock = (app) => {
    cron.schedule("0 0 * * *", async() => {
        const setting = await Setting.findOne()
        if(setting.store.inventory.manage_stock) {
            let lowStockProducts = await Product.find({quantity: {$lte: setting.store.inventory.low_stock_threshold}})
            lowStockProducts = lowStockProducts.map((product) => {
                return product = {
                    quantity: product.quantity,
                    name: product.name,
                    image: product.feature_image,
                    sku: product.sku
                }
            })
            const mailData = {
                subject: "Products Low Stock!",
                mailTemplate: "template",
                products: lowStockProducts
            }
            sendEmail(mailData, APP_KEYS.smptUser, APP_KEYS.smptUser)
        }
    })
}
module.exports.updateAdminProductLowStock = updateAdminProductLowStock
*/

// updateCustomerCheckoutCart every day At 10:00
const abandonedCartsNotification = (app) => {
  cron.schedule("0 10 * * *", async () => {
    try {
      const pipeline = [
        {
          $lookup: {
            from: "customers", // Ensure this matches the actual collection name in your database
            localField: "userId", // Corrected typo
            foreignField: "_id",
            as: "customerInfo",
            pipeline: [
              {
                $project: {
                  firstName: 1,
                  email: 1,
                },
              },
            ],
          },
        },
      ];

      const cartsData = await Cart.aggregate(pipeline);

      let currentDate = new Date();
      let oldDate = new Date(currentDate.getTime());
      oldDate.setDate(oldDate.getDate() - 7);


      for (let unit of cartsData) {
        if (unit.products.length != 0 && unit.customerInfo.length != 0) {

          let unitDateTimestamp = unit.date.getTime();
          let oldDateTimestamp = oldDate.getTime();

          if (unitDateTimestamp < oldDateTimestamp) {
            console.log(unit.date, unit.customerInfo[0].firstName);
          }
          let data = {
            email : unit.customerInfo[0].email,
            products : unit.products
          }
          sendEmailTemplate("CART_REMAINDER", data)

        }
      }
    } catch (error) {
      console.log(error.message);
    }
  });
};
module.exports.abandonedCartsNotification = abandonedCartsNotification;
