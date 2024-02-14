const Cart = require("../models/Cart");
const Product = require("../models/Product");
const Tax = require("../models/Tax");
const Coupon = require("../models/Coupon");
const Shipping = require("../models/Shipping");
const ProductAttributeVariation = require("../models/ProductAttributeVariation");
const { GET_SINGLE_FUNC, GET_ALL_FUNC } = require("../config/api_functions");

const {
  putError,
  checkError,
  checkToken,
  MESSAGE_RESPONSE,
  againCalculateCart,
  getdate,
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
        const cart = await Cart.findById(args.userId);
        if (!cart) {
          throw putError("Cart not found");
        }

        let availableItem = [];
        let unavailableItem = [];
        let cartItem = cart.products;

        let productsArray = cart.products;
        for (let a = 0; a < productsArray.length; a++) {
          let product = productsArray[a];

          let isProductAvilable = {};

          let addvariants = false;
          let attribute = [];
          if (product?.variantId) {
            addvariants = true;
            isProductAvilable = await Product.findById(product.productId);
            attribute = await ProductAttributeVariation.find({
              productId: product.productId,
              _id: product?.variantId,
              quantity: { $gte: product.qty },
            });
          } else {
            isProductAvilable = await Product.findOne({
              _id: new ObjectId(product.productId),
              quantity: { $gte: product.qty },
            });
          }

          if (
            isProductAvilable &&
            ((!addvariants && attribute?.length === 0) ||
              (addvariants && attribute?.length > 0))
          ) {
            let prod = {
              productId: product?.productId,
              productTitle: isProductAvilable?.name,
              productImage: isProductAvilable?.feature_image,
              productPrice:
                isProductAvilable?.pricing?.sellprice ||
                isProductAvilable?.pricing?.price ||
                product?.productPrice,
              qty: product?.qty,
              total:
                product?.qty * isProductAvilable?.pricing?.sellprice ||
                isProductAvilable?.pricing?.price ||
                product?.productPrice,
              attributes: product?.attributes,
              productQuantity: isProductAvilable?.quantity,
              variantId: product?.variantId,
              shippingClass: isProductAvilable?.shipping?.shippingClass,
              taxClass: isProductAvilable?.taxClass,
              _id: product?._id,
            };
            availableItem.push(prod);
          } else {
            unavailableItem.push(product);
          }
        }

        return {
          id: cart._id,
          cartItem,
          availableItem,
          unavailableItem,
          status: cart.status,
          total: cart.total,
          date: cart.date,
          updated: cart.updated,
        };
      } catch (error) {
        error = checkError(error);
        throw new Error(error.custom_message);
      }
    },

    calculateCoupon: async (root, args, { id }) => {
      try {
        // const coupon = await Coupon.findOne({ code: { $regex: `${args.couponCode}`, $options: "i" } });
        const coupon = await Coupon.findOne({ code: args.couponCode });

        let discountGrandTotal;
        let calculated = {
          totalCoupon: {},
          message: "",
          success: false,
          cartItem: args.cartItem,
          cartTotal: args.cartTotal,
          totalShipping: args.totalShipping,
          totalTax: args.totalTax,
          grandTotal: args.grandTotal,
        };

        let date = getdate("2");

        if (!coupon) {
          calculated.totalCoupon = "0.0";
          calculated.message = "Invalid coupon code";
        } else {
          if (coupon.expire >= date) {
            let cartTotal = 0;
            // args.cart.map(item => cartTotal += item.productTotal)
            cartTotal = args.cartTotal;

            if (
              (coupon.minimumSpend === 0 || coupon.minimumSpend <= cartTotal) &&
              (coupon.maximumSpend === 0 || coupon.maximumSpend > cartTotal)
            ) {
              if (!coupon.category && !coupon.product) {
                var calculatedCartWithDiscount =
                  coupon.discountType === "amount-discount"
                    ? parseFloat(coupon.discountValue)
                    : parseFloat(cartTotal / 100) *
                      parseFloat(coupon.discountValue);
                calculated.totalCoupon = Math.round(
                  calculatedCartWithDiscount
                ).toFixed(2);

                calculated.discountGrandTotal = (
                  +args.grandTotal - Math.round(+calculatedCartWithDiscount)
                ).toFixed(2);
                calculated.message = "Coupon code applied successfully";
                calculated.success = true;
              } else {
                var calculatedCartWithDiscount = 0;

                coupon.discountType === "amount-discount"
                  ? (calculatedCartWithDiscount = await againCalculateCart(
                      coupon,
                      args,
                      Product,
                      true
                    ))
                  : (calculatedCartWithDiscount = await againCalculateCart(
                      coupon,
                      args,
                      Product,
                      false
                    ));

                if (calculatedCartWithDiscount == 0) {
                  calculated.totalCoupon = "0.0";
                  calculated.message = "Coupon not applicable on cart";
                  calculated.discountGrandTotal = "0.00";
                } else {
                  calculated.totalCoupon = Math.round(
                    calculatedCartWithDiscount
                  ).toFixed(2);
                  calculated.discountGrandTotal = (
                    +args.grandTotal - Math.round(+calculatedCartWithDiscount)
                  ).toFixed(2);
                  calculated.message = "Coupon code applied successfully";
                  calculated.success = true;
                }
              }
            } else {
              calculated.totalCoupon = "0.0";
              calculated.message = "Coupon not applicable on cart";
            }
          } else {
            calculated.totalCoupon = "0.0";
            calculated.message = "Coupon no longer applicable";
          }
        }
        return calculated;
      } catch (error) {
        error = checkError(error);
        throw new Error(error.custom_message);
      }
    },

    calculateCart: async (root, args, { id }) => {
      try {
        const shipping = await Shipping.findOne({});
        const tax = await Tax.findOne({});

        let items = [];
        let totalTax = 0;
        let totalShipping = 0;
        let grandTotal = 0;
        let cartTotal = 0;

        let global_tax = false;
        let taxPercentage;
        if (tax.global.is_global) {
          let taxClassId = tax.global.taxClass;

          tax.taxClass.forEach((taxObject) => {
            if (taxObject._id.toString() == taxClassId.toString()) {
              global_tax = true;
              taxPercentage = taxObject.percentage;
            }
          });
        }

        let global_shipping = false;
        let globalShippingAmount;
        let globalShippingPerOrder = false;

        if (shipping.global.is_global) {
          let shippingClassId = shipping.global.shippingClass;

          shipping.shippingClass.forEach((shippingObject) => {
            if (shippingObject._id.toString() == shippingClassId.toString()) {
              global_shipping = true;
              globalShippingAmount = shippingObject.amount;
            }
          });

          if (shipping.global.is_per_order) {
            globalShippingPerOrder = true;
          }
        }

        // if global tax applicable

        if (global_tax) {
          for (let a = 0; a < args.cartItem.length; a++) {
            cartProduct = args.cartItem[a];

            let productShipping;

            let productTax;

            const product = await Product.findById({
              _id: cartProduct.productId,
            }).lean();
            let odredQuantity = cartProduct.qty;

            let productPrice = product.pricing.sellprice;
            if (cartProduct?.variantId) {
              const variations = await ProductAttributeVariation.find({
                productId: cartProduct.productId,
                _id: cartProduct?.variantId,
              });
              productPrice = variations[0]?.pricing?.sellprice;
              cartTotal += productPrice * odredQuantity;
            } else {
              cartTotal += productPrice * odredQuantity;
            }

            // product tax calculation
            if (taxPercentage != 0) {
              grandTotal =
                grandTotal +
                productPrice * odredQuantity +
                ((productPrice * taxPercentage) / 100) * odredQuantity;

              totalTax =
                totalTax +
                ((productPrice * taxPercentage) / 100) * odredQuantity;
              productTax =
                ((productPrice * taxPercentage) / 100) * odredQuantity;
            } else {
              grandTotal = grandTotal + productPrice * odredQuantity;
              totalTax = 0;
              productTax = 0;
            }

            // product shipping calculation

            if (global_shipping) {
              if (!globalShippingPerOrder) {
                totalShipping += globalShippingAmount * cartProduct?.qty;
                grandTotal += globalShippingAmount * cartProduct?.qty;

                productShipping = +(globalShippingAmount * cartProduct?.qty);
              }
            } else if (!global_shipping) {
              productShipping = 0;

              let productShippingClass = product.shipping.shippingClass;

              shipping.shippingClass.forEach((shippingObject) => {
                if (
                  shippingObject._id.toString() ==
                  productShippingClass.toString()
                ) {
                  productShipping = shippingObject.amount * odredQuantity;
                }
              });

              totalShipping += productShipping;
              grandTotal += productShipping;
            }

            let pushValue = {
              productId: product._id,
              productTitle: product.name,
              productImage: product.feature_image,
              productPrice: productPrice.toFixed(2),
              qty: +odredQuantity,
              productTotal: productPrice * +odredQuantity,
              productTax: productTax.toFixed(2),
            };

            if (productShipping) {
              pushValue.productShipping = productShipping.toFixed(2);
            }

            items.push(pushValue);
          }

          if (global_shipping && globalShippingPerOrder) {
            grandTotal += globalShippingAmount;
            totalShipping = globalShippingAmount;
          }
        }

        //if global tax is not applicable;
        else {
          for (let a = 0; a < args.cartItem.length; a++) {
            cartProduct = args.cartItem[a];

            let productShipping;

            const product = await Product.findById({
              _id: cartProduct.productId,
            }).lean();
            let odredQuantity = cartProduct.qty;

            let productPrice =
              product.pricing.sellprice > 0
                ? product.pricing.sellprice
                : product.pricing.price;
            cartTotal += productPrice * odredQuantity;

            let productTaxClass = product.taxClass;
            let productTaxPercentage;
            let productTaxAmount;

            tax.taxClass.forEach((taxObject) => {
              if (taxObject._id.toString() == productTaxClass?.toString()) {
                productTaxPercentage = taxObject.percentage;
              }
            });

            //calculating product tax amount,adding product price and product tax in grand total;

            if (productTaxPercentage != 0) {
              grandTotal =
                grandTotal +
                productPrice * odredQuantity +
                ((productPrice * productTaxPercentage) / 100) * odredQuantity;
              productTaxAmount =
                ((productPrice * productTaxPercentage) / 100) * odredQuantity;
              totalTax += +productTaxAmount;
            } else {
              productTaxAmount = 0;
              totalTax += +productTaxAmount;
              grandTotal += productPrice * odredQuantity + productTaxAmount;
            }

            //calculating product shipping and adding product shipping in grand total amount

            if (global_shipping) {
              if (!globalShippingPerOrder) {
                totalShipping += globalShippingAmount;
                grandTotal += globalShippingAmount;

                productShipping = +globalShippingAmount;
              }
            } else if (!global_shipping) {
              productShipping = 0;

              let productShippingClass = product.shipping.shippingClass;

              shipping.shippingClass.forEach((shippingObject) => {
                if (
                  shippingObject?._id?.toString() ==
                  productShippingClass?.toString()
                ) {
                  productShipping = shippingObject.amount * odredQuantity;
                }
              });

              totalShipping += productShipping;
              grandTotal += productShipping;
            }

            let pushValue = {
              productId: product._id,
              productTitle: product.name,
              productImage: product.feature_image,
              productPrice: productPrice.toFixed(2),
              qty: +odredQuantity,
              productTotal: productPrice * +odredQuantity,
              productTax: +productTaxAmount.toFixed(2),
            };

            if (productShipping) {
              pushValue.productShipping = productShipping.toFixed(2);
            }

            items.push(pushValue);
          }

          if (global_shipping && globalShippingPerOrder) {
            grandTotal += globalShippingAmount;
            totalShipping = globalShippingAmount;
          }
        }

        let calculated = {
          cartItem: items,
          totalTax: totalTax.toFixed(2),
          totalShipping: totalShipping.toFixed(2),
          grandTotal: grandTotal.toFixed(2),
          cartTotal: cartTotal.toFixed(2),
        };

        return calculated;
      } catch (error) {
        error = checkError(error);
        throw new Error(error.custom_message);
      }
    },
  },
  Mutation: {
    // runing With login
    addToCart: async (root, args, { id }) => {
      if (!id) {
        return MESSAGE_RESPONSE("TOKEN_REQ", "Cart", false);
      }
      try {
        const cart = await Cart.findOne({ userId: new ObjectId(args.userId) });

        if (cart) {
          delete args.userId;
          delete args.total;

          let globalTax = true;
          let isGlobalTax = await Tax.findOne({}).lean();

          if (!isGlobalTax.global.is_global) {
            globalTax = false;
          }

          let taxPercentage;
          if (!globalTax) {
            isGlobalTax.taxClass.forEach((taxObject) => {
              if (taxObject._id.toString() == args.taxClass) {
                taxPercentage = taxObject.percentage;
              }
            });
          }

          const product = await Product.findById({ _id: args.productId });

          if (+taxPercentage != 0 && taxPercentage) {
            let tax;
            if (+product.pricing.sellprice > 0) {
              tax = (+product.pricing.sellprice * +taxPercentage) / 100;

              args.productPrice = product.pricing.sellprice;
              args.total =
                args.qty * product.pricing.sellprice + tax * args.qty;
            } else {
              tax = (+product.pricing.price * +taxPercentage) / 100;

              args.productPrice = product.pricing.price;
              args.total = args.qty * product.pricing.price + tax * args.qty;
            }

            args.productTaxPercentage = +taxPercentage;
            args.productTax = +tax;
            cart.products.push(args);
            if (cart.total) {
              cart.total = cart.total + args.total;
            } else {
              cart.total = args.total;
            }
            cart.updated = Date.now();
            await cart.save();
          } else {
            if (product.pricing.sellprice > 0) {
              args.productPrice = product.pricing.sellprice;
              args.total = args.qty * product.pricing.sellprice;
            } else {
              args.productPrice = product.pricing.price;
              args.total = args.qty * product.pricing.price;
            }
            cart.products.push(args);
            cart.total = cart.total || 0 + args.total;
            cart.updated = Date.now();
            await cart.save();
          }
        }

        return MESSAGE_RESPONSE("AddSuccess", "Cart", true);
      } catch (error) {
        error = checkError(error);
        return MESSAGE_RESPONSE("CREATE_ERROR", "Cart", false);
      }
    },

    // runing WithOut login
    addCart: async (root, args, { id }) => {
      if (!id) {
        return MESSAGE_RESPONSE("TOKEN_REQ", "Cart", false);
      }
      try {
        const cart = await Cart.findOne({ userId: args.userId });
        let existingCartProducts = cart && cart.products ? cart.products : [];
        // let carttotal = 0;
        // if local products exists then only run loop for adding products in customer cart
        if (args.products)
          for (let localProd of args.products) {
            if (localProd.variantId) {
              let productAttributeValue =
                await ProductAttributeVariation.findById(localProd.variantId);
              let product = await Product.findById({
                _id: localProd.productId,
              });
              let productId = localProd.productId;
              let qty = localProd.qty;

              let shippingClass = product.shipping.shippingClass
                ? product.shipping.shippingClass
                : "";
              let taxClass = product.taxClass ? product.taxClass : "";
              if (!existingCartProducts.length) {
                existingCartProducts.push({
                  productId,
                  variantId: localProd.variantId.toString(),
                  productTitle: product?.name || localProd?.productTitle,
                  productPrice:
                    productAttributeValue?.pricing?.sellprice ||
                    product?.pricing?.sellprice ||
                    localProd?.productPrice,
                  attributes: localProd?.attributes,
                  productImage:
                    productAttributeValue?.image ||
                    product?.feature_image ||
                    localProd?.productImage,
                  qty,
                  shippingClass,
                  taxClass,
                });
              } else {
                // check local product id with customer cart product id
                let existingProduct = existingCartProducts.find((prod) =>
                  prod.productId.toString() ===
                    localProd.productId.toString() &&
                  prod.variantId == localProd.variantId.toString()
                    ? prod
                    : false
                );
                // if matches then update customer cart product with local product
                if (existingProduct) {
                  existingProduct.qty += localProd.qty;
                }
                // else add local product to customer cart
                else {
                  existingCartProducts.push({
                    productId,
                    variantId: localProd.variantId.toString(),
                    productTitle: product?.name || localProd?.productTitle,
                    productPrice:
                      productAttributeValue?.pricing?.sellprice ||
                      product?.pricing?.sellprice ||
                      localProd?.productPrice,
                    productImage:
                      productAttributeValue?.image ||
                      product?.feature_image ||
                      localProd?.productImage,
                    attributes: localProd?.attributes,
                    qty,
                    shippingClass,
                    taxClass,
                  });
                }
              }
            }

            // ==============================================================================================================
            else {
              let product = await Product.findById({
                _id: localProd.productId,
              });
              // declare variables to be used for adding product to cart

              let productId = localProd.productId;

              let shippingClass = product
                ? product?.shipping?.shippingClass
                : localProd?.shippingClass;
              let taxClass = product?.taxClass || localProd?.shippingClass;
              let qty = localProd?.qty || 1;
              let productTitle = product?.name || localProd?.productTitle;
              let productPrice =
                product?.pricing?.sellprice || localProd?.productPrice;
              let productImage =
                product?.feature_image || localProd?.productImage;
              // if customer cart is empty then add product from local

              if (!existingCartProducts.length) {
                existingCartProducts.push({
                  productId,
                  productTitle,
                  productPrice,
                  productImage,
                  qty,
                  shippingClass,
                  taxClass,
                });
              }
              // else update customer cart with local
              else {
                // check local product id with customer cart product id
                let existingProduct = existingCartProducts.find((prod) =>
                  prod.productId.toString() ===
                    localProd.productId.toString() && !prod.variantId
                    ? prod
                    : false
                );
                // if matches then update customer cart product with local product
                if (existingProduct) {
                  existingProduct.qty += localProd.qty;
                }
                // else add local product to customer cart
                else {
                  existingCartProducts.push({
                    productId,
                    productTitle,
                    productPrice,
                    productImage,
                    qty,
                    shippingClass,
                    taxClass,
                  });
                }
              }
            }
          }
        //---------------------------------------------------------------------------------------------------------------

        if (cart) {
          cart.products = existingCartProducts;
          await cart.save();
        }
        // else create new cart
        else {
          const newCart = new Cart({
            userId: args.userId,
            products: existingCartProducts,
            total: 0,
            productQuantity: 0,
          });
          await newCart.save();
        }
        return MESSAGE_RESPONSE("AddSuccess", "Cart", true);
      } catch (error) {
        error = checkError(error);
        return MESSAGE_RESPONSE("CREATE_ERROR", "Cart", false);
      }
    },

    updateCart: async (root, args, { id }) => {
      if (!id) {
        return MESSAGE_RESPONSE("TOKEN_REQ", "Cart", false);
      }
      if (!args.id) {
        return MESSAGE_RESPONSE("ID_ERROR", "Cart", false);
      }
      try {
        const cart = await Cart.findById({ _id: args.id });
        if (cart) {
          var carttotal = 0;

          let globalTax = true;
          let isGlobalTax = await Tax.findOne({}).lean();

          if (!isGlobalTax.global.is_global) {
            globalTax = false;
          }

          if (!globalTax) {
            for (let i in args.products) {
              if (args.products[i].productId) {
                const product = await Product.findById({
                  _id: args.products[i].productId,
                });

                if (product) {
                  let taxPercentage;
                  isGlobalTax.taxClass.forEach((taxObject) => {
                    if (taxObject._id.toString() == args.products[i].taxClass) {
                      taxPercentage = taxObject.percentage;
                    }
                  });

                  let tax;
                  if (product.pricing.sellprice > 0) {
                    tax = (+product.pricing.sellprice * +taxPercentage) / 100;
                    args.products[i].productPrice = product.pricing.sellprice;
                    args.products[i].total =
                      args.products[i].qty * product.pricing.sellprice +
                      tax * args.products[i].qty;
                  } else {
                    tax = (+product.pricing.price * +taxPercentage) / 100;
                    args.products[i].productPrice = product.pricing.price;
                    args.products[i].total =
                      args.products[i].qty * product.pricing.price +
                      tax * args.products[i].qty
                  }

                  args.products[i].productTax = tax
                  args.products[i].productTaxPercentage = taxPercentage

                  carttotal = carttotal + args.products[i].total;
                }
              }
            }

            cart.total = carttotal;
            cart.products = args.products;
            cart.updated = Date.now();
            await cart.save();
            return MESSAGE_RESPONSE("UpdateSuccess", "Cart", true);
          } else {
            for (let i in args.products) {
              if (args.products[i].productId) {
                const product = await Product.findById({
                  _id: args.products[i].productId,
                });
                if (product) {
                  if (product.pricing.sellprice > 0) {
                    args.products[i].total =
                      args.products[i].qty * product.pricing.sellprice
                  } else {
                    args.products[i].total =
                      args.products[i].qty * product.pricing.price
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
        const cart = await Cart.findOne({ userId: new ObjectId(args.userId) });
        for (let i in cart.products) {
          if (
            cart.products[i].productId.toString() === args.productId.toString()
          ) {
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
      const cart = await Cart.deleteOne({_id:args.id });
      if (cart) {
        return MESSAGE_RESPONSE("DeleteSuccess", "Cart", true);
        //return true;
      }
      return false;
    },
    deleteCartProduct: async (root, args, { id }) => {
      checkToken(id);
      const cart = await Cart.findById(args.id);
      if (cart) {
        var customer_cart = cart.products;
        for (let i in customer_cart) {
          if (
            customer_cart[i].productId == args.productId ||
            customer_cart[i]._id == args.productId
          ) {
            cart.products = [];
            delete customer_cart[i];

            cart.products = customer_cart;
            break;
          }
        }

        var carttotal = 0;
        for (let i in cart.products) {
          if (cart.products[i].productId) {
            const product = await Product.findById({
              _id: cart.products[i].productId,
            });

            if (product) {
              if (product.pricing.sellprice > 0) {
                cart.products[i].total =
                  cart.products[i].qty * product.pricing.sellprice;
              } else {
                cart.products[i].total =
                  cart.products[i].qty * product.pricing.price;
              }

              carttotal = carttotal + cart.products[i].total;
            }
          }
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
