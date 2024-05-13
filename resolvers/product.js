const ProductCat = require("../models/ProductCat");
const Product = require("../models/Product");
const Brand = require("../models/Brand");
const ProductAttributeVariation = require("../models/ProductAttributeVariation");
const ProductAttribute = require("../models/ProductAttribute");
const Review = require("../models/Review");
const ProductGroup = require("../models/ProductGroup");
const {
  isEmpty,
  putError,
  checkError,
  imageUpload,
  imageUnlink,
  updateUrl,
  MESSAGE_RESPONSE,
  _validate,
  _validatenested,
  duplicateData,
  toObjectID,
  validateAndSetUrl,
  getBreadcrumb,
  addCategoryAttributes
} = require("../config/helpers");
const {
  DELETE_FUNC,
  GET_BY_PAGINATIONS,
  GET_SINGLE_FUNC,
  GET_ALL_FUNC,
  GET_BY_URL,
  CREATE_FUNC,
  UPDATE_FUNC,
} = require("../config/api_functions");
const { checkAwsFolder } = require("../config/aws");
var mongoose = require("mongoose");

/* =============================WILL FIX LATER============================= */
const fs = require("fs");

var pdir = "./assets/images/product";
var pcdir = "./assets/images/product/category";
var pfdir = "./assets/images/product/feature";
var gdir = "./assets/images/product/gallery";
var pvdir = "./assets/images/product/variant";

if (!fs.existsSync(pdir)) {
  fs.mkdirSync(pdir);
}
if (!fs.existsSync(pcdir)) {
  fs.mkdirSync(pcdir);
}
if (!fs.existsSync(gdir)) {
  fs.mkdirSync(gdir);
}
if (!fs.existsSync(pfdir)) {
  fs.mkdirSync(pfdir);
}
if (!fs.existsSync(pvdir)) {
  fs.mkdirSync(pvdir);
}

// var cldir = "./assets/images/product/category/large";
// var cmdir = "./assets/images/product/category/medium";
// var ctdir = "./assets/images/product/category/thumbnail";
// var codir = "./assets/images/product/category/original";
// if (!fs.existsSync(cldir)) {
//   fs.mkdirSync(cldir);
// }
// if (!fs.existsSync(cmdir)) {
//   fs.mkdirSync(cmdir);
// }
// if (!fs.existsSync(codir)) {
//   fs.mkdirSync(codir);
// }
// if (!fs.existsSync(ctdir)) {
//   fs.mkdirSync(ctdir);
// }

// var fldir = "./assets/images/product/feature/large";
// var fmdir = "./assets/images/product/feature/medium";
// var ftdir = "./assets/images/product/feature/thumbnail";
// var fodir = "./assets/images/product/feature/original";

// if (!fs.existsSync(fldir)) {
//   fs.mkdirSync(fldir);
// }
// if (!fs.existsSync(fmdir)) {
//   fs.mkdirSync(fmdir);
// }
// if (!fs.existsSync(ftdir)) {
//   fs.mkdirSync(ftdir);
// }
// if (!fs.existsSync(fodir)) {
//   fs.mkdirSync(fodir);
// }

// var gldir = "./assets/images/product/gallery/large";
// var gmdir = "./assets/images/product/gallery/medium";
// var gtdir = "./assets/images/product/gallery/thumbnail";
// var godir = "./assets/images/product/gallery/original";

// if (!fs.existsSync(gldir)) {
//   fs.mkdirSync(gldir);
// }
// if (!fs.existsSync(gmdir)) {
//   fs.mkdirSync(gmdir);
// }
// if (!fs.existsSync(godir)) {
//   fs.mkdirSync(godir);
// }
// if (!fs.existsSync(gtdir)) {
//   fs.mkdirSync(gtdir);
// }

// var vldir = "./assets/images/product/variant/large";
// var vmdir = "./assets/images/product/variant/medium";
// var vtdir = "./assets/images/product/variant/thumbnail";
// var vodir = "./assets/images/product/variant/original";

// if (!fs.existsSync(vldir)) {
//   fs.mkdirSync(vldir);
// }
// if (!fs.existsSync(gmdir)) {
//   fs.mkdirSync(gmdir);
// }
// if (!fs.existsSync(vtdir)) {
//   fs.mkdirSync(vtdir);
// }
// if (!fs.existsSync(vodir)) {
//   fs.mkdirSync(vodir);
// }
/* =============================WILL FIX LATER============================= */

/* For Test geting child*/
let allids = [];
const getTree = async (id) => {
  let cats = await ProductCat.find({ parentId: id });
  for (let cat of cats) {
    allids.push(cat.id);
    await getTree(cat.id);
  }

  return Promise.resolve(allids);
};

module.exports = {
  Query: {
    getCategoryPageData: async (root, args) => {
      try {
        let { mainFilter, filters, sort, pageNo, limit } = args;
        pageNo = (!pageNo || pageNo == 0 ? 1 : pageNo);
        limit = (!limit || limit == 0 ? 10 : limit);
        // let req = 
        // {
        //   mainFilter: {
        //     "categoryId":"63b2b9d81681cb950fbf5b4b"
        //   },
        //   filters: [
        //     {
        //       "field":"brand",
        //       "type":"array",
        //       "category":"static",
        //       "valueType":"ObjectId",
        //       "data":[
        //         "662238c0831677e62c405af2", 
        //         "662238b7831677e62c405aed"
        //       ],
        //     },
            
        //     {
        //       "field":"pricing.sellprice",
        //       "type":"range",
        //       "category":"static",
        //       "valueType":"Integer",
        //       "data":{
        //         "minValue":10000,
        //         "maxValue":20000,
        //       },
        //     },
        //     {
        //       "field":"rating",
        //       "type":"choice",
        //       "category":"static",
        //       "valueType":"Integer",
        //       "data":{
        //         "minValue":3,
        //       },
        //     }
        //   ],
        //   pageNo:1,
        //   limit:3
        // }

        if(!mainFilter || !mainFilter.categoryUrl) {
          return MESSAGE_RESPONSE("Required", "Category", false);
        }

        //
        // preparing product category aggregation to load request category's parent category and all sub categories of
        // fetched parent category - START
        //
        let categoryAggr = [
          {
            $match: {
              url: mainFilter.categoryUrl,
            },
          },
          {
            $lookup: {
              from: "productcats",
              localField: "_id",
              foreignField: "parentId",
              as: "subCategories",
            },
          },
          {
            $lookup: {
              from: "productcats",
              localField: "parentId",
              foreignField: "_id",
              as: "parentCategory",
            },
          },
          {
            $lookup: {
              from: "productcats",
              localField: "parentCategory._id",
              foreignField: "parentId",
              as: "parentSubCategories",
            },
          },
          {
            $project: {
              _id: 1,
              name: 1,
              url: 1,
              description: 1,
              image: 1,
              parentId: 1,
        
              "parentCategory._id": 1,
              "parentCategory.name": 1,
              "parentCategory.url": 1,
              "parentCategory.image": 1,

              "subCategories._id": 1,
              "subCategories.name": 1,
              "subCategories.url": 1,
              "subCategories.image": 1,
            },
          },
        ];
        const categoryAggrActualResult = await ProductCat.aggregate(categoryAggr);
        if(!categoryAggrActualResult || !categoryAggrActualResult.length) {
          return MESSAGE_RESPONSE("RETRIEVE_ERROR", "Product", false);
        }
        const categoryAggrResult = categoryAggrActualResult[0];
        console.log('categoryAggrResult', categoryAggrResult);
        if(!categoryAggrResult.parentId) {
          console.log('in the parentId null condition');
          let mostParentCategoryData = categoryAggrResult;
          delete mostParentCategoryData["parentCategory"];
          delete mostParentCategoryData["parentSubCategories"];

          let returnResponse = {
            success:true,
            isMostParentCategory:true,
            mostParentCategoryData
          }
          return returnResponse;
        }

        if(!categoryAggrResult.parentCategory || !categoryAggrResult.parentCategory.length) {
          console.log(`parent category not found of selected category (url : ${mainFilter.categoryUrl})`);
          return MESSAGE_RESPONSE("RETRIEVE_ERROR", "Product", false);
        }
        
        let categoryTree = categoryAggrResult.parentCategory[0];
        let currentCategory = categoryAggrResult;
        delete currentCategory["parentCategory"];
        currentCategory.select = true;
        categoryTree.subCategories = currentCategory;
        //
        // preparing product category aggregation to load request category's parent category and all sub categories of
        // fetched parent category - END
        //

        //
        // preparing product aggregation to load category wise filter data and product - START
        // 
        let prodAggr = [];
        // adding category filter in the aggregation
        prodAggr.push({
          $match: {
            categoryId: categoryAggrResult._id.toString(),
          },
        });

        //
        // preparing product group facet to get no of products count and products as per page no and limit - START
        //
        let productFilters = [], productFilter, productDataFacet = [];
        if(filters && filters.length) {
          for(let filterElement of filters) {
            productFilter = {};
            productFilter[filterElement.field] = {};
            if(filterElement.type == 'array') {
              let values = [];
              for(let value of filterElement.select) {
                values.push(filterElement.valueType == "ObjectId" ? new mongoose.Types.ObjectId(value) : value);
              }
              productFilter[filterElement.field]["$in"] = values;
            }
            else if(filterElement.type == 'range' || filterElement.type == 'choice') {
              productFilter[filterElement.field]["$gte"] = filterElement.select.minValue;
              if(filterElement.select.maxValue) {
                productFilter[filterElement.field]["$lte"] = filterElement.select.maxValue;
              }
            }
            productFilters.push(productFilter);
          }
          productDataFacet.push({
            $match: {
              $and: productFilters
            },
          });
        }
        
        const slicePosition = (pageNo == 1 ? 0 : (pageNo - 1) * limit);
        let sortByExpression = {}, responseSortObject;
        if(sort && sort.field) {
          sortByExpression[sort.field] = (sort.type == "desc" ? -1 : 1);
          responseSortObject = sort;
        }
        else {
          sortByExpression = { "date": -1 };
          responseSortObject = {
            field:"date",
            type:"desc"
          }
        }
        
        productDataFacet.push(
          {
            $group: {
              _id: null,
              count: { $sum: 1 },
              products: { $push: "$$ROOT" },
            },
          },
          {
            $project: {
              count: 1,
              products: {
                $slice: [
                  {
                    $sortArray: {
                      input: {
                        $map: {
                          input: "$products",
                          as: "prod",
                          in: {
                            _id: "$$prod._id",
                            name: "$$prod.name",
                            quantity:"$$prod.quantity",
                            pricing:"$$prod.pricing",
                            url: "$$prod.url",
                            feature_image:"$$prod.feature_image",
                            rating: "$$prod.rating",
                            categoryId:"$$prod.categoryId",
                            date: "$$prod.date",
                          },
                        },
                      },
                      sortBy: sortByExpression,
                    },
                  },
                  slicePosition,
                  limit,
                ],
              },
            },
          },
        );
        //
        // preparing product group facet to get no of products count and products as per page no and limit - END
        //

        // adding brand, price and rating facets in the aggregation which provide distinct values
        // and adding product group facet which provice no of products count and products as per page no and limit 
        prodAggr.push({
          $facet: {
            brands: [
              {
                $group: {
                  _id: "$brand", // Group by the brand field to get distinct values
                  count: { $sum: 1 }, // Optional: count the number of products for each brand
                },
              },
              {
                $lookup: {
                  from: "brands", 
                  localField: "_id", 
                  foreignField: "_id", 
                  as: "brand_details", 
                },
              },
              {
                $unwind: "$brand_details", // Unwind the brand details to deconstruct the array
              },
              {
                $project: {
                  _id: 1, // Exclude the _id field
                  brandName: "$brand_details.name", // Include the brand name field
                  count: 1,
                },
              },
            ],
            price: [
              {
                $group: {
                  _id: null,
                  minPrice: {
                    $min: "$pricing.sellprice",
                  },
                  maxPrice: {
                    $max: "$pricing.sellprice",
                  },
                  count: { $sum: 1 },
                },
              },
            ],
            ratings: [
              {
                $group: {
                  _id: "$rating",
                  count: { $sum: 1 }, 
                },
              },
              {
                $addFields: {
                  value: "$_id",
                },
              },
              {
                $project: {
                  _id:0
                }
              }
            ],
            productData:productDataFacet
          },
        });

        // adding unwind in the aggregation to deconstruct the price array 
        prodAggr.push(
          {
            $unwind: "$price",
          },
        );

        const aggrActualResult = await Product.aggregate(prodAggr);
        
        if(!aggrActualResult) {
          return MESSAGE_RESPONSE("RETRIEVE_ERROR", "Product", false);
        }
        
        const aggrResult = aggrActualResult[0];

        let filterData = [];

        // preparing brand response data - START
        let brandFilterData;
        brandFilterData = {
          heading:"Brand",
          type:"array",
          field:"brand",
          category:"static",
          valueType: "ObjectId",
          data:[]
        };
        let loopBrandFilterData, reqBrandFilter;
        if(filters) {
          reqBrandFilter = filters.find(filter => filter.field == "brand");
        }
        for(let brand of aggrResult.brands) {
          loopBrandFilterData = {
            label:brand.brandName,
            value:brand._id,
            select:false
          };
          if(reqBrandFilter && reqBrandFilter.select) {
            loopBrandFilterData.select = reqBrandFilter.select.includes(brand._id.toString());
          }
          brandFilterData.data.push(loopBrandFilterData);
        }
        brandFilterData.data.sort(function(a, b) {
          // First, sort by boolean column (true comes before false)
          if (a.select === b.select) {
            // If boolean values are equal, sort by string column
            return a.label.localeCompare(b.label);
          }
          // If boolean values are different, sort true before false
          return a.select ? -1 : 1;
        });
        filterData.push(brandFilterData);
        // preparing brand response data - END

        // preparing price response data - START
        let priceFilterData;
        priceFilterData = {
          heading:"Price",
          type:"range",
          field:"pricing.sellprice",
          category:"static",
          valueType: "Decimal",
          data:{}
        };
        priceFilterData.data.minPrice = aggrResult.price.minPrice;
        priceFilterData.data.maxPrice = aggrResult.price.maxPrice;
        let reqPriceFilter;
        if(filters) {
          reqPriceFilter = filters.find(filter => filter.field == "pricing.sellprice");
          if(reqPriceFilter) {
            priceFilterData.select = reqPriceFilter.select;
          }
        }
        filterData.push(priceFilterData);
        // preparing price response data - END

        // preparing rating response data - START
        let ratingFilterData;
        ratingFilterData = {
          heading:"Rating",
          type:"choice",
          field:"rating",
          category:"static",
          valueType:"Integer",
          data:[]
        };
        let loopRatingFilterData, reqRatingFilter;
        if(filters) {
          reqRatingFilter = filters.find(filter => filter.field == "rating");
        }
        for(let i=4;i>0;i--) {
          //if(aggrResult.ratings.includes(rating => rating.value >= i && i != 4 && rating.value < i + 1)) {
          let isEligibleToAdd = false;
          if(i == 4) {
            if(aggrResult.ratings.some(rating => rating.value >= i)) {
              isEligibleToAdd = true;
            }  
          }
          else {
            if(aggrResult.ratings.some(rating => rating.value >= i && rating.value < i + 1)) {
              isEligibleToAdd = true;
            }  
          }

          //if(aggrResult.ratings.includes(
            //rating =>(i != 4 ? rating.value >= i && rating.value < i + 1 : rating.value >= i))) {
          if(isEligibleToAdd) {
            loopRatingFilterData = {
              label:`${i}★ & above`,
              value:i,
              select:false
            };
            if(reqRatingFilter && reqRatingFilter.select) {
              loopRatingFilterData.select = reqRatingFilter.select.minValue == i;
            }
            ratingFilterData.data.push(loopRatingFilterData);
          }
        }
        filterData.push(ratingFilterData);
        // preparing rating response data - END
        //
        // preparing product aggregation to load category wise filter data and product - END
        //

        let returnResponse = {
          success:true,
          isMostParentCategory:false,
          categoryTree,
          filterData,
          productData:aggrResult.productData[0],
          sort:responseSortObject
        }

        // console.log('returnResponse', returnResponse);
        return returnResponse;


        // let searchValue = "";
        // let filterKeyValues = [{ "brand": "Parada" }];
        // let categories = ["63b2b87b1681cb950fbf5b32"];
        // let pageNo = 1, limit = 1;

        // prodAggr = [];

        // if(searchValue) {
        //   prodAggr.push({
        //     $match: {
        //       "product_name": searchValue
        //     }
        //   });
        // }

        // if(filterKeyValues) {
        //   prodAggr.push({
        //     $match: {
        //       $and: filterKeyValues
        //     }
        //   });
        // }
        
        // if(categories) {
        //   prodAggr.push({
        //     $match: {
        //       "categoryId": { $in: categories }
        //     }
        //   });
        // }

        // prodAggr.push({
        //   $group: {
        //     _id: null,
        //     minPrice: { $min: "$price" },
        //     maxPrice: { $max: "$price" },
        //     count: { $sum: 1 },
        //     products: { $push: "$$ROOT" }
        //   }
        // },
        // {
        //   $project: {
        //     minPrice: 1,
        //     maxPrice: 1,
        //     count: 1,
        //     products: {
        //       $slice: ["$products", (pageNo - 1) * limit, limit]
        //     }
        //   }
        // });

        // // prodAggr = [
        // //   {
        // //     $match: {
        // //       "product_name": searchValue
        // //     }
        // //   },
        // //   {
        // //     $match: {
        // //       $and: [
        // //         { "brand": "Parada" },
        // //         { "filter2": "value2" },
        // //         // Add more filter conditions as needed
        // //       ]
        // //     }
        // //   },
        // //   {
        // //     $group: {
        // //       _id: null,
        // //       minPrice: { $min: "$price" },
        // //       maxPrice: { $max: "$price" },
        // //       count: { $sum: 1 },
        // //       products: { $push: "$$ROOT" }
        // //     }
        // //   },
        // //   {
        // //     $project: {
        // //       minPrice: 1,
        // //       maxPrice: 1,
        // //       count: 1,
        // //       products: {
        // //         $slice: ["$products", (page_no - 1) * limit, limit]
        // //       }
        // //     }
        // //   }
        // // ]
        
        // console.log('prodAggr', JSON.stringify(prodAggr));

        // let result = await Product.aggregate(prodAggr);

        // console.log('result', result);

        // result = {
        //   "success":true,
        //   "category":{
        //     "_id":"",
        //     "name":"Water Purifiers & Accessories",
        //     "subCategories":[
        //       {
        //         "_id":"",
        //         "name":"",
        //         "select":true,
        //         "noOfProducts":54
        //       },
        //       {
        //         "_id":"",
        //         "name":"",
        //         "select":false,
        //         "noOfProducts":45
        //       },
        //       {
        //         "_id":"",
        //         "name":"",
        //         "select":false,
        //         "noOfProducts":32
        //       },
        //       {
        //         "_id":"",
        //         "name":"",
        //         "select":false,
        //         "noOfProducts":12
        //       },
        //     ]
        //   },
        //   "filterData":[
        //     {
        //       "heading":"Brand",
        //       "data":[
        //         {
        //           "label":"Voltas",
        //           "value":"662264ee831677e62c40b5ec",
        //           "select":false
        //         },
        //         {
        //           "label":"Voltas",
        //           "value":"662264ee831677e62c40b5ec",
        //           "select":true
        //         },
        //         {
        //           "label":"Voltas",
        //           "value":"662264ee831677e62c40b5ec",
        //           "select":true
        //         },
        //         {
        //           "label":"Voltas",
        //           "value":"662264ee831677e62c40b5ec",
        //           "select":false
        //         }
        //       ],
        //       "type":"array"
        //     },
        //     {
        //       "heading":"Price",
        //       "data":{
        //         "minPrice":0,
        //         "maxPrice":5000
        //       },
        //       "select":{
        //         "minPrice":500,
        //         "maxPrice":1000
        //       },
        //       "type":"price"
        //     },
        //     {
        //       "heading":"Customer Rating",
        //       "data":[ 
        //         {
        //           "label":"1* and above", 
        //           "value":1, 
        //           "select":false
        //         },
        //         {
        //           "label":"2* and above", 
        //           "value":2, 
        //           "select":false
        //         },
        //         {
        //           "label":"3* and above", 
        //           "value":3, 
        //           "select":true
        //         },
        //         {
        //           "label":"4* and above", 
        //           "value":4, 
        //           "select":false
        //         },
        //       ],
        //       "type":"rating"
        //     },
        //   ]
        // }

        // return result || [];
      }
      catch(error) {
        console.log('error', error);
        return MESSAGE_RESPONSE("RETRIEVE_ERROR", "Product", false);
      }
    },
    productCategories: async (root, args) => {
      // console.log(await GET_ALL_FUNC(ProductCat, "Product Cats"), 'get all')
      return await GET_ALL_FUNC(ProductCat, "Product Cats");
    },
    productCategories_pagination: async (
      root,
      { limit, pageNumber, search, orderBy, order }
    ) => {
      let searchInFields = { name: { $regex: `${search}`, $options: "i" } };

      return await GET_BY_PAGINATIONS(
        limit,
        pageNumber,
        orderBy,
        order,
        searchInFields,
        ProductCat,
        "Product Categories"
      );
    },
    productCategoriesByFilter: async (root, args) => {
      try {
        const cats = await ProductCat.find(args.filter);
        return cats || [];
      } catch (error) {
        throw new Error("Something went wrong.");
      }
    },
    productCategory: async (root, args) => {
      return await GET_SINGLE_FUNC(args.id, ProductCat, "Product Cat");
    },
    products: async (root, args, { id }) => {
      return await GET_ALL_FUNC(Product, "Products", args.admin);
    },
    products_pagination: async (
      root,
      { limit, pageNumber, search, orderBy, order }
    ) => {
      let searchInFields = { name: { $regex: `${search}`, $options: "i" } };

      return await GET_BY_PAGINATIONS(
        limit,
        pageNumber,
        orderBy,
        order,
        searchInFields,
        Product,
        "Products"
      );
    },
    searchProducts: async (root, args, { id }) => {
      let {searchTerm, page, limit} = args
      searchTerm = searchTerm.split(" ")
      const regexPattern = searchTerm.map(search => `(?=.*${search})`).join('|');
      const searchRegex = new RegExp(regexPattern, "i")
      
      const pipeline = [
        {
          $match: {
            name: {
              $regex: searchRegex
            }
          },
        },
        {
          $sort: {
            updated: -1,
          },
        },
        {
          $group: {
            _id: null,
            count: {
              $sum: 1
            },
            products: {
              $push: "$$ROOT"
            }
          }
        },
        {
          $project: {
            _id: 0,
            count: 1,
            products: {
              $slice: ["$products", (page - 1) * limit, limit]
            }
          }
        }
      ]
      const searchedProducts = await Product.aggregate(pipeline)

      return searchedProducts[0] || [];
    },
    productswithcat: async (root, args, { id }) => {
      return await GET_ALL_FUNC(Product, "Products with category");
    },
    featureproducts: async (root, args, { id }) => {
      try {
        const products = await Product.find({
          featured_product: true,
          status: "Publish",
        }).limit(10);
        return products || [];
      } catch (error) {
        error = checkError(error);
        throw new Error(error.custom_message);
      }
    },
    recentproducts: async (root, args, { id }) => {
      try {
        const products = await Product.find({
          status: "Publish",
        })
          .sort({ $natural: -1 })
          .limit(10);

        return products || [];
      } catch (error) {
        error = checkError(error);
        throw new Error(error.custom_message);
      }
    },
    onSaleProducts: async (root, args, { id }) => {
      try {
        const products = await Product.find({
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

        return products || [];
      } catch (error) {
        error = checkError(error);
        throw new Error(error.custom_message);
      }
    },
    productsbycatid: async (root, args, { id }) => {
      try {
        const products = await Product.find({
          status: "Publish",
          categoryId: { $in: args.cat_id },
        })
          .sort({ $natural: -1 })
          .limit(10);
        return products || [];
      } catch (error) {
        error = checkError(error);
        throw new Error(error.custom_message);
      }
    },
    productsbycaturl: async (root, args, { id }) => {
      return await GET_BY_URL(ProductCat, args.cat_url, "Product Category");
    },
    productbyurl: async (root, args) => {
      if (!args.url) {
        return {
          message: MESSAGE_RESPONSE("URL_ERROR", "Product", false),
        };
      }
      const pipeline = [
        // match on the basis of id
        {
          $match: {
            url: args.url,
          },
        },
        // fetch rating count
        {
          $lookup: {
            from: "reviews",
            localField: "_id",
            foreignField: "productId",
            as: "reviewDetails"
          }
        },
        // populate attributes and varaitions
        {
          $lookup: {
            from: "productgroups",
            let: { productId: "$_id" },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $in: ["$$productId", "$productIds"],
                  },
                },
              },
              {
                $unwind: "$attributes",
              },
              {
                $lookup: {
                  from: "productattributes",
                  localField: "attributes._id",
                  foreignField: "_id",
                  as: "attributeDetails",
                },
              },
              {
                $unwind: "$attributeDetails",
              },
              
              {
                $addFields: {
                  "attributes.name":
                    "$attributeDetails.name",
                  "attributes.values": {
                    $filter: {
                      input: "$attributeDetails.values",
                      as: "value",
                      cond: {
                        $in: [
                          "$$value._id",
                          "$attributes.values",
                        ],
                      },
                    },
                  },
                },
              },
              {
                $group: {
                  _id: "$_id",
                  attributes: { $push: "$attributes" },
                  variations: { $first: "$variations" },
                },
              },
              {
                $project: {
                  _id: 0,
                  attributes: {
                    _id: 1,
                    name: 1,
                    values: {
                      _id: 1,
                      name: 1,
                    },
                  },
                  variations: 1,
                },
              },
            ],
            as: "group",
          },
        },
        {
          $addFields: {
            group: {
              $arrayElemAt: ["$group", 0]
            }
          }
        },
      ]
      let existingProducts = await Product.aggregate(pipeline);
      const response = existingProducts[0]
      if (!response) {
        return {
          message: MESSAGE_RESPONSE("RETRIEVE_ERROR", "Product", false),
          data: response,
        };
      }

      response["taxStatement"] = "Inclusive of all Taxes" 
      
      if(response.group) {
        const { attributes, variations } = response.group
        variations.map(variant => {
          variant.combinations.map(combo => {
            let foundAttribute = attributes.find(attr => attr._id.toString() === combo.attributeId.toString())
            if(foundAttribute) {
              combo["attributeName"] = foundAttribute.name
              let foundAttributeValue = foundAttribute.values.find(value => value._id.toString() === combo.attributeValueId.toString())
              if(foundAttributeValue) {
                combo["attributeValueName"] = foundAttributeValue.name
              }
            }
          })
        })
        response["attributes"] = attributes
        response["variations"] = variations
      }

      if(response.reviewDetails) {
        let reviewDetails = response.reviewDetails.filter(review => review.status === "approved")
        const fetchRatings = (min, max) => {
          return reviewDetails.filter(review => review.rating >= min && review.rating < max).length
        }

        response["ratingCount"] = reviewDetails.length
        response["levelWiseRating"] = {
          fiveStar: fetchRatings(5, 6),
          fourStar: fetchRatings(4, 5),
          threeStar: fetchRatings(3, 4),
          twoStar: fetchRatings(2, 3),
          oneStar: fetchRatings(1, 2),
        }
      }

      if(response.categoryTree && response.categoryTree.length) {
        response["breadcrumb"] = getBreadcrumb(response.categoryTree)
      }

      return {
        message: MESSAGE_RESPONSE("SINGLE_RESULT_FOUND", "Product", true),
        data: response,
      };
    },
    filteredProducts: async (root, args) => {
      try {
        const category = args.filter.category
        const brand = args.filter.brand
        const most_reviewed = args.filter.most_reviewed
        const search = args.filter.search
        const product_type = args.filter.product_type
        const rating = args.filter.rating
        const price = args.filter.price

        const pipeline = [
          {
            $match: {
              $and: [
                { status: "Publish" },
                { name: { $regex: search, $options: "i" } },
              ]
            }
          },
        ]
        // category filter
        if (category) pipeline[0].$match.$and.push({ categoryId: { $in: [`${category}`] } })
        // brand filter
        if (brand) pipeline[0].$match.$and.push({ brand: new mongoose.Types.ObjectId(brand) })
        // product type filter
        if (product_type === "virtual") pipeline[0].$match.$and.push({ 'product_type.virtual': true })
        else if (product_type === "downloadable") pipeline[0].$match.$and.push({ 'product_type.downloadable': true })
        // price filter
        if (price) {
          if (price.min && price.max) {
            pipeline[0].$match.$and.push({ 'pricing.price': { $gte: price.min, $lte: price.max } })
          }
        }
        // most reviewed products filter
        // if(most_reviewed) pipeline[0].$match.$and.push({})
        // rating filter
        if (rating) {
          if (rating.min && rating.max) {
            pipeline[0].$match.$and.push({ rating: { $gte: rating.min, $lte: rating.max } })
          }
        }
        // retrieve filtered products
        let products = await Product.aggregate(pipeline)
        return products || [];

      } catch (error) {
        error = checkError(error);
        throw new Error(error.custom_message);
      }
    },
    relatedProducts: async (root, args) => {
      try {
        let categories = []
        for (let cat of (args.category || [])) {
          let existingCategory = await ProductCat.findById(cat)
          if (existingCategory && existingCategory.parentId) cat = existingCategory.parentId.toString()
          categories.push(cat)
        }
        categories = [...new Set(categories)]
        const pipeline = [
          {
            $match: {
              $and: [
                { status: "Publish" },
                { categoryId: { $in: categories } },
                { _id: { $ne: mongoose.Types.ObjectId(args.productID) } }
              ]
            }
          },
          { $limit: 4 }
        ]
        // retrieve related products
        let products = await Product.aggregate(pipeline)
        return products || [];

      } catch (error) {
        error = checkError(error);
        throw new Error(error.custom_message);
      }
    },
    product: async (root, args) => {
      if (!args.id) {
        return {
          message: MESSAGE_RESPONSE("ID_ERROR", "Product", false),
        };
      }
      const pipeline = [
        // match on the basis of id
        {
          $match: {
            _id: toObjectID(args.id),
          },
        },
        // fetch rating count
        {
          $lookup: {
            from: "reviews",
            localField: "_id",
            foreignField: "productId",
            as: "reviewDetails"
          }
        },
        // populate attributes and varaitions
        {
          $lookup: {
            from: "productgroups",
            let: { productId: "$_id" },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $in: ["$$productId", "$productIds"],
                  },
                },
              },
              {
                $unwind: "$attributes",
              },
              {
                $lookup: {
                  from: "productattributes",
                  localField: "attributes._id",
                  foreignField: "_id",
                  as: "attributeDetails",
                },
              },
              {
                $unwind: "$attributeDetails",
              },
              
              {
                $addFields: {
                  "attributes.name":
                    "$attributeDetails.name",
                  "attributes.values": {
                    $filter: {
                      input: "$attributeDetails.values",
                      as: "value",
                      cond: {
                        $in: [
                          "$$value._id",
                          "$attributes.values",
                        ],
                      },
                    },
                  },
                },
              },
              {
                $group: {
                  _id: "$_id",
                  attributes: { $push: "$attributes" },
                  variations: { $first: "$variations" },
                },
              },
              {
                $project: {
                  _id: 0,
                  attributes: {
                    _id: 1,
                    name: 1,
                    values: {
                      _id: 1,
                      name: 1,
                    },
                  },
                  variations: 1,
                },
              },
            ],
            as: "group",
          },
        },
        {
          $addFields: {
            group: {
              $arrayElemAt: ["$group", 0]
            }
          }
        },
      ]
      let existingProducts = await Product.aggregate(pipeline);
      const response = existingProducts[0]
      if (!response) {
        return {
          message: MESSAGE_RESPONSE("RETRIEVE_ERROR", "Product", false),
          data: response,
        };
      }

      response["taxStatement"] = "Inclusive of all Taxes" 
      
      if(response.group) {
        const { attributes, variations } = response.group
        variations.map(variant => {
          variant.combinations.map(combo => {
            let foundAttribute = attributes.find(attr => attr._id.toString() === combo.attributeId.toString())
            if(foundAttribute) {
              combo["attributeName"] = foundAttribute.name
              let foundAttributeValue = foundAttribute.values.find(value => value._id.toString() === combo.attributeValueId.toString())
              if(foundAttributeValue) {
                combo["attributeValueName"] = foundAttributeValue.name
              }
            }
          })
        })
        response["attributes"] = attributes
        response["variations"] = variations
      }

      if(response.reviewDetails) {
        let reviewDetails = response.reviewDetails.filter(review => review.status === "approved")
        const fetchRatings = (min, max) => {
          return reviewDetails.filter(review => review.rating >= min && review.rating < max).length
        }

        response["ratingCount"] = reviewDetails.length
        response["levelWiseRating"] = {
          fiveStar: fetchRatings(5, 6),
          fourStar: fetchRatings(4, 5),
          threeStar: fetchRatings(3, 4),
          twoStar: fetchRatings(2, 3),
          oneStar: fetchRatings(1, 2),
        }
      }

      if(response.categoryTree && response.categoryTree.length) {
        response["breadcrumb"] = getBreadcrumb(response.categoryTree)
      }

      return {
        message: MESSAGE_RESPONSE("SINGLE_RESULT_FOUND", "Product", true),
        data: response,
      };
    },
    parentCategories: async (root, args) => {
      try{
        const cats = await ProductCat.find({parentId: null});
        return {
          message: MESSAGE_RESPONSE("RESULT_FOUND", "Parent Categories", true),
          data: cats,
        };
      } catch (error) {
        error = checkError(error);
        throw new Error(error.custom_message);
      }
    },
    additionalDetails: async (root, args) => {
      const { productId } = args
      const additionalDetails = []
      const existingProduct = await Product.findById(productId).select("categoryId")

      const matchStage = {
        $match: {
          _id: {
            $ne: toObjectID(existingProduct._id),
          },
          categoryId: {
            $in: existingProduct.categoryId,
          },
        },
      }
      const sortStage = {
        $sort: {
          updated: -1
        }
      }
      const relatedProducts = await Product.aggregate([
        matchStage,
        sortStage
      ])

      additionalDetails.push({
        title: "Related Products",
        products: relatedProducts
      })
      additionalDetails.push({
        title: "Similar Products",
        products: relatedProducts
      })

      return additionalDetails
    },
    parentCategories: async (root, args) => {
      try{
        const cats = await ProductCat.find({parentId: null});
        return {
          message: MESSAGE_RESPONSE("RESULT_FOUND", "Parent Categories", true),
          data: cats,
        };
      } catch (error) {
        error = checkError(error);
        throw new Error(error.custom_message);
      }
    },
  },
  Product: {
    categoryId: async (root, args) => {
      try {
        //let catIDs = root.categoryId.map(cat => cat.id);
        const cats = await ProductCat.find({ _id: { $in: root.categoryId } });
        return cats;
      } catch (error) {
        error = checkError(error);
        throw new Error(error.custom_message);
      }
    },
    brand: async (root, args) => {
      try {
        if (!root.brand) return ""
        const brand = await Brand.findById(root.brand);
        return brand;
      } catch (error) {
        error = checkError(error);
        throw new Error(error.custom_message);
      }
    }
  },
  //.............
  Category: {
    products: async (root, args) => {
      // return await GET_BY_ROOT_ID(root.id, Product, "Products");
      try {
        const products = await Product.find({
          categoryId: { $in: root.id },
        });
        return products || [];
      } catch (error) {
        error = checkError(error);
        throw new Error(error.custom_message);
      }
    },
    filter_attributes: async (root, args) => {
      try {
        const result = await Product.aggregate([
          {
            $match: {
              "attribute.0": { $exists: true },
              categoryId: { $in: [root.id] },
              status: "Publish",
            },
          },
          { $unwind: "$attribute" },
          {
            $group: {
              _id: {
                attribute_id: "$attribute.attribute_id",
                attribute_value_id: "$attribute.attribute_value_id",
              },
            },
          },
          {
            $lookup: {
              from: "productattributes",
              localField: "_id.attribute_id",
              foreignField: "_id",
              as: "attributeMaster",
            },
          },
          { $unwind: "$attributeMaster" },
        ]);

        return result || [];
      } catch (error) {
        error = checkError(error);
        throw new Error(error.custom_message);
      }
    },
    filter_brands: async (root, args) => {
      try {
        const result = await Product.aggregate([
          {
            $match: {
              categoryId: {
                $in: [root.id],
              },
              status: "Publish",
            },
          },
          {
            $group: {
              _id: {
                brand: { $toObjectId: "$brand" },
              },
            },
          },
          {
            $lookup: {
              from: "brands",
              localField: "_id.brand",
              foreignField: "_id",
              as: "brandMaster",
            },
          },
          { $unwind: "$brandMaster" },
        ]);

        return result || [];
      } catch (error) {
        error = checkError(error);
        throw new Error(error.custom_message);
      }
    },
    child_cat: async (root, args) => {
      try {
        const cats = await ProductCat.find({ parentId: root.id });
        return cats || [];
      } catch (error) {
        error = checkError(error);
        throw new Error(error.custom_message);
      }
    },
  },
  Mutation: {
    addProductCategory: async (root, args, { id }) => {
      await checkAwsFolder('productcategory');
      let path = "assets/images/product/category";
      let data = {
        name: args.name,
        parentId: args.parentId || null,
        url: await validateAndSetUrl(args.url || args.name, ProductCat),
        // url: args.url,
        description: args.description,
        image: args.image,
        meta: args.meta,
      };

      const duplicate = await duplicateData({ name: args.name }, ProductCat)
      if (duplicate) return MESSAGE_RESPONSE("DUPLICATE", "Product Category", false);
      let validation = ["name"];
      return await CREATE_FUNC(
        id,
        "Product Category",
        ProductCat,
        data,
        args,
        path,
        validation
      );
    },
    updateProductCategory: async (root, args, { id }) => {
      await checkAwsFolder('productcategory');
      let path = "assets/images/product/category";
      let data = {
        name: args.name,
        parentId: args.parentId || null,
        url: await validateAndSetUrl(args.url || args.name, ProductCat, args.id),
        description: args.description,
        image: args.image,
        meta: args.meta,
      };

      let validation = ["name"];
      const duplicate = await duplicateData({ name: args.name }, ProductCat, args.id)
      if (duplicate) return MESSAGE_RESPONSE("DUPLICATE", "Product Category", false);
      return await UPDATE_FUNC(
        id,
        args.id,
        ProductCat,
        "Product Category",
        data,
        path,
        args,
        validation
      );
    },
    deleteProductCategory: async (root, args, { id }) => {
      if (!id) {
        return MESSAGE_RESPONSE("TOKEN_REQ", "Product Category", false);
      }
      if (!args.id) {
        return MESSAGE_RESPONSE("ID_ERROR", "Product Category", false);
      }
      try {
        const cat = await ProductCat.deleteOne({_id:args.id});

        if (cat) {
          // if (cat.image) {
          //   imageUnlink(cat.image);
          // }

          if (cat.image) {
            imageUnlink(cat.image);

          }
          let _id = args.id;
          const product = await Product.updateMany(
            {},
            { $pull: { categoryId: { $in: [_id] } } },
            { multi: true }
          );
          return MESSAGE_RESPONSE("DELETE", "Product Category", true);
        }
        return MESSAGE_RESPONSE("NOT_EXIST", "Product Category", false);
      } catch (error) {
        return MESSAGE_RESPONSE("DELETE_ERROR", "Product Category", false);
      }
    },
    validateUrl: async (root, args, { id }) => {
      if (!id) {
        return MESSAGE_RESPONSE("TOKEN_REQ", "Product", false);
      }
      const {url, entryId} = args
      const validUrl = await validateAndSetUrl(url, Product, entryId)

      return {
        url: validUrl,
      };
    },
    addProduct: async (root, args, { id }) => {
      await checkAwsFolder('product');
      if (!id) {
        return MESSAGE_RESPONSE("TOKEN_REQ", "Product", false);
      }
      try {
        var errors = _validate(["name", "description", "short_description", "sku", "quantity"], args);
        if (!isEmpty(errors)) {
          return {
            message: errors,
            success: false,
          };
        }
        // errors = _validatenested("pricing", ["price", "sellprice"], args);
        errors = _validatenested("pricing", ["price"], args);
        if (!isEmpty(errors)) {
          return {
            message: errors,
            success: false,
          };
        }
        errors = _validatenested(
          "shipping",
          ["height", "width", "depth", "weight", "shippingClass"],
          args
        );

        if (!isEmpty(errors)) {
          return {
            message: errors,
            success: false,
          };
        }
        const product = await Product.findOne({ name: args.name });
        if (product) {
          return MESSAGE_RESPONSE("DUPLICATE", "Product Name", false);
        } else {
          let imgObject = "";
          if (args.feature_image) {
            // console.log('fimage',args.feature_image);
            imgObject = await imageUpload(
              args.feature_image[0].file,
              "assets/images/product/feature/", "productfeature"
            );

            if (imgObject.success === false) {
              throw putError(imgObject.message);
            }
          }

          //  console.log(args.gallery_image);

          let imgArray = [];
          if (args.gallery_image) {
            let galleryObject = "";
            for (let i in args.gallery_image) {
              console.log( args.gallery_image[i].file,' args.gallery_image[i].file')
              galleryObject = await imageUpload(
                args.gallery_image[i].file,
                "assets/images/product/gallery/", "productgallery"
              );
              if (galleryObject.success) {
                imgArray.push(galleryObject.data);
              }
            }
          }
          let url = await validateAndSetUrl(args.url || args.name, Product);
          const duplicate = await duplicateData({ name: args.name }, Product)
          if (duplicate) return MESSAGE_RESPONSE("DUPLICATE", "Product Name", false);
          const newProduct = new Product({
            name: args.name,
            url: url,
            categoryId: args.categoryId,
            categoryTree: args.categoryTree,
            brand: args.brand,
            short_description: args.short_description,
            description: args.description,
            sku: args.sku,
            quantity: args.quantity,
            pricing: {
              price: args.pricing.price || 0,
              sellprice: args.pricing.sellprice || 0,
              discountPercentage: args.pricing.discountPercentage || 0,
            },
            feature_image: imgObject.data || imgObject,
            gallery_image: imgArray,
            status: args.status,
            meta: args.meta,
            shipping: {
              height: args.shipping.height || 0,
              width: args.shipping.width || 0,
              depth: args.shipping.depth || 0,
              weight: args.shipping.weight || 0,
              shippingClass: args.shipping.shippingClass || null,
            },
            taxClass: args.taxClass || null,
            featured_product: args.featured_product,
            product_type: args.product_type,
            custom_field: args.custom_field,
            specifications: args.specifications
          });
          await newProduct.save();

          await addCategoryAttributes(newProduct.categoryTree, newProduct.specifications, ProductCat)

          return MESSAGE_RESPONSE("AddSuccess", "Product", true);
        }
      } catch (error) {
        console.log('catchhhhhhh')
        console.log(error)
        return MESSAGE_RESPONSE("CREATE_ERROR", "Product", false);
      }
    },
    updateProduct: async (root, args, { id }) => {
      // console.log("updateProduct")
      await checkAwsFolder('product');
      if (!id) {
        return MESSAGE_RESPONSE("TOKEN_REQ", "Product", false);
      }
      try {
        var errors = _validate(["name", "description", "short_description", "sku", "quantity"], args);
        if (!isEmpty(errors)) {
          return {
            message: errors,
            success: false,
          };
        }
        // errors = _validatenested("pricing", ["price", "sellprice"], args);
        errors = _validatenested("pricing", ["price"], args);
        if (!isEmpty(errors)) {
          return {
            message: errors,
            success: false,
          };
        }
        errors = _validatenested(
          "shipping",
          ["shippingClass"],
          args
        );

        if (!isEmpty(errors)) {
          return {
            message: errors,
            success: false,
          };
        }
        if (!args.id) {
          return MESSAGE_RESPONSE("ID_ERROR", "Product", false);
        }

        const duplicate = await duplicateData({ name: args.name }, Product, args.id)
        if (duplicate) return MESSAGE_RESPONSE("DUPLICATE", "Product Name", false);

        const product = await Product.findById({ _id: args.id });
        if (product) {
          let isSku = false;
          /* const matchedProduct = await Product.findOne({ sku: args.sku });
          if(matchedProduct && matchedProduct._id != args.id){
            isSku = true;
          } */
          console.log("updateImage",product.update_feature_image)
          let imgObject = "";
          if (args.update_feature_image) {
            imgObject = await imageUpload(
              args.update_feature_image[0].file,
              "assets/images/product/feature/", "productfeature"
            );

            if (imgObject.success === false) {
              throw putError(imgObject.message);
            }

            if (product.feature_image && imgObject.success === true) {
              imageUnlink(product.feature_image);
            }

            product.feature_image = imgObject.data;
          }

          let imgArray = [];
          let gallery_images = [...product.gallery_image];
          if (args.update_gallery_image) {
            let galleryObject = "";
            for (let i in args.update_gallery_image) {
              galleryObject = await imageUpload(
                args.update_gallery_image[i].file,
                "assets/images/product/gallery/", "productgallery"
              );

              if (galleryObject.success) {
                gallery_images.push(galleryObject.data);
              }
            }
          }

          if (args.removed_image.length) {
            gallery_images = gallery_images.filter((gImage => {
              if (args.removed_image.includes(gImage)) {
                imageUnlink(gImage);
              } else {
                return gImage
              }
            }))
            // for (let i in gallery_images) {
            //   console.log("run for")
            //   console.log(gallery_images[i], args.removed_image)
            //   if(args.removed_image.includes(gallery_images[i])){
            //     console.log("match")
            //     let imgObject = gallery_images[i]
            //     imageUnlink(imgObject);
            //     gallery_images.splice(i, 1)
            //   }
            // if(gallery_images[i] && ~args.removed_image.indexOf(String(gallery_images[i])))
            // if (gallery_images[i] === args.removed_image.gallery_images[i]){
            //   let imgObject = gallery_images[i]
            //   imageUnlink(imgObject);
            //   gallery_images.splice(i, 1)
            //   // delete gallery_images[i];
            // }
            // }
          }

          product.name = args.name;
          product.categoryId = args.categoryId;
          product.categoryTree = args.categoryTree;
          product.brand = args.brand || null,
          product.url = await validateAndSetUrl(args.url || args.name, Product, args.id);
          product.short_description = args.short_description;
          product.description = args.description;
          product.sku = args.sku;
          product.quantity = args.quantity;
          product.pricing = args.pricing;
          product.gallery_image = gallery_images;
          product.meta = args.meta;
          product.shipping = args.shipping;
          product.taxClass = args.taxClass;
          product.featured_product = args.featured_product;
          product.product_type = args.product_type;
          product.custom_field = args.custom_field;
          product.status = args.status;
          product.specifications = args.specifications;  
          product.updated = Date.now();
          await product.save();

          await addCategoryAttributes(product.categoryTree, product.specifications, ProductCat)

          return MESSAGE_RESPONSE("UpdateSuccess", "Product", true);
        } else {
          return MESSAGE_RESPONSE("NOT_EXIST", "Product", false);
        }
      } catch (error) {
        console.log('update---', error)
        return MESSAGE_RESPONSE("UPDATE_ERROR", "Product", false);
      }
    },
    deleteProduct: async (root, args, { id }) => {
      if (!id) {
        return MESSAGE_RESPONSE("TOKEN_REQ", "Product", false);
      }
      if (!args.id) {
        return MESSAGE_RESPONSE("ID_ERROR", "Product", false);
      }
      try {
        const existingGroup = await ProductGroup.findOne({productIds: toObjectID(args.id)}).select("title")
        if(existingGroup) {
          return {
            message: `Couldn't remove product as being used in ${existingGroup.title}`,
            success: false,
          };
        }

        const product =  await Product.deleteOne({ _id: args.id });
        if (product) {
          if (product.feature_image) {
            imageUnlink(product.feature_image);
          }

          if (product.gallery_image) {
            for (let i in product.gallery_image) {
              imageUnlink(product.gallery_image[i]);
            }
          }

          await Review.deleteMany({
            productId: args.id
          })

          return MESSAGE_RESPONSE("DELETE", "Product", true);
        }
        return MESSAGE_RESPONSE("NOT_EXIST", "Product", false);
      } catch (error) {
        console.log("DELETE_PRODUCT", error);
        return MESSAGE_RESPONSE("DELETE_ERROR", "Product", false);
      }
    },
  },
};
