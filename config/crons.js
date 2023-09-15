const cron = require("node-cron")
const Product = require("../models/Product")
const Setting = require("../models/Setting")
const Cart = require("../models/Cart")
const Customer = require("../models/Customer")
const APP_KEYS = require('./keys')
const { sendEmail } = require("./helpers") 

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

// updateCustomerCheckoutCart every 10 days
const updateCustomerCheckoutCart = (app) => {
    cron.schedule("0 0 */10 * *", async() => {
        const allCarts = await Cart.find()
        for(let cart of allCarts){
            let customer = await Customer.findById(cart.userId)
            const mailData = {
                subject: "Checkout Cart!",
                mailTemplate: "template",
                cart: cart
            }
            sendEmail(mailData, APP_KEYS.smptUser, customer.email)
        }
    })
}
module.exports.updateCustomerCheckoutCart = updateCustomerCheckoutCart