const Cart = require("../models/Cart");
const Customer = require("../models/Customer");
const Product = require("../models/Product");
const Tax = require("../models/Tax");
const Shipping = require("../models/Shipping");
const ProductAttributeVariation = require("../models/ProductAttributeVariation");
const ProductAttribute = require("../models/ProductAttribute");

const {
  isEmpty,
  putError,
  checkError,
  checkToken
} = require("../config/helpers");
const validate = require("../validations/cart");

module.exports = {
  Query: {
    carts: async (root, args) => {
      try {
        return await Cart.find({});
      } catch (error) {
        throw new Error("Something went wrong.");
      }
    },
    cart: async (root, args) => {
      try {
        const cart = await Cart.findById(args.id);
        if (!cart) {
          throw putError("Cart not found");
        }
        return cart;
      } catch (error) {
        error = checkError(error);
        throw new Error(error.custom_message);
      }
    },
    cartbyUser: async (root, args) => {
      try {
        const cart = await Cart.findOne({ user_id: args.user_id });
        if (!cart) {
          throw putError("Cart not found");
        }
        return cart;
      } catch (error) {
        error = checkError(error);
        throw new Error(error.custom_message);
      }
    },
    calculateCart: async (root, args, { id }) => {
      //checkToken(id);
      try {
        let cartItems = [];
        let calculated = {
          items: [],
          total_tax: {},
          total_shipping: {},
          grand_total: {}
        };

        const shipping = await Shipping.find({});
        const tax = await Tax.find({});
        const productAttribute = await ProductAttribute.find({});

        let isGlobalTaxObj = {}
        if(!tax[0].is_inclusive && tax[0].global.is_global){
          for (const taxval of tax[0].tax_class) {
            if(tax[0].global.tax_class.toString() === taxval._id.toString()){
              isGlobalTaxObj = {
                name: taxval.name,
                percentage: taxval.percentage
              };

              break;
            }
          }
        }

        let isGlobalShippingObj = {};
        if(shipping[0].global.is_global){
          for (const shippingVal of shipping[0].shipping_class) {
            if(shipping[0].global.shipping_class.toString() === shippingVal._id.toString()){
              isGlobalShippingObj = {
                name: shippingVal.name,
                amount: shippingVal.amount
              };

              break
            }
          }
        }

        let productIds = [];
        args.cart.forEach((item, i) => {                    
          productIds.push(item.product_id);
        });
        
        const products = await Product.find({ _id: {$in: productIds}});
        const productAttributeVariation = await ProductAttributeVariation.find({ product_id: {$in: productIds}});

        products.forEach((product, i) => {
          let item = {
            combination: []
          };

          let varProduct = productAttributeVariation.map((varP) => { 
            if(varP.product_id.toString() === product._id.toString()){
              return varP;
            } 
          });

          if(product.variant && product.variant.length){
            let combination = [];
            
            for (const cartP of args.cart) {              
              if(cartP.product_id.toString() === varProduct[0].product_id.toString()){
                combination = cartP.combination;
                item.qty = cartP.qty;
              }
            }

            for (const varP of varProduct) {
              let isMatch = true;
              if(combination.length === varP.combination.length){
                for (let i of varP.combination) {
                  if(!~combination.indexOf(i)){                    
                    isMatch = false;
                    break;
                  }
                }
              } else {
                continue;
              }
              
              if(isMatch){
                item.price = varP.price;
                item.product_id = varP.product_id;

                for (const attr of productAttribute) {
                  for (const attrVal of attr.values) {
                    if(~combination.indexOf(attrVal._id.toString())){
                      item.combination.push({
                        id: attrVal._id,
                        name: attrVal.name
                      });
                    }
                  }
                }

              }
            }
          } else {
            item.price = varProduct[0].price;
            item.product_id = varProduct[0].product_id;
          }
          
          if(!tax[0].is_inclusive && !tax[0].global.is_global){
            for (const taxval of tax[0].tax_class) {
              if(product.tax_class.toString() === taxval._id.toString()){
                let taxAmount = (parseFloat(item.price) / 100) * parseFloat(taxval.percentage);
                item.tax = {
                  name: taxval.name,
                  amount: taxAmount
                }
                break;
              }
            }
          }

          if(shipping[0].global.is_global && !shipping[0].global.is_per_order){
            item.shipping = {
              name: isGlobalShippingObj.name,
              amount: isGlobalShippingObj.amount
            } 
            
          } else if(!shipping[0].global.is_global){
            for (const shippingVal of shipping[0].shipping_class) {
              if(product.shipping.shipping_class.toString() === shippingVal._id.toString()){
                item.shipping = {
                  name: shippingVal.name,
                  amount: shippingVal.amount
                }
              }
            }
          }

          calculated.items.push(item);
        });

        calculated.subtotal = 0;
        calculated.total_tax = {
          name: "",
          amount: 0,
        };

        calculated.total_shipping = {
          name: "",
          amount: 0,
        };

        for (const item of calculated.items) {
          calculated.subtotal += parseFloat(item.price);
          if(item.tax && item.tax.hasOwnProperty("amount") && item.tax.amount >= 0){
            calculated.total_tax.amount += item.tax.amount
          }  

          if(item.shipping && item.shipping.hasOwnProperty("amount") && item.shipping.amount >= 0){
            calculated.total_shipping.amount += item.shipping.amount;
          }
        }

        if(shipping[0].global.is_global && shipping[0].global.is_per_order){
          calculated.total_shipping.amount = isGlobalShippingObj.amount;
          calculated.total_shipping.name = isGlobalShippingObj.name;
        }

        if(isGlobalTaxObj && isGlobalTaxObj.hasOwnProperty("percentage")){
          calculated.total_tax.amount = (calculated.subtotal / 100) * isGlobalTaxObj.percentage;
          calculated.total_tax.name = isGlobalTaxObj.name;
        }

        calculated.grand_total = calculated.subtotal + calculated.total_shipping.amount + calculated.total_tax.amount;

        return calculated;

      } catch (error) {
        error = checkError(error);
        throw new Error(error.custom_message);
      }
    },
  },
  Mutation: {
    addToCart: async (root, args, { id }) => {
      //checkToken(id);
      try {
        const customer = await Customer.findById(args.customer_id);
        if (customer) {          
          customer.cart.items = args.cart;
          await customer.save();
          return {
            success: true,
            message: ""
          }
        }
        return {
          success: false,
          message: "Customer does not exist"
        }        
        
      } catch (error) {
        console.log(error);
        error = checkError(error);
        throw new Error(error.custom_message);
      }
    },    
    addCart: async (root, args, { id }) => {
      checkToken(id);
      try {
        const cart = await Cart.findOne({ user_id: args.user_id });
        if (cart) {
          cart.total = args.total;
          cart.products.unshift(args.product);
          cart.updated = Date.now();
          return await cart.save();
        }

        const newCart = new Cart({
          user_id: args.user_id,
          total: args.total
        });

        newCart.products.unshift(args.product);
        return await newCart.save();
      } catch (error) {
        console.log(error);
        error = checkError(error);
        throw new Error(error.custom_message);
      }
    },
    updateCart: async (root, args, { id }) => {
      checkToken(id);
      try {
        const cart = await Cart.findById({ _id: args.id });
        if (cart) {
          cart.total = args.total;
          cart.products = args.products;
          cart.updated = Date.now();
          return await cart.save();
        } else {
          throw putError("Cart not exist");
        }
      } catch (error) {
        error = checkError(error);
        throw new Error(error.custom_message);
      }
    },
    deleteCart: async (root, args, { id }) => {
      checkToken(id);
      const cart = await Cart.findByIdAndRemove(args.id);
      if (cart) {
        return true;
      }
      return false;
    },
    deleteCartProduct: async (root, args, { id }) => {
      checkToken(id);
      const cart = await Cart.findById(args.id);
      if (cart) {
        for (let i in cart.products) {
          if (cart.products[i].id === args.object_id) {
            cart.products.splice(i, 1);
            cart.updated = Date.now();
            return await cart.save();
          }
        }
      } else {
        throw putError("Cart not exist");
      }
    }
  }
};
