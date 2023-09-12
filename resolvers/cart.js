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
  againCalculateCart,
  _validate, getdate
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


    calculateCoupon: async (root, args, { id }) => {
      try {
        const coupon = await Coupon.findOne({ code: { $regex: `${args.coupon_code}`, $options: "i" } });
        let calculated = {
          total_coupon: {},
          message: '',
          success: false
        };

        let date = getdate('2');

        if (!coupon) {
          calculated.total_coupon = 0.0;
          calculated.message = 'Invalid coupon code';
        } 
        else {
            
          if (coupon.expire >= date) {

            let cartTotal = 0
            args.cart.map(item => cartTotal += item.product_total)
            if ((coupon.minimum_spend === 0 || coupon.minimum_spend <= cartTotal) && (coupon.maximum_spend === 0 || coupon.maximum_spend > cartTotal)) {
              var discountAmount = 0
              coupon.discount_type === "amount-discount" ?
                discountAmount = await againCalculateCart(coupon, args.cart, Product, true) :
                discountAmount = await againCalculateCart(coupon, args.cart, Product, false)
              calculated.total_coupon = Math.round(discountAmount).toFixed(2);
              calculated.message = 'Coupon code applied successfully';
              calculated.success = true;
            }
            else {
              calculated.total_coupon = 0.0;
              calculated.message = 'Coupon not applicable on cart';
            }

          } else {
            calculated.total_coupon = 0.0;
            calculated.message = 'Coupon no longer applicable';
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
     // const productAttribute = await ProductAttribute.find({});

        
        let items = [];
              let total_tax=0
              let total_shipping=0             
              let grand_total=0
              let cart_total =0
              

              let global_tax = false;
              let taxPercentage;
                if (tax.global.is_global){

                    let taxClassId = tax.global.tax_class;

                          tax.tax_class.forEach((taxObject)=>{

                                      if(taxObject._id.toString() == taxClassId.toString()){
                                        global_tax = true;
                                        taxPercentage = taxObject.percentage
                                      }
                          })
                }

                let global_shipping = false;
                let globalShippingAmount;
                let globalShippingPerOrder = false;

                if(shipping.global.is_global){

                  let shippingClassId = shipping.global.shipping_class;

                  shipping.shipping_class.forEach((shippingObject)=>{

                    if(shippingObject._id.toString() == shippingClassId.toString()){

                      global_shipping = true;
                      globalShippingAmount = shippingObject.amount;
                      
                    }
                  })

                  if(shipping.global.is_per_order){
                    globalShippingPerOrder = true
                  }

                }


// if global tax applicable

              if(global_tax){ 

                for(let a=0;a<args.cart.length;a++){

                  cartProduct = args.cart[a];                 
                  let productShippingAmount ;
                  let product_tax;

                  const product = await Product.findById({ _id:cartProduct.product_id}).lean();
                  let odredQuantity = cartProduct.qty

                  let productPrice = product.pricing.sellprice>0 ? product.pricing.sellprice : product.pricing.price;
                       cart_total += productPrice * odredQuantity;

                  // product tax calculation
                      if(taxPercentage != 0) {grand_total= grand_total+(productPrice * odredQuantity)+((productPrice*taxPercentage/100)*odredQuantity);
                                      
                            total_tax = total_tax + (productPrice*taxPercentage/100)*odredQuantity;                       
                            product_tax = (productPrice*taxPercentage/100)*odredQuantity
                      }
                      else {

                                grand_total= grand_total+(productPrice * odredQuantity)                                   
                                total_tax=0;
                                product_tax =0;                  
                          }        


                       // product shipping calculation

                      if(global_shipping){

                                          if(globalShippingPerOrder){
                              
                                                total_shipping +=globalShippingAmount;
                                                grand_total+=globalShippingAmount;
                                                productShippingAmount = +globalShippingAmount
                                              }                                                                          
                                        }

                      else if(!global_shipping){
                     
                              productShippingAmount=0;

                                let productShippingClass = product.shipping.shipping_class;

                                shipping.shipping_class.forEach((shippingObject)=>{

                                  if(shippingObject._id.toString() == productShippingClass.toString()){                        
                                    productShippingAmount = shippingObject.amount*odredQuantity;
                                  }

                                })

                                total_shipping+=productShippingAmount;
                                grand_total+=productShippingAmount;

                          }

                      items.push({
                        product_id : product._id,
                        product_title: product.name,
                        product_image: product.feature_image,
                        product_price :productPrice.toFixed(2),
                        qty : +odredQuantity,
                        product_total : productPrice*(+odredQuantity),
                        product_shipping:productShippingAmount.toFixed(2),
                        product_tax:product_tax.toFixed(2)
                      })

                    }

                    if(global_shipping && !globalShippingPerOrder){
                      grand_total+=globalShippingAmount;
                      total_shipping = globalShippingAmount;
                    }                    

                  }

              //if global tax is not applicable;

              else{    

                        for(let a=0;a<args.cart.length;a++){
                          
                          cartProduct = args.cart[a]                     
                          let productShippingAmount;

                          const product = await Product.findById({ _id:cartProduct.product_id}).lean();
                          let odredQuantity = cartProduct.qty
        
                          let productPrice = product.pricing.sellprice>0 ? product.pricing.sellprice : product.pricing.price;
                           cart_total += productPrice * odredQuantity;

                          let productTaxClass = product.tax_class;
                          let productTaxPercentage;
                          let productTaxAmount;
                          
                          tax.tax_class.forEach((taxObject)=>{

                            if(taxObject._id.toString() == productTaxClass.toString()){
                              productTaxPercentage = taxObject.percentage;
                            }
                              })

                          //calculating product tax amount,adding product price and product tax in grand total;    

                          if(productTaxPercentage !=0){

                            grand_total= grand_total+(productPrice * odredQuantity)+((productPrice*productTaxPercentage/100)*odredQuantity);
                            productTaxAmount = (productPrice*productTaxPercentage/100)*odredQuantity;
                              total_tax += +productTaxAmount;

                          }
                          else {

                            productTaxAmount =0;
                            total_tax += +productTaxAmount;
                            grand_total+=+productTaxAmount;
                          }
                          


        //calculating product shipping and adding product shipping in grand total amount

                      if(global_shipping){
        
                                        if(globalShippingPerOrder){
                                          
                                          total_shipping +=globalShippingAmount;
                                          grand_total+=globalShippingAmount;
                                          productShippingAmount = +globalShippingAmount
                                        }

                                  }
                          else if(!global_shipping){   
                            
                                      productShippingAmount=0;
              
                                  let productShippingClass = product.shipping.shipping_class;
              
                                  shipping.shipping_class.forEach((shippingObject)=>{
              
                                    if(shippingObject._id.toString() == productShippingClass.toString()){                        
                                      productShippingAmount = shippingObject.amount*odredQuantity;
                                    }
              
                                  })    

                                total_shipping+=productShippingAmount;
                                grand_total+=productShippingAmount;

                              }
        
                              items.push({
                                product_id : product._id,
                                product_title: product.name,
                                product_image: product.feature_image,
                                product_price :productPrice.toFixed(2),
                                qty : +odredQuantity,
                                product_total : productPrice*(+odredQuantity),
                                product_shipping:productShippingAmount.toFixed(2),
                                product_tax:productTaxAmount.toFixed(2)                           
                              })    
    
                        }

                        if(global_shipping && !globalShippingPerOrder){
                          grand_total+=globalShippingAmount;
                          total_shipping = globalShippingAmount;
                        }

                      }
                  
                        let calculated = {
                          cartItem:items,
                          total_tax:total_tax.toFixed(2),
                          total_shipping:total_shipping.toFixed(2),
                          grand_total:grand_total.toFixed(2),
                          cart_total : cart_total.toFixed(2)
                   }

            console.log("calculated cart----",calculated)
      
        return calculated;

      }
      catch (error) {

            console.log(error)
            error = checkError(error);
            throw new Error(error.custom_message);

      }
    },

    // old code of calculate Cart
//     calculateCart : async (root,args,{id})=>{
//         // let isGlobalTaxObj = {};
//         // if (!tax[0].is_inclusive && tax[0].global.is_global) {
//         //   for (const taxval of tax[0].tax_class) {
//         //     if (tax[0].global.tax_class.toString() === taxval._id.toString()) {
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
//         //   for (const shippingVal of shipping[0].shipping_class) {
//         //     if (
//         //       shipping[0].global.shipping_class.toString() ===
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
//         //   productIds.push(item.product_id);
//         //   if (typeof productById[item.product_id.toString()] !== "object") {
//         //     productById[item.product_id.toString()] = {};
//         //     productById[item.product_id.toString()].carts = [];
//         //   }
//         //   productById[item.product_id.toString()].carts.push(item);
//         // });

//         // const products = await Product.find({ _id: { $in: productIds } });

//         // for (const prod of products) {
//         //   productById[prod._id.toString()].price = prod.pricing.sellprice ? prod.pricing.sellprice : prod.pricing.price
//         //   productById[prod._id.toString()].product = {
//         //     product_id: prod._id,
//         //     variant: prod.variant,
//         //     shipping: prod.shipping,
//         //     tax_class: prod.tax_class,
//         //   };
//         // }

//         // const productAttributeVariation = await ProductAttributeVariation.find({
//         //   product_id: { $in: productIds },
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
//         //           productById[prod.product_id.toString()].carts[0].combination.push(attrVal._id.toString())
//         //           attributeVariation.combination_values.push({
//         //             id: attrVal._id,
//         //             name: attrVal.name,
//         //           });
//         //         }
//         //       }
//         //     }

//         //     if (!productById[prod.product_id.toString()].attributeVariation) {
//         //       productById[prod.product_id.toString()].attributeVariation = [];
//         //     }

//         //     productById[prod.product_id.toString()].attributeVariation.push(
//         //       attributeVariation
//         //     );
//         //   } else {
//         //     productById[prod.product_id.toString()].price = prod.price;
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
//         //           item.product_id = productById[i].product.product_id;
//         //           item.combination = varProduct.combination_values;
//         //         }
//         //       }
//         //     } 
//         //     else {
//         //       item.price = productById[i].price * item.qty;
//         //       item.product_id = productById[i].product.product_id;
//         //       //console.log(item);
//         //     }

//         //     if (!tax[0].is_inclusive && !tax[0].global.is_global) {
//         //       for (const taxval of tax[0].tax_class) {
//         //         // console.log(productById[i]);
//         //         if (
//         //           productById[i].product.tax_class.toString() ===
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
//         //       for (const shippingVal of shipping[0].shipping_class) {
//         //         if (
//         //           productById[i].product.shipping.shipping_class.toString() ===
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
//         // calculated.total_tax = {
//         //   name: "",
//         //   amount: 0,
//         // };

//         // calculated.total_shipping = {
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
//         //     calculated.total_tax.amount += item.tax.amount;
//         //   }

//         //   if (
//         //     item.shipping &&
//         //     item.shipping.hasOwnProperty("amount") &&
//         //     item.shipping.amount >= 0
//         //   ) {
//         //     calculated.total_shipping.amount += item.shipping.amount;
//         //   }
//         // }

//         // if (shipping[0].global.is_global && shipping[0].global.is_per_order) {
//         //   calculated.total_shipping.amount = isGlobalShippingObj.amount;
//         //   calculated.total_shipping.name = isGlobalShippingObj.name;
//         // }

//         // if (isGlobalTaxObj && isGlobalTaxObj.hasOwnProperty("percentage")) {
//         //   calculated.total_tax.amount =
//         //     (calculated.subtotal / 100) * isGlobalTaxObj.percentage;
//         //   calculated.total_tax.name = isGlobalTaxObj.name;
//         // }

//         // calculated.total_coupon = args.total_coupon;
//         // calculated.grand_total =
//         //   calculated.subtotal +
//         //   calculated.total_shipping.amount +
//         //   calculated.total_tax.amount - calculated.total_coupon;

//         //console.log(calculated);
//     }
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
      // console.log('args', args)
      if (!id) {
        return MESSAGE_RESPONSE("TOKEN_REQ", "Cart", false);
      }
      try {

        //console.log('args',args);
        const cart = await Cart.findOne({ user_id: args.user_id });

          if (cart) {

                delete args.user_id;
                delete args.total;

                let globalTax = true;
                let isGlobalTax = await Tax.findOne({}).lean();

                if(!isGlobalTax.global.is_global){
                  globalTax=false;
                }


                let taxPercentage;
                if(!globalTax){

                  isGlobalTax.tax_class.forEach((taxObject)=>{

                  if (taxObject._id.toString()==args.tax_class){
                    taxPercentage = taxObject.percentage
                  }

                  })
                }


              const product = await Product.findById({ _id: args.product_id });

                    if(+taxPercentage!=0 && taxPercentage){   

                      let tax;
                      if (+product.pricing.sellprice > 0) {

                        tax = (+product.pricing.sellprice*(+taxPercentage))/100;

                        args.product_price = product.pricing.sellprice;
                        args.total = args.qty * product.pricing.sellprice+(tax*args.qty);

                      }
                      else {

                        tax = (+product.pricing.price*(+taxPercentage))/100;

                        args.product_price = product.pricing.price;
                        args.total = args.qty * product.pricing.price+(tax*args.qty);

                      };

                      args.product_taxPercentage=+taxPercentage;
                      args.product_tax=+tax;
                      cart.products.push(args);
                      if(cart.total){
                        cart.total = (cart.total+ args.total);
                      }
                      else {
                        cart.total = args.total;
                      }
                      cart.updated = Date.now();
                      await cart.save();

                    }


                else
                    {

                          if (product.pricing.sellprice > 0) {

                            args.product_price = product.pricing.sellprice;
                            args.total = args.qty * product.pricing.sellprice;

                          } else {

                            args.product_price = product.pricing.price;
                            args.total = args.qty * product.pricing.price;
                            
                          }

                          // args.product_taxPercentage=0;
                          // args.product_tax=0;
                          cart.products.push(args);
                          cart.total = cart.total||0 + args.total;
                          cart.updated = Date.now();
                          await cart.save();
                          
                  }
              } 
        // never run that code;
        // else {
        //   // console.log('nocart',);
        //   const product = await Product.findById({ _id: args.product_id });
        //   if (product.pricing.sellprice > 0) {
        //     args.product_price = product.pricing.sellprice;
        //     args.total = args.qty * product.pricing.sellprice;
        //   } else {
        //     args.product_price = product.pricing.price;
        //     args.total = args.qty * product.pricing.price;
        //   }


        //   // cart.products.product_id =  args.product_id;
        //   // cart.products.qty =  args.qty;
        //   // cart.products.total =  args.total;
        //   // cart.total =   args.total;
        //   // cart.updated = Date.now();
        //   // await cart.save();


        //   let prductarry = [
        //     {
        //       product_id: args.product_id,
        //       product_title: args.product_title,
        //       product_price: args.product_price,
        //       product_image: args.product_image,
        //       qty: args.qty,
        //       total: args.total,
        //       tax_class: args.tax_class,
        //       shipping_class: args.shipping_class,
        //     }
        //   ]
        //   const newCart = new Cart({
        //     user_id: args.user_id,
        //     total: args.total,
        //     products: prductarry
        //   });
        //   await newCart.save();
        //   return MESSAGE_RESPONSE("AddSuccess", "Cart", true);

        // }
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
        const cart = await Cart.findOne({ user_id: args.user_id });
        let existingCartProducts = cart && cart.products ? cart.products : [];
        // let carttotal = 0;
        // if local products exists then only run loop for adding products in customer cart
        if (args.products)
          for (let localProd of args.products) {
            if (localProd.variant_id) {
              // let productAttributeValue =
              //   await ProductAttributeVariation.findById(localProd.variant_id);
    
              // let product = await Product.findById({
              //   _id: localProd.product_id,
              // });
              let product_id = localProd.product_id;           
              let qty = localProd.qty;
              
              // let shipping_class = product.shipping.shipping_class
              //   ? product.shipping.shipping_class
              //   : "";
              // let tax_class = product.tax_class ? product.tax_class : "";
    
              if (!existingCartProducts.length) {
                existingCartProducts.push({
                  product_id,
                  variant_id: localProd.variant_id.toString(),             
                  qty,
                  shipping_class,
                  tax_class,
                });
              } else {
                // check local product id with customer cart product id
                let existingProduct = existingCartProducts.find((prod) =>
                  prod.product_id.toString() ===
                    localProd.product_id.toString() &&
                  prod.variant_id == localProd.variant_id.toString()
                    ? prod
                    : false
                );
                // if matches then update customer cart product with local product
                if (existingProduct) {
                  existingProduct.qty += localProd.qty
                }
                // else add local product to customer cart
                else {
                  existingCartProducts.push({
                    product_id,                   
                    variant_id,
                    qty,                
                    // shipping_class,
                    // tax_class,
                  });
                }
              }
            }
          
        // ==============================================================================================================
        else {
          let product = await Product.findById({ _id: localProd.product_id });
          // declare variables to be used for adding product to cart
          
          let product_id = localProd.product_id;
        
          let shipping_class = product.shipping.shipping_class;
          let tax_class = product.tax_class;
          let qty = localProd.qty;
          // if customer cart is empty then add product from local
          if (!existingCartProducts.length) {
            existingCartProducts.push({
              product_id,            
              qty,
              shipping_class,
              tax_class,
            });
          }
          // else update customer cart with local
          else {
            // check local product id with customer cart product id
            let existingProduct = existingCartProducts.find((prod) =>
              prod.product_id.toString() === localProd.product_id.toString() && !prod.variant_id
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
                product_id,
                qty,
                shipping_class,
                tax_class,
              });
            }
          }
        }
      }
        //---------------------------------------------------------------------------------------------------------------
    
        // calculate carttotal from total of all products in customer cart
        // existingCartProducts.map(async (cartProduct) => {
        //   if(cartProduct.variant_id){          
        //   let productAttributeValue =
        //         await ProductAttributeVariation.findById(cartProduct.variant_id);
        //  let price = productAttributeValue.pricing.sellprice>0 ?  productAttributeValue.pricing.sellprice : productAttributeValue.pricing.price
        //    carttotal += price;
        //   }
        //   else {
    
        //   }
        // });
        // if customer cart exists then update
        if (cart) {
          cart.products = existingCartProducts;
          await cart.save();
        }
        // else create new cart
        else {
          const newCart = new Cart({
            user_id: args.user_id,
            products: existingCartProducts,
            total:0,
            product_quantity:0
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

                if(!isGlobalTax.global.is_global){
                  globalTax=false;
                }
                
              
                if(!globalTax){

                for (let i in args.products) {

                    if (args.products[i].product_id) {


                      const product = await Product.findById({ _id: args.products[i].product_id });



                                let taxPercentage;
                                isGlobalTax.tax_class.forEach((taxObject)=>{

                                  if (taxObject._id.toString()==args.products[i].tax_class){
                                    taxPercentage = taxObject.percentage
                                  }
                
                                  })


                        let tax;
                        if (product.pricing.sellprice > 0) {

                          tax = (+product.pricing.sellprice*(+taxPercentage))/100;
                                    args.products[i].product_price = product.pricing.sellprice;
                                    args.products[i].total = args.products[i].qty * product.pricing.sellprice+(tax*args.products[i].qty);

                        } else {

                          tax = (+product.pricing.price*(+taxPercentage))/100;
                                    args.products[i].product_price = product.pricing.price;
                                    args.products[i].total = args.products[i].qty * product.pricing.price+(tax*args.products[i].qty);

                        }

                        args.products[i].product_tax= tax
                        args.products[i].product_taxPercentage= taxPercentage

                    }
                      carttotal = carttotal + args.products[i].total;
                  }

                    cart.total = carttotal;
                    cart.products = args.products;
                    cart.updated = Date.now();
                    await cart.save();
                    return MESSAGE_RESPONSE("UpdateSuccess", "Cart", true);

            }

          else {

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
      checkToken(id);
      try {
        const cart = await Cart.findOne({ user_id: args.user_id });
        for (let i in cart.products) {
          // console.log(cart.products[i])
          if (cart.products[i].product_id.toString() === args.product_id.toString()) {
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
