const ProductCat = require("../models/ProductCat");
const CatTree = require("../models/CatTree");
const Product = require("../models/Product");
const Brand = require("../models/Brand");
const ProductAttributeVariation = require("../models/ProductAttributeVariation");
const {
  isEmpty,
  putError,
  checkError,
  imageUpload,
  imageUnlink,
  checkToken,
  stringTourl,
  validateUrl,
  updateUrl,
} = require("../config/helpers");
const validate = require("../validations/product");

/*const Tree = [
  {
    _id: "electronics",
    child: ""
  },
  {
    _id: "cases",
    child: ""
  }
];
var childs;
var count = 0;
var promises = [];
const getTree = async treeReference => {
  for (let i in treeReference) {
    let subcat = await CatTree.find({ parent: treeReference[i]._id }).select(
      "_id"
    );
    if (subcat && subcat.length) {
      treeReference[i].child = subcat;
      childs = subcat;
      getTree(treeReference[i].child);
      if (childs[0]._id == "yellow") {
        console.log("subcat", treeReference[i].child);
        console.log(Tree[1].child[1].child[0]._id);
        return resolve(Tree);
      }
    }
  }
}; */

module.exports = {
  Query: {
    productCategories: async (root, args) => {
      try {
        const cats = await ProductCat.find({});
        return cats || [];
      } catch (error) {
        throw new Error("Something went wrong.");
      }
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
      try {
        const cat = await ProductCat.findById(args.id);
        if (!cat) {
          throw putError("Category not found");
        }
        return cat;
      } catch (error) {
        error = checkError(error);
        throw new Error(error.custom_message);
      }
    },
    getTree: async (root, args) => {
      try {
        const cats = await CatTree.find({});
        //return unflatten(cats);
        return cats;
      } catch (error) {}
    },
    products: async (root, args, { id }) => {
      try {
        const products = await Product.find({});
        return products || [];
      } catch (error) {
        error = checkError(error);
        throw new Error(error.custom_message);
      }
    },
    productswithcat: async (root, args, { id }) => {
      try {
        const products = await Product.find({});
        return products || [];
      } catch (error) {
        error = checkError(error);
        throw new Error(error.custom_message);
      }
    },
    featureproducts: async (root, args, { id }) => {
      try {
        const products = await Product.find({
          featured_product: true,
        });
        return products || [];
      } catch (error) {
        error = checkError(error);
        throw new Error(error.custom_message);
      }
    },
    productsbycatid: async (root, args, { id }) => {
      try {
        const products = await Product.find({
          categoryId: { $in: args.cat_id },
        });
        return products || [];
      } catch (error) {
        error = checkError(error);
        throw new Error(error.custom_message);
      }
    },
    productsbycaturl: async (root, args, { id }) => {
      try {
        const cat = await ProductCat.findOne({ url: args.cat_url });
        if (!cat) {
          throw putError("404 Not found");
        }

        /* const products = await Product.find({
          categoryId: { $in: cat.id },
        });

        cat.products = products || []; */
        return cat;

        //return products || [];
      } catch (error) {
        error = checkError(error);
        throw new Error(error.custom_message);
      }
    },
    product: async (root, args) => {
      try {
        const product = await Product.findById(args.id);
        if (!product) {
          throw putError("Product not found");
        }
        return product;
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
        if (isEmpty(root.brand)) {
          return "";
        }
        const brands = await Brand.findById(root.brand);
        return brands;
      } catch (error) {
        error = checkError(error);
        throw new Error(error.custom_message);
      }
    },
    variation_master: async (root, args) => {
      try {
        const variations = await ProductAttributeVariation.find({
          product_id: root.id,
        });
        //console.log(variations);
        return variations || [];
      } catch (error) {
        error = checkError(error);
        throw new Error(error.custom_message);
      }
    },
  },
  Category: {
    products: async (root, args) => {
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
      checkToken(id);
      try {
        // Check Validation
        const errors = validate("addProductCategory", args);
        if (!isEmpty(errors)) {
          throw putError(errors);
        }

        const cat = await ProductCat.findOne({
          name: args.name,
          parentId: args.parentId,
        });

        if (cat) {
          throw putError("This category is already exist.");
        } else {
          let url = await updateUrl(args.url || args.name, "ProductCat");
          let imgObject = "";
          if (args.image) {
            imgObject = await imageUpload(
              args.image[0],
              "/assets/images/product/category/"
            );

            if (imgObject.success === false) {
              throw putError(imgObject.message);
            }
          }

          const newCat = new ProductCat({
            name: args.name,
            parentId: args.parentId || null,
            url: url,
            description: args.description,
            image: imgObject.data || imgObject,
            meta: args.meta,
          });

          await newCat.save();
          return await ProductCat.find({});
        }
      } catch (error) {
        error = checkError(error);
        throw new Error(error.custom_message);
      }
    },
    updateProductCategory: async (root, args, { id }) => {
      checkToken(id);
      try {
        const cat = await ProductCat.findById({ _id: args.id });
        if (cat) {
          let imgObject = "";
          if (args.update_image) {
            imgObject = await imageUpload(
              args.update_image[0],
              "/assets/images/product/category/"
            );

            if (imgObject.success === false) {
              throw putError(imgObject.message);
            }

            if (cat.image) {
              imageUnlink(cat.image);
            }

            cat.image = imgObject.data;
          }

          var url = await updateUrl(args.url || args.name, "ProductCat");
          cat.name = args.name;
          cat.parentId = args.parentId || null;
          cat.url = url;
          cat.description = args.description;
          cat.meta = args.meta;
          cat.updated = Date.now();

          await cat.save();
          return await ProductCat.find({});
        } else {
          throw putError("Category not exist");
        }
      } catch (error) {
        error = checkError(error);
        throw new Error(error.custom_message);
      }
    },
    deleteProductCategory: async (root, args, { id }) => {
      checkToken(id);
      try {
        const cat = await ProductCat.findByIdAndRemove(args.id);
        if (cat) {
          if (cat.image) {
            imageUnlink(cat.image);
          }
          const cats = await ProductCat.find({});
          return cats || [];
        }
        throw putError("Category not exist");
      } catch (error) {
        error = checkError(error);
        throw new Error(error.custom_message);
      }
    },
    addTree: async (root, args, { id }) => {
      checkToken(id);
      try {
        const cat = await CatTree.findOne({ name: args.name });
        if (cat) {
          throw putError("Name already exist.");
        } else {
          const newCat = new CatTree({
            name: args.name,
          });

          if (args.parentname) {
            newCat.ancestors.push(args.parentname);
          }

          return await newCat.save();
        }
      } catch (error) {
        error = checkError(error);
        throw new Error(error.custom_message);
      }
    },
    addProduct: async (root, args, { id }) => {
      checkToken(id);
      try {
        const errors = validate("addProduct", args);
        if (!isEmpty(errors)) {
          throw putError(errors);
        }

        const product = await Product.findOne({ name: args.name });
        if (product) {
          throw putError("Name already exist.");
        } else {
          let imgObject = "";
          if (args.feature_image) {
            imgObject = await imageUpload(
              args.feature_image[0],
              "/assets/images/product/feature/"
            );

            if (imgObject.success === false) {
              throw putError(imgObject.message);
            }
          }

          let imgArray = [];
          if (args.gallery_image) {
            let galleryObject = "";
            for (let i in args.gallery_image) {
              galleryObject = await imageUpload(
                args.gallery_image[i],
                "/assets/images/product/gallery/"
              );

              if (galleryObject.success) {
                imgArray.push(galleryObject.data);
              }
            }
          }

          let url = await updateUrl(args.url || args.name, "Product");

          const newProduct = new Product({
            name: args.name,
            url: url,
            categoryId: args.categoryId,
            brand: args.brand || "",
            short_description: args.short_description,
            description: args.description,
            sku: args.sku,
            quantity: args.quantity,
            pricing: {
              price: args.pricing.price || 0,
              sellprice: args.pricing.sellprice || 0,
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
              shipping_class: args.shipping.shipping_class,
            },
            tax_class: args.tax_class,
            featured_product: args.featured_product,
            product_type: args.product_type,
            custom_field: args.custom_field,
            attribute: args.attribute,
            variant: args.variant,
          });

          let lastProduct = await newProduct.save();
          let combinations = [];
          if (args.variant.length && args.combinations.length) {
            combinations = args.combinations;
            for (const combination of combinations) {
              combination.product_id = lastProduct.id;

              let imgObject = "";
              if (combination.image.file) {
                imgObject = await imageUpload(
                  combination.image.file[0],
                  "/assets/images/product/variant/"
                );
                combination.image = imgObject.data || imgObject;
              }
            }
          } else {
            combinations = [
              {
                combination: [],
                product_id: lastProduct.id,
                sku: args.sku,
                quantity: args.quantity,
                price: args.pricing.sellprice || args.pricing.price,
                image: {},
              },
            ];
          }

          let result = await ProductAttributeVariation.insertMany(combinations);

          const products = await Product.find({});
          return products || [];
        }
      } catch (error) {
        error = checkError(error);
        throw new Error(error.custom_message);
      }
    },
    updateProduct: async (root, args, { id }) => {
      checkToken(id);
      try {
        const errors = validate("updateProduct", args);
        if (!isEmpty(errors)) {
          throw putError(errors);
        }

        const product = await Product.findById({ _id: args.id });
        if (product) {
          let imgObject = "";
          if (args.update_feature_image) {
            imgObject = await imageUpload(
              args.update_feature_image[0],
              "/assets/images/product/feature/"
            );

            if (imgObject.success === false) {
              throw putError(imgObject.message);
            }

            if (product.feature_image) {
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
                args.update_gallery_image[i],
                "/assets/images/product/gallery/"
              );

              if (galleryObject.success) {
                gallery_images.push(galleryObject.data);
              }
            }
          }

          if (args.removed_image.length) {
            for (let i in gallery_images) {
              if (
                gallery_images[i]._id &&
                ~args.removed_image.indexOf(String(gallery_images[i]._id))
              ) {
                let imgObject = {
                  large: gallery_images[i].large,
                  medium: gallery_images[i].medium,
                  original: gallery_images[i].original,
                  thumbnail: gallery_images[i].thumbnail,
                };
                imageUnlink(imgObject);
                delete gallery_images[i];
              }
            }
          }

          product.name = args.name;
          product.categoryId = args.categoryId;
          (product.brand = args.brand || ""),
            (product.url = await updateUrl(args.url || args.name, "Product"));
          product.short_description = args.short_description;
          product.description = args.description;
          product.sku = args.sku;
          product.quantity = args.quantity;
          product.pricing = args.pricing;
          product.gallery_image = gallery_images;
          product.meta = args.meta;
          product.shipping = args.shipping;
          product.tax_class = args.tax_class;
          product.featured_product = args.featured_product;
          product.product_type = args.product_type;
          product.custom_field = args.custom_field;
          product.status = args.status;
          (product.attribute = args.attribute),
            (product.variant = args.variant),
            (product.updated = Date.now());
          await product.save();

          let combinations = [];
          if (args.variant.length && args.combinations.length) {
            combinations = args.combinations;
            for (const combination of combinations) {
              combination.product_id = args.id;

              let imgObject = "";
              if (combination.image.hasOwnProperty("file")) {
                imgObject = await imageUpload(
                  combination.image.file[0],
                  "/assets/images/product/variant/"
                );
                combination.image = imgObject.data || imgObject;
              }
            }
          } else {
            combinations = [
              {
                combination: [],
                product_id: args.id,
                sku: args.sku,
                quantity: args.quantity,
                price: args.pricing.sellprice || args.pricing.price,
                image: {},
              },
            ];
          }

          await ProductAttributeVariation.deleteMany({
            product_id: args.id,
          });

          let result = await ProductAttributeVariation.insertMany(combinations);

          const products = await Product.find({});
          return products || [];
        } else {
          throw putError("Product not exist");
        }
      } catch (error) {
        error = checkError(error);
        throw new Error(error.custom_message);
      }
    },
    deleteProduct: async (root, args, { id }) => {
      checkToken(id);
      try {
        const product = await Product.findByIdAndRemove(args.id);
        if (product) {
          if (product.feature_image) {
            imageUnlink(product.feature_image);
          }

          if (product.gallery_image) {
            for (let i in product.gallery_image) {
              imageUnlink(product.gallery_image[i]);
            }
          }

          const variations = await ProductAttributeVariation.find({
            product_id: args.id,
          });

          await ProductAttributeVariation.deleteMany({
            product_id: args.id,
          });

          for (const variation of variations) {
            if (variation.image) {
              imageUnlink(variation.image);
            }
          }

          const products = await Product.find({});
          return products || [];
        }
        throw putError("Product not exist");
      } catch (error) {
        error = checkError(error);
        throw new Error(error.custom_message);
      }
    },
  },
};
