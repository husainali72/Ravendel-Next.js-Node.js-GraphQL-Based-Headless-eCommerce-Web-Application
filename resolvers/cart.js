const Cart = require("../models/Cart");
const Customer = require("../models/Customer");
const Product = require("../models/Product");
const Tax = require("../models/Tax");
const Coupon = require("../models/Coupon");
const Shipping = require("../models/Shipping");
const ProductAttributeVariation = require("../models/ProductAttributeVariation");
const ProductAttribute = require("../models/ProductAttribute");
const {
  DELETE_FUNC,
  GET_BY_PAGINATIONS,
  GET_SINGLE_FUNC,
  GET_ALL_FUNC,
  CREATE_FUNC,
  UPDATE_FUNC,
} = require("../config/api_functions");

const {
  isEmpty,
  putError,
  checkError,
  checkToken,
  MESSAGE_RESPONSE,
  _validate,getdate
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
    cartbyUser: async (root, args) => {
      try {
        // console.log("cart by user=======",args.user_id)
        const cart = await Cart.findOne({ user_id: args.user_id });
        // console.log("cart by user=========",cart)
        if (!cart) {
          throw putError("Cart not found");
        }
        return cart; 
      } catch (error) {
        error = checkError(error);
        throw new Error(error.custom_message);
      }
    },

    calculateCoupon: async (root, args, { id }) => {
      //  checkToken(id);
      // console.log("args cart=======", args.cart)
    
      try {
        const coupon = await Coupon.findOne({ code: args.coupon_code });
        // console.log('coupon',coupon);
        let calculated = {
          total_coupon: {},
          message: '',
        };
          let date = getdate('2');
        if(!coupon){
          calculated.total_coupon = 0.0;
          calculated.message = 'Invalid coupon code';
        }else{

          // console.log('expiredate',coupon.expire);
          // if(coupon.expire >= date ){
          if(coupon.expire){

              var carttotal = 0;
              var discountAmount = 0
              // for (let i in args.cart) {
              // carttotal = carttotal + args.cart[i].total;
              // }


            for (let i in args.cart) {
              if (args.cart[i].product_id) {
                const product = await Product.findById({ _id: args.cart[i].product_id });
                // console.log("product===========",product)
                if (product.pricing.sellprice > 0) {
                  args.cart[i].total = args.cart[i].qty * product.pricing.sellprice;
                } else {
                  args.cart[i].total = args.cart[i].qty * product.pricing.price;
                }
              }
              carttotal = carttotal + args.cart[i].total;
            }

              // console.log('carttotal',carttotal);
              if(coupon.discount_type == 'amount-discount'){
                // console.log('amount');
                discountAmount = parseFloat(coupon.discount_value);
              }else{
                // console.log('percentage');
                let productDiscountAmt=0
                if(coupon.categories.length>0 && coupon.exclude_categories.length>0 && 
                   coupon.products.length>0 && coupon.exclude_products.length>0){
                    for (let i in args.cart) {
                      if (args.cart[i].product_id) {
                        const product = await Product.findById({ _id: args.cart[i].product_id });
                        // map category ids of product
                        product.categoryId.map(productCatId=>{
                          // map product category ids in coupon
                          coupon.categories.map(couponCatId=>{
                            //console.log("productCatId=",productCatId, "couponCatId=", couponCatId)
                            // match both ids for discount amt
                            if(couponCatId===productCatId){
                              productDiscountAmt+=(parseFloat(args.cart[i].total) / 100) * parseFloat(coupon.discount_value);
                              //console.log("discount on product=",productDiscountAmt)
                            }
                          })
                        })
                      }
                    }
                  }else{
                    // console.log(coupon.discount_value)
                    productDiscountAmt+=(parseFloat(carttotal) / 100) * parseFloat(coupon.discount_value)
                    //console.log(productDiscountAmt)
                  }
                
                discountAmount = productDiscountAmt
              }
              //console.log('discountAmount',Math.round(discountAmount).toFixed(2));
              calculated.total_coupon = Math.round(discountAmount).toFixed(2);
              calculated.message = 'Coupon code applied sucessfully';

          }else{
               calculated.total_coupon = 0.0;
               calculated.message = 'Coupon code expire';

          }
        }
        return calculated;
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
          grand_total: {},
        };

        const shipping = await Shipping.find({});
        const tax = await Tax.find({});
        const productAttribute = await ProductAttribute.find({});

        let isGlobalTaxObj = {};
        if (!tax[0].is_inclusive && tax[0].global.is_global) {
          for (const taxval of tax[0].tax_class) {
            if (tax[0].global.tax_class.toString() === taxval._id.toString()) {
              isGlobalTaxObj = {
                name: taxval.name,
                percentage: taxval.percentage,
              };
              //console.log("global tax=====",isGlobalTaxObj)
              break;
            }
          }
        }

        let isGlobalShippingObj = {};
        if (shipping[0].global.is_global) {
          for (const shippingVal of shipping[0].shipping_class) {
            if (
              shipping[0].global.shipping_class.toString() ===
              shippingVal._id.toString()
            ) {
              isGlobalShippingObj = {
                name: shippingVal.name,
                amount: shippingVal.amount,
              };

              break;
            }
          }
        }

        let productById = {};
        let productIds = [];
        args.cart.forEach((item, i) => {
          productIds.push(item.product_id);
          if (typeof productById[item.product_id.toString()] !== "object") {
            productById[item.product_id.toString()] = {};
            productById[item.product_id.toString()].carts = [];
          }
          productById[item.product_id.toString()].carts.push(item);
        });

        const products = await Product.find({ _id: { $in: productIds } });

        for (const prod of products) {
          productById[prod._id.toString()].product = {
            product_id: prod._id,
            variant: prod.variant,
            shipping: prod.shipping,
            tax_class: prod.tax_class,
          };
        }

        const productAttributeVariation = await ProductAttributeVariation.find({
          product_id: { $in: productIds },
        });

        for (const prod of productAttributeVariation) {
          if (prod.combination.length) {
            let attributeVariation = {
              combination_values: [],
              price: prod.price,
            };

            for (const attr of productAttribute) {
              for (const attrVal of attr.values) {
                if (~prod.combination.indexOf(attrVal._id.toString())) {
                  attributeVariation.combination_values.push({
                    id: attrVal._id,
                    name: attrVal.name,
                  });
                }
              }
            }

            if (!productById[prod.product_id.toString()].attributeVariation) {
              productById[prod.product_id.toString()].attributeVariation = [];
            }

            productById[prod.product_id.toString()].attributeVariation.push(
              attributeVariation
            );
          } else {
            productById[prod.product_id.toString()].price = prod.price;
          }
        }

        for (let i in productById) {
          for (const cart of productById[i].carts) {
            let item = {
              combination: [],
              qty: cart.qty,
            };

            if (cart.combination && cart.combination.length) {
              for (const varProduct of productById[i].attributeVariation) {
                let isMatch = true;
                if (
                  cart.combination.length ===
                  varProduct.combination_values.length
                ) {
                  for (let i of varProduct.combination_values) {
                    if (!~cart.combination.indexOf(i.id.toString())) {
                      isMatch = false;
                      break;
                    }
                  }
                } else {
                  continue;
                }

                if (isMatch) {
                  item.price = varProduct.price;
                  item.product_id = productById[i].product.product_id;
                  item.combination = varProduct.combination_values;
                }
              }
            } else {
              item.price = productById[i].price;
              item.product_id = productById[i].product.product_id;
              //console.log(item);
            }

            if (!tax[0].is_inclusive && !tax[0].global.is_global) {
              for (const taxval of tax[0].tax_class) {
                // console.log(productById[i]);
                if (
                  productById[i].product.tax_class.toString() ===
                  taxval._id.toString()
                ) {
                  let taxAmount =
                    (parseFloat(item.price) / 100) *
                    parseFloat(taxval.percentage);
                  item.tax = {
                    name: taxval.name,
                    amount: taxAmount,
                  };
                  break;
                }
              }
            }

            if (
              shipping[0].global.is_global &&
              !shipping[0].global.is_per_order
            ) {
              item.shipping = {
                name: isGlobalShippingObj.name,
                amount: isGlobalShippingObj.amount,
              };
            } else if (!shipping[0].global.is_global) {
              for (const shippingVal of shipping[0].shipping_class) {
                if (
                  productById[i].product.shipping.shipping_class.toString() ===
                  shippingVal._id.toString()
                ) {
                  item.shipping = {
                    name: shippingVal.name,
                    amount: shippingVal.amount,
                  };
                }
              }
            }

            calculated.items.push(item);
          }
        }

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
          if (
            item.tax &&
            item.tax.hasOwnProperty("amount") &&
            item.tax.amount >= 0
          ) {
            calculated.total_tax.amount += item.tax.amount;
          }

          if (
            item.shipping &&
            item.shipping.hasOwnProperty("amount") &&
            item.shipping.amount >= 0
          ) {
            calculated.total_shipping.amount += item.shipping.amount;
          }
        }

        if (shipping[0].global.is_global && shipping[0].global.is_per_order) {
          calculated.total_shipping.amount = isGlobalShippingObj.amount;
          calculated.total_shipping.name = isGlobalShippingObj.name;
        }

        if (isGlobalTaxObj && isGlobalTaxObj.hasOwnProperty("percentage")) {
          calculated.total_tax.amount =
            (calculated.subtotal / 100) * isGlobalTaxObj.percentage;
          calculated.total_tax.name = isGlobalTaxObj.name;
        }

        calculated.total_coupon = args.total_coupon;
        calculated.grand_total =
          calculated.subtotal +
          calculated.total_shipping.amount +
          calculated.total_tax.amount - calculated.total_coupon;

        //console.log(calculated);
        return calculated;
      } catch (error) {
        console.log(error)
        error = checkError(error);
        throw new Error(error.custom_message);
      }
    },
  },
  Mutation: {
    // addToCart: async (root, args, { id }) => {
    //   //checkToken(id);
    //   try {
    //     const customer = await Customer.findById(args.customer_id);
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
        const cart = await Cart.findOne({ user_id: args.user_id });
        if (cart) {
          cart.total = args.total;
          cart.products.unshift(args.product);
          cart.updated = Date.now();
          return await cart.save();
        }

        const newCart = new Cart({
          user_id: args.user_id,
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


    addToCart: async (root, args, { id }) => {
      if (!id) {
        return MESSAGE_RESPONSE("TOKEN_REQ", "Cart", false);
      }
      try {

        //console.log('args',args);
        const cart = await Cart.findOne({ user_id: args.user_id });

        if (cart) {
          delete args.user_id;
          delete args.total;

          const product = await Product.findById({ _id: args.product_id });
          if (product.pricing.sellprice > 0) {
            args.total = args.qty * product.pricing.sellprice;
          } else {
            args.total = args.qty * product.pricing.price;
          }
          cart.products.push(args);
          cart.total = cart.total + args.total;
          cart.updated = Date.now();
          await cart.save();
        } else {
          // console.log('nocart',);


          const product = await Product.findById({ _id: args.product_id });
          if (product.pricing.sellprice > 0) {
            args.total = args.qty * product.pricing.sellprice;
          } else {
            args.total = args.qty * product.pricing.price;
          }


          // cart.products.product_id =  args.product_id;
          // cart.products.qty =  args.qty;
          // cart.products.total =  args.total;
          // cart.total =   args.total;
          // cart.updated = Date.now();
          // await cart.save();


          let prductarry = [
            {
              product_id: args.product_id,
              product_title: args.product_title,
              product_price: args.product_price,
              product_image: args.product_image,
              qty: args.qty,
              total: args.total,
            }
          ]
          const newCart = new Cart({
            user_id: args.user_id,
            total: args.total,
            products: prductarry
          });
          await newCart.save();
          return MESSAGE_RESPONSE("AddSuccess", "Cart", true);

        }
        return MESSAGE_RESPONSE("AddSuccess", "Cart", true);

      } catch (error) {
        error = checkError(error);
        return MESSAGE_RESPONSE("CREATE_ERROR", "Cart", false);
      }
    },



    addCart: async (root, args, { id }) => {
      if (!id) {
        return MESSAGE_RESPONSE("TOKEN_REQ", "Cart", false);
      }
      try {
        const cart = await Cart.findOne({ user_id: args.user_id });
        const existingProducts = cart && cart.products ? cart.products : []
        var carttotal = 0;
        for (let i in args.products) {
          if (args.products[i].product_id) {
            const product = await Product.findById({ _id: args.products[i].product_id });
            // assign product name
            args.products[i].product_title = product.name
            // assign product image
            args.products[i].product_image = product.feature_image.thumbnail
            // assign product price 
            args.products[i].product_price = product.pricing.sellprice > 0 ? product.pricing.sellprice : product.pricing.price
            // calculate total of individual product
            args.products[i].total = product.pricing.sellprice > 0 ? args.products[i].qty * product.pricing.sellprice : args.products[i].qty * product.pricing.price;
          }
          carttotal = carttotal + args.products[i].total;
          existingProducts.push(args.products[i])
        }
        if(cart) {
          cart.total += carttotal
          cart.products = existingProducts
          await cart.save();
        }else{
          const newCart = new Cart({
            user_id: args.user_id,
            total: carttotal,
            products: existingProducts
          });
          await newCart.save();
        }
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
      //console.log("updateCart", args)
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
          for (let i in args.products) {
            if (args.products[i].product_id) {
              const product = await Product.findById({ _id: args.products[i].product_id });

              if (product.pricing.sellprice > 0) {
                args.products[i].total = args.products[i].qty * product.pricing.sellprice;
              } else {
                args.products[i].total = args.products[i].qty * product.pricing.price;
              }
            }
            carttotal = carttotal + args.products[i].total;
          }
          cart.total = carttotal;
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
    },

    changeQty: async (root, args, { id }) => {
      checkToken(id);
      try {
        const cart = await Cart.findOne({ user_id: args.user_id });
        for (let i in cart.products) {
          // console.log(cart.products[i])
          if(cart.products[i].product_id.toString() === args.product_id.toString()){
            cart.products[i].qty = args.qty
          }
        }
        await cart.save()
        return MESSAGE_RESPONSE("UpdateSuccess", "Quantity", true);
      } catch (error) {
        error = checkError(error);
        return MESSAGE_RESPONSE("UPDATE_ERROR", "Cart", false);
      }
    },

    //,.........................................
    deleteCart: async (root, args, { id }) => {
      checkToken(id);
      const cart = await Cart.findByIdAndRemove(args.id);
      if (cart) {
        return MESSAGE_RESPONSE("DeleteSuccess", "Cart", true);
        //return true;
      }
      return false;
    },
    deleteCartProduct: async (root, args, { id }) => {
      checkToken(id);
      const cart = await Cart.findById(args.id);
      // console.log(cart);
      if (cart) {
        // for (let i in cart.products) {
        //   if (cart.products[i].product_id === args.product_id) {
        //     cart.products.splice(i, 1);
        //     cart.updated = Date.now();
        //     return await cart.save();
        //   }
        // }
        var customer_cart = cart.products;
        for (let i in customer_cart) {
          if (customer_cart[i].product_id == args.product_id) {
            cart.products = [];
            delete customer_cart[i];

            cart.products = customer_cart;
            break;
          }
        }

        //console.log(cart.products);

        var carttotal = 0;
        for (let i in cart.products) {
          if (cart.products[i].product_id) {
            const product = await Product.findById({ _id: cart.products[i].product_id });

            if (product.pricing.sellprice > 0) {
              cart.products[i].total = cart.products[i].qty * product.pricing.sellprice;
            } else {
              cart.products[i].total = cart.products[i].qty * product.pricing.price;
            }
          }
          carttotal = carttotal + cart.products[i].total;
        }
        cart.total = carttotal;
        cart.products = cart.products;
        cart.updated = Date.now();
        await cart.save();
        return MESSAGE_RESPONSE("UpdateSuccess", "Cart", true);
      } else {
        //throw putError("Cart not exist");
        return MESSAGE_RESPONSE("NOT_EXIST", "Cart", false);
      }
    },
  },
};
