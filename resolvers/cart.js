const Cart = require("../models/Cart");
const Product = require("../models/Product");
const Tax = require("../models/Tax");
const Coupon = require("../models/Coupon");
const Shipping = require("../models/Shipping");
const ProductAttributeVariation = require("../models/ProductAttributeVariation");
const { GET_SINGLE_FUNC, GET_ALL_FUNC } = require("../config/api_functions");
const mongoose = require('mongoose');
const {
  putError,
  checkError,
  checkToken,
  MESSAGE_RESPONSE,
  againCalculateCart,
  _validate, getdate, addCart, calculateCart, calculateCoupon,
  toObjectID
} = require("../config/helpers");
const validate = require("../validations/cart");

module.exports = {
  Query: {

    carts: async (root, args) => {
      return await GET_ALL_FUNC(Cart, "Carts");
    },

    cart: async (root, args) => {
      return await GET_SINGLE_FUNC(args.id, Cart, "Cart");
    },


    calculateCart: async (root, args, { id }) => {
      // if (!id) {
      //   return MESSAGE_RESPONSE("TOKEN_REQ", "Cart", false);
      // }
      try {
        return calculateCart(args.userId, args.cartItems);
      } catch (error) {
        error = checkError(error);
        throw new Error(error.custom_message);
      }
    },


    calculateCoupon: async (root, args, { id }) => {
      try {
        return calculateCoupon(args.userId, args.cartItems, args.couponCode);
      } catch (error) {
        error = checkError(error);
        throw new Error(error.custom_message);
      }
    },

    validateCartProducts: async (root, args, { id }) => {
      const { products } = args

      const response = []
      const productDetails = await Product.find({_id: {$in: toObjectID(products.map(product => product.productId))}}).select("name quantity")
      productDetails.map(prod => {
        const product = products.find(product => product.productId === prod._id.toString())
        if((prod.quantity - product.qty) < 0) {
          if(prod.quantity === 0) {
            response.push({
              productTitle: product.productTitle,
              message: "Product out of stock."
            })
          } else {
            response.push({
              productTitle: product.productTitle,
              message: `Only ${prod.quantity} left in stock.`
            })
          }
        }
      })      

      return response || []
    }



    // calculateCart: async (root, args, { id }) => {
    //   try {
    //     const shipping = await Shipping.findOne({});
    //     const tax = await Tax.findOne({});

    //     let items = [];
    //     let totalTax = 0;
    //     let totalShipping = 0;
    //     let grandTotal = 0;
    //     let cartTotal = 0;

    //     let global_tax = false;
    //     let taxPercentage;
    //     if (tax.global.is_global) {
    //       let taxClassId = tax.global.taxClass;

    //       tax.taxClass.forEach((taxObject) => {
    //         if (taxObject._id.toString() == taxClassId.toString()) {
    //           global_tax = true;
    //           taxPercentage = taxObject.percentage;
    //         }
    //       });
    //     }

    //     let global_shipping = false;
    //     let globalShippingAmount;
    //     let globalShippingPerOrder = false;

    //     if (shipping.global.is_global) {
    //       let shippingClassId = shipping.global.shippingClass;

    //       shipping.shippingClass.forEach((shippingObject) => {
    //         if (shippingObject._id.toString() == shippingClassId.toString()) {
    //           global_shipping = true;
    //           globalShippingAmount = shippingObject.amount;
    //         }
    //       });

    //       if (shipping.global.is_per_order) {
    //         globalShippingPerOrder = true;
    //       }
    //     }

    //     // if global tax applicable

    //     if (global_tax) {
    //       for (let a = 0; a < args.cartItem.length; a++) {
    //         cartProduct = args.cartItem[a];

    //         let productShipping;

    //         let productTax;

    //         const product = await Product.findById({
    //           _id: cartProduct.productId,
    //         }).lean();
    //         let odredQuantity = cartProduct.qty;

    //         let productPrice = product.pricing.sellprice;
    //         if (cartProduct?.variantId) {
    //           const variations = await ProductAttributeVariation.find({
    //             productId: cartProduct.productId,
    //             _id: cartProduct?.variantId,
    //           });
    //           productPrice = variations[0]?.pricing?.sellprice;
    //           cartTotal += productPrice * odredQuantity;
    //         } else {
    //           cartTotal += productPrice * odredQuantity;
    //         }

    //         // product tax calculation
    //         if (taxPercentage != 0) {
    //           grandTotal =
    //             grandTotal +
    //             productPrice * odredQuantity +
    //             ((productPrice * taxPercentage) / 100) * odredQuantity;

    //           totalTax =
    //             totalTax +
    //             ((productPrice * taxPercentage) / 100) * odredQuantity;
    //           productTax =
    //             ((productPrice * taxPercentage) / 100) * odredQuantity;
    //         } else {
    //           grandTotal = grandTotal + productPrice * odredQuantity;
    //           totalTax = 0;
    //           productTax = 0;
    //         }

    //         // product shipping calculation

    //         if (global_shipping) {
    //           if (!globalShippingPerOrder) {
    //             totalShipping += globalShippingAmount * cartProduct?.qty;
    //             grandTotal += globalShippingAmount * cartProduct?.qty;

    //             productShipping = +(globalShippingAmount * cartProduct?.qty);
    //           }
    //         } else if (!global_shipping) {
    //           productShipping = 0;

    //           let productShippingClass = product.shipping.shippingClass;

    //           shipping.shippingClass.forEach((shippingObject) => {
    //             if (
    //               shippingObject._id.toString() ==
    //               productShippingClass.toString()
    //             ) {
    //               productShipping = shippingObject.amount * odredQuantity;
    //             }
    //           });

    //           totalShipping += productShipping;
    //           grandTotal += productShipping;
    //         }

    //         let pushValue = {
    //           productId: product._id,
    //           productTitle: product.name,
    //           productImage: product.feature_image,
    //           productPrice: productPrice.toFixed(2),
    //           qty: +odredQuantity,
    //           productTotal: productPrice * +odredQuantity,
    //           productTax: productTax.toFixed(2),
    //         };

    //         if (productShipping) {
    //           pushValue.productShipping = productShipping.toFixed(2);
    //         }

    //         items.push(pushValue);
    //       }

    //       if (global_shipping && globalShippingPerOrder) {
    //         grandTotal += globalShippingAmount;
    //         totalShipping = globalShippingAmount;
    //       }
    //     }

    //     //if global tax is not applicable;
    //     else {
    //       for (let a = 0; a < args.cartItem.length; a++) {
    //         cartProduct = args.cartItem[a];

    //         let productShipping;

    //         const product = await Product.findById({
    //           _id: cartProduct.productId,
    //         }).lean();
    //         let odredQuantity = cartProduct.qty;

    //         let productPrice =
    //           product.pricing.sellprice > 0
    //             ? product.pricing.sellprice
    //             : product.pricing.price;
    //         cartTotal += productPrice * odredQuantity;

    //         let productTaxClass = product.taxClass;
    //         let productTaxPercentage;
    //         let productTaxAmount;

    //         tax.taxClass.forEach((taxObject) => {
    //           if (taxObject._id.toString() == productTaxClass?.toString()) {
    //             productTaxPercentage = taxObject.percentage;
    //           }
    //         });

    //         //calculating product tax amount,adding product price and product tax in grand total;

    //         if (productTaxPercentage != 0) {
    //           grandTotal =
    //             grandTotal +
    //             productPrice * odredQuantity +
    //             ((productPrice * productTaxPercentage) / 100) * odredQuantity;
    //           productTaxAmount =
    //             ((productPrice * productTaxPercentage) / 100) * odredQuantity;
    //           totalTax += +productTaxAmount;
    //         } else {
    //           productTaxAmount = 0;
    //           totalTax += +productTaxAmount;
    //           grandTotal += productPrice * odredQuantity + productTaxAmount;
    //         }

    //         //calculating product shipping and adding product shipping in grand total amount

    //         if (global_shipping) {
    //           if (!globalShippingPerOrder) {
    //             totalShipping += globalShippingAmount;
    //             grandTotal += globalShippingAmount;

    //             productShipping = +globalShippingAmount;
    //           }
    //         } else if (!global_shipping) {
    //           productShipping = 0;

    //           let productShippingClass = product.shipping.shippingClass;

    //           shipping.shippingClass.forEach((shippingObject) => {
    //             if (
    //               shippingObject?._id?.toString() ==
    //               productShippingClass?.toString()
    //             ) {
    //               productShipping = shippingObject.amount * odredQuantity;
    //             }
    //           });

    //           totalShipping += productShipping;
    //           grandTotal += productShipping;
    //         }

    //         let pushValue = {
    //           productId: product._id,
    //           productTitle: product.name,
    //           productImage: product.feature_image,
    //           productPrice: productPrice.toFixed(2),
    //           qty: +odredQuantity,
    //           productTotal: productPrice * +odredQuantity,
    //           productTax: +productTaxAmount.toFixed(2),
    //         };

    //         if (productShipping) {
    //           pushValue.productShipping = productShipping.toFixed(2);
    //         }

    //         items.push(pushValue);
    //       }

    //       if (global_shipping && globalShippingPerOrder) {
    //         grandTotal += globalShippingAmount;
    //         totalShipping = globalShippingAmount;
    //       }
    //     }

    //     let calculated = {
    //       cartItem: items,
    //       totalTax: totalTax.toFixed(2),
    //       totalShipping: totalShipping.toFixed(2),
    //       grandTotal: grandTotal.toFixed(2),
    //       cartTotal: cartTotal.toFixed(2),
    //     };

    //     return calculated;
    //   } catch (error) {
    //     console.log('error', error);
    //     error = checkError(error);
    //     throw new Error(error.custom_message);
    //   }
    // },

    // old code of calculate Cart
    //     calculateCart : async (root,args,{id})=>{
    //         // let isGlobalTaxObj = {};
    //         // if (!tax[0].is_inclusive && tax[0].global.is_global) {
    //         //   for (const taxval of tax[0].taxClass) {
    //         //     if (tax[0].global.taxClass.toString() === taxval._id.toString()) {
    //         //       isGlobalTaxObj = {
    //         //         name: taxval.name,
    //         //         percentage: taxval.percentage,
    //         //       };
    //         //       break;
    //         //     }
    //         //   }
    //         // }

    //         // let isGlobalShippingObj = {};
    //         // if (shipping[0].global.is_global) {
    //         //   for (const shippingVal of shipping[0].shippingClass) {
    //         //     if (
    //         //       shipping[0].global.shippingClass.toString() ===
    //         //       shippingVal._id.toString()
    //         //     ) {
    //         //       isGlobalShippingObj = {
    //         //         name: shippingVal.name,
    //         //         amount: shippingVal.amount,
    //         //       };

    //         //       break;
    //         //     }
    //         //   }
    //         // }
    // //productById = {"id":{carts:[]}}

    //         // let productById = {};
    //         // let productIds = [];
    //         // args.cart.forEach((item, i) => {
    //         //   item.combination = []
    //         //   productIds.push(item.productId);
    //         //   if (typeof productById[item.productId.toString()] !== "object") {
    //         //     productById[item.productId.toString()] = {};
    //         //     productById[item.productId.toString()].carts = [];
    //         //   }
    //         //   productById[item.productId.toString()].carts.push(item);
    //         // });

    //         // const products = await Product.find({ _id: { $in: productIds } });

    //         // for (const prod of products) {
    //         //   productById[prod._id.toString()].price = prod.pricing.sellprice ? prod.pricing.sellprice : prod.pricing.price
    //         //   productById[prod._id.toString()].product = {
    //         //     productId: prod._id,
    //         //     variant: prod.variant,
    //         //     shipping: prod.shipping,
    //         //     taxClass: prod.taxClass,
    //         //   };
    //         // }

    //         // const productAttributeVariation = await ProductAttributeVariation.find({
    //         //   productId: { $in: productIds },
    //         // });

    //         // for (const prod of productAttributeVariation) {
    //         //   if (prod.combination.length) {
    //         //     let attributeVariation = {
    //         //       combination_values: [],
    //         //       price: prod.price,
    //         //     };

    //         //     for (const attr of productAttribute) {
    //         //       for (const attrVal of attr.values) {
    //         //         if (~prod.combination.indexOf(attrVal._id.toString())) {
    //         //           productById[prod.productId.toString()].carts[0].combination.push(attrVal._id.toString())
    //         //           attributeVariation.combination_values.push({
    //         //             id: attrVal._id,
    //         //             name: attrVal.name,
    //         //           });
    //         //         }
    //         //       }
    //         //     }

    //         //     if (!productById[prod.productId.toString()].attributeVariation) {
    //         //       productById[prod.productId.toString()].attributeVariation = [];
    //         //     }

    //         //     productById[prod.productId.toString()].attributeVariation.push(
    //         //       attributeVariation
    //         //     );
    //         //   } else {
    //         //     productById[prod.productId.toString()].price = prod.price;
    //         //   }
    //         // }

    //         // for (let i in productById) {
    //         //   for (const cart of productById[i].carts) {
    //         //     let item = {
    //         //       combination: [],
    //         //       qty: cart.qty,
    //         //     };

    //         //     if (cart.combination && cart.combination.length) {
    //         //       for (const varProduct of productById[i].attributeVariation) {
    //         //         let isMatch = true;
    //         //         if (
    //         //           cart.combination.length ===
    //         //           varProduct.combination_values.length
    //         //         ) {
    //         //           for (let i of varProduct.combination_values) {
    //         //             if (!~cart.combination.indexOf(i.id.toString())) {
    //         //               isMatch = false;
    //         //               break;
    //         //             }
    //         //           }
    //         //         } else {
    //         //           continue;
    //         //         }

    //         //         if (isMatch) {
    //         //           item.price = varProduct.price * item.qty;
    //         //           item.productId = productById[i].product.productId;
    //         //           item.combination = varProduct.combination_values;
    //         //         }
    //         //       }
    //         //     } 
    //         //     else {
    //         //       item.price = productById[i].price * item.qty;
    //         //       item.productId = productById[i].product.productId;
    //         //       //console.log(item);
    //         //     }

    //         //     if (!tax[0].is_inclusive && !tax[0].global.is_global) {
    //         //       for (const taxval of tax[0].taxClass) {
    //         //         // console.log(productById[i]);
    //         //         if (
    //         //           productById[i].product.taxClass.toString() ===
    //         //           taxval._id.toString()
    //         //         ) {
    //         //           let taxAmount =
    //         //             (parseFloat(item.price) / 100) *
    //         //             parseFloat(taxval.percentage);
    //         //           item.tax = {
    //         //             name: taxval.name,
    //         //             amount: taxAmount,
    //         //           };
    //         //           break;
    //         //         }
    //         //       }
    //         //     }

    //         //     if (
    //         //       shipping[0].global.is_global &&
    //         //       !shipping[0].global.is_per_order
    //         //     ) {
    //         //       item.shipping = {
    //         //         name: isGlobalShippingObj.name,
    //         //         amount: isGlobalShippingObj.amount,
    //         //       };
    //         //     } else if (!shipping[0].global.is_global) {
    //         //       for (const shippingVal of shipping[0].shippingClass) {
    //         //         if (
    //         //           productById[i].product.shipping.shippingClass.toString() ===
    //         //           shippingVal._id.toString()
    //         //         ) {
    //         //           item.shipping = {
    //         //             name: shippingVal.name,
    //         //             amount: shippingVal.amount,
    //         //           };
    //         //         }
    //         //       }
    //         //     }

    //         //     calculated.items.push(item);
    //         //   }
    //         // }

    //         // calculated.subtotal = 0;
    //         // calculated.totalTax = {
    //         //   name: "",
    //         //   amount: 0,
    //         // };

    //         // calculated.totalShipping = {
    //         //   name: "",
    //         //   amount: 0,
    //         // };

    //         // for (const item of calculated.items) {
    //         //   calculated.subtotal += parseFloat(item.price);
    //         //   if (
    //         //     item.tax &&
    //         //     item.tax.hasOwnProperty("amount") &&
    //         //     item.tax.amount >= 0
    //         //   ) {
    //         //     calculated.totalTax.amount += item.tax.amount;
    //         //   }

    //         //   if (
    //         //     item.shipping &&
    //         //     item.shipping.hasOwnProperty("amount") &&
    //         //     item.shipping.amount >= 0
    //         //   ) {
    //         //     calculated.totalShipping.amount += item.shipping.amount;
    //         //   }
    //         // }

    //         // if (shipping[0].global.is_global && shipping[0].global.is_per_order) {
    //         //   calculated.totalShipping.amount = isGlobalShippingObj.amount;
    //         //   calculated.totalShipping.name = isGlobalShippingObj.name;
    //         // }

    //         // if (isGlobalTaxObj && isGlobalTaxObj.hasOwnProperty("percentage")) {
    //         //   calculated.totalTax.amount =
    //         //     (calculated.subtotal / 100) * isGlobalTaxObj.percentage;
    //         //   calculated.totalTax.name = isGlobalTaxObj.name;
    //         // }

    //         // calculated.totalCoupon = args.totalCoupon;
    //         // calculated.grandTotal =
    //         //   calculated.subtotal +
    //         //   calculated.totalShipping.amount +
    //         //   calculated.totalTax.amount - calculated.totalCoupon;

    //         //console.log(calculated);
    //     }
  },
  Mutation: {
    // addToCart: async (root, args, { id }) => {
    //   //checkToken(id);
    //   try {
    //     const customer = await Customer.findById(args.customerId);
    //     if (customer) {
    //       customer.cart.items = args.cart;
    //       await customer.save();
    //       return {
    //         success: true,
    //         message: "",
    //       };
    //     }
    //     return {
    //       success: false,
    //       message: "Customer does not exist",
    //     };
    //   } catch (error) {
    //     console.log(error);
    //     error = checkError(error);
    //     throw new Error(error.custom_message);
    //   }
    // },
    /*addCart: async (root, args, { id }) => {
      if (!id) {
        return MESSAGE_RESPONSE("TOKEN_REQ", "Cart", false);
      }
      try {
        const cart = await Cart.findOne({ userId: args.userId });
        if (cart) {
          cart.total = args.total;
          cart.products.unshift(args.product);
          cart.updated = Date.now();
          return await cart.save();
        }

        const newCart = new Cart({
          userId: args.userId,
          total: args.total,
        });

        newCart.products.unshift(args.product);
        await newCart.save();
        return MESSAGE_RESPONSE("AddSuccess", "Cart", true);
      } catch (error) {
        console.log(error);
        error = checkError(error);
        return MESSAGE_RESPONSE("CREATE_ERROR", "Cart", false);
      }
    },*/

    // runing With login
    addToCart: async (root, args, { id }) => {
      if (!id) {
        return MESSAGE_RESPONSE("TOKEN_REQ", "Cart", false);
      }
      try {

        console.log('in addToCart');
        let products = [
          {
            productId:args.productId,
            qty: args.qty,
            productTitle: args.productTitle,
            productImage: args.productImage,
            productPrice: args.productPrice,
            variantId: args.variantId,
            attributes: args.attributes
          }
        ];
        
        await addCart(args.userId, products);
        return MESSAGE_RESPONSE("AddSuccess", "Cart", true);

      } catch (error) {
        error = checkError(error);
        return MESSAGE_RESPONSE("CREATE_ERROR", "Cart", false);
      }
    },

    addCart: async (root, args, { id }) => {
      // console.log("withOutLogin----args-2", args);
      if (!id) {
        return MESSAGE_RESPONSE("TOKEN_REQ", "Cart", false);
      }
      try {
        await addCart(args.userId, args.products);
        return MESSAGE_RESPONSE("AddSuccess", "Cart", true);
      } catch (error) {
        // console.log(error);
        error = checkError(error);
        return MESSAGE_RESPONSE("CREATE_ERROR", "Cart", false);
      }
    },

    /*updateCart: async (root, args, { id }) => {
      if (!id) {
        return MESSAGE_RESPONSE("TOKEN_REQ", "Cart", false);
      }
      if (!args.id) {
        return MESSAGE_RESPONSE("ID_ERROR", "Cart", false);
      }
      try {
        const cart = await Cart.findById({ _id: args.id });
        if (cart) {
          cart.total = args.total;
          cart.products = args.products;
          cart.updated = Date.now();
          await cart.save();
          return MESSAGE_RESPONSE("UpdateSuccess", "Cart", true);
        } else {
          return MESSAGE_RESPONSE("NOT_EXIST", "Cart", false);
        }
      } catch (error) {
        error = checkError(error);
        return MESSAGE_RESPONSE("UPDATE_ERROR", "Cart", false);
      }
    },*/

    updateCart: async (root, args, { id }) => {
      if (!id) {
        return MESSAGE_RESPONSE("TOKEN_REQ", "Cart", false);
      }
      if (!args.id) {
        return MESSAGE_RESPONSE("ID_ERROR", "Cart", false);
      }
      try {
        const cart = await Cart.findById({ _id: args.id });
        //console.log("cart========",cart)
        if (cart) {

          var carttotal = 0;

          let globalTax = true;
          let isGlobalTax = await Tax.findOne({}).lean();

          if (!isGlobalTax.global.is_global) {
            globalTax = false;
          }

          console.log('checking global tax', globalTax);

          if (!globalTax) {

            for (let i in args.products) {

              if (args.products[i].productId) {


                const product = await Product.findById({ _id: args.products[i].productId });


                if (product) {
                  let taxPercentage;
                  isGlobalTax.taxClass.forEach((taxObject) => {

                    if (taxObject._id.toString() == args.products[i].taxClass) {
                      taxPercentage = taxObject.percentage
                    }

                  })


                  console.log('calculating tax');
                  let tax;
                  if (product.pricing.sellprice > 0) {

                    tax = (+product.pricing.sellprice * (+taxPercentage)) / 100;
                    args.products[i].productPrice = product.pricing.sellprice;
                    args.products[i].total = args.products[i].qty * product.pricing.sellprice + (tax * args.products[i].qty);

                  } else {

                    tax = (+product.pricing.price * (+taxPercentage)) / 100;
                    args.products[i].productPrice = product.pricing.price;
                    args.products[i].total = args.products[i].qty * product.pricing.price + (tax * args.products[i].qty);

                  }

                  args.products[i].productTax = tax
                  args.products[i].productTaxPercentage = taxPercentage


                  carttotal = carttotal + args.products[i].total;
                }
              }
            }

            console.log('assigning total');
            cart.total = carttotal;
            cart.products = args.products;
            cart.updated = Date.now();
            await cart.save();
            return MESSAGE_RESPONSE("UpdateSuccess", "Cart", true);

          }

          else {

            for (let i in args.products) {

              if (args.products[i].productId) {
                const product = await Product.findById({ _id: args.products[i].productId });
                if (product) {
                  if (product.pricing.sellprice > 0) {
                    args.products[i].total = args.products[i].qty * product.pricing.sellprice;
                  } else {
                    args.products[i].total = args.products[i].qty * product.pricing.price;
                  }

                  carttotal = carttotal + args.products[i].total;
                }
              }
            }

            cart.total = carttotal;
            cart.products = args.products;
            cart.updated = Date.now();
            await cart.save();
            return MESSAGE_RESPONSE("UpdateSuccess", "Cart", true);

          }
        }
        else {
          return MESSAGE_RESPONSE("NOT_EXIST", "Cart", false);
        }
      } catch (error) {
        error = checkError(error);
        return MESSAGE_RESPONSE("UPDATE_ERROR", "Cart", false);
      }
    },

    changeQty: async (root, args, { id }) => {
      if (!id) {
        return MESSAGE_RESPONSE("TOKEN_REQ", "Cart", false);
      }
      try {
        const cart = await Cart.findOne({ userId: args.userId });
        if(!cart) {
          return MESSAGE_RESPONSE("NOT_EXIST", "Cart", false);
        }
        
        let cartProduct = cart.products.find(p => p.productId.toString() === args.productId.toString());
        if(!cartProduct) {
          return MESSAGE_RESPONSE("NOT_EXIST", "Cart Product", false);
        }
        let product = await Product.findById(new mongoose.Types.ObjectId(cartProduct.productId));
        if(!product) {
          return MESSAGE_RESPONSE("NOT_EXIST", "Product", false);
        }
        if(product.quantity < args.qty) {
          return MESSAGE_RESPONSE("OutOfStock", product.quantity.toString() + " Unit(s)", false);
        }
        cartProduct.qty = args.qty
        await cart.save();
        return MESSAGE_RESPONSE("UpdateSuccess", "Quantity", true);
      } catch (error) {
        error = checkError(error);
        return MESSAGE_RESPONSE("UPDATE_ERROR", "Cart", false);
      }
    },

    //,.........................................
    deleteCart: async (root, args, { id }) => {
      try {
        if (!id) {
          return MESSAGE_RESPONSE("TOKEN_REQ", "Cart", false);
        }
        const cart = await Cart.deleteOne({ userId: args.userId });
        console.log('cart', cart);
        
        if (cart && cart.acknowledged && cart.deletedCount > 0) {
          return MESSAGE_RESPONSE("DeleteSuccess", "Cart", true);
        }
        else {
          return MESSAGE_RESPONSE("NOT_EXIST", "Cart", false); 
        }
      } catch (error) {
        error = checkError(error);
        return MESSAGE_RESPONSE("DELETE_ERROR", "Cart", false);
      }
    },
    
    deleteCartProduct: async (root, args, { id }) => {
      try {
        if (!id) {
          return MESSAGE_RESPONSE("TOKEN_REQ", "Cart", false);
        }
        const cart = await Cart.findOne({ userId: args.userId });
        if(!cart) {
          return MESSAGE_RESPONSE("NOT_EXIST", "Cart", false);
        }

        let product = cart.products.find(p => p.productId.toString() === args.productId.toString());
        if(!product) {
          return MESSAGE_RESPONSE("NOT_EXIST", "Cart Product", false);
        }

        for (let i in cart.products) {
          if (cart.products[i].productId.toString() == args.productId.toString()) {
            cart.products.splice(i, 1);
            break;
          }
        }
        await cart.save();
        return MESSAGE_RESPONSE("UpdateSuccess", "Cart", true);
      } catch (error) {
        error = checkError(error);
        return MESSAGE_RESPONSE("UPDATE_ERROR", "Cart", false);
      }
    },
  },
};

// const calculateCartFunc = async(req) => {

// }

// module.exports = { calculateCartFunc };
