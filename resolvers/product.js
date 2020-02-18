const ProductCat = require("../models/ProductCat");
const CatTree = require("../models/CatTree");
const Product = require("../models/Product");
const {
  isEmpty,
  putError,
  checkError,
  imageUpload,
  imageUnlink
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
        console.log(error);
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
      } catch (error) {
        console.log(error);
      }
    },
    products: async (root, args) => {
      try {
        const products = await Product.find({});
        return products || [];
      } catch (error) {
        throw new Error("Something went wrong.");
      }
    },
    product: async (root, args) => {
      try {
        const product = await Product.findById(args.id);
        if (!product) {
          throw putError("Page not found");
        }
        return product;
      } catch (error) {
        error = checkError(error);
        throw new Error(error.custom_message);
      }
    }
  },
  Mutation: {
    addProductCategory: async (root, args) => {
      try {
        // Check Validation
        const errors = validate("addProductCategory", args);
        if (!isEmpty(errors)) {
          console.log("validation", errors);
          throw putError(errors);
        }

        const cat = await ProductCat.findOne({ name: args.name });
        if (cat) {
          throw putError("Name already exist.");
        } else {
          const newCat = new ProductCat({
            name: args.name,
            parentId: args.parentId || null
          });

          await newCat.save();
          return await ProductCat.find({});
        }
      } catch (error) {
        console.log("here comes", error);
        error = checkError(error);
        throw new Error(error.custom_message);
      }
    },
    updateProductCategory: async (root, args) => {
      try {
        const cat = await ProductCat.findById({ _id: args.id });
        if (cat) {
          cat.name = args.name || cat.name;
          cat.parentId = args.parentId || cat.parentId;
          cat.updated = Date.now();

          return await cat.save();
        } else {
          throw putError("Category not exist");
        }
      } catch (error) {
        error = checkError(error);
        throw new Error(error.custom_message);
      }
    },
    deleteProductCategory: async (root, args) => {
      try {
        const cat = await ProductCat.findByIdAndRemove(args.id);
        if (cat) {
          const cats = await ProductCat.find({});
          return cats || [];
        }
        throw putError("Category not exist");
      } catch (error) {
        error = checkError(error);
        throw new Error(error.custom_message);
      }
    },
    addTree: async (root, args) => {
      try {
        const cat = await CatTree.findOne({ name: args.name });
        if (cat) {
          throw putError("Name already exist.");
        } else {
          const newCat = new CatTree({
            name: args.name
          });

          if (args.parentname) {
            newCat.ancestors.push(args.parentname);
          }

          return await newCat.save();
        }
      } catch (error) {
        //console.log("here comes", error);
        error = checkError(error);
        throw new Error(error.custom_message);
      }
    },
    addProduct: async (root, args) => {
      try {
        const product = await Product.findOne({ name: args.name });
        if (product) {
          throw putError("Name already exist.");
        } else {
          const errors = validate("addProduct", args);
          if (!isEmpty(errors)) {
            throw putError(errors);
          }

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

          const newProduct = new Product({
            name: args.name,
            slug: args.slug,
            categoryId: args.categoryId,
            description: args.description,
            sku: args.sku,
            quantity: args.quantity,
            pricing: args.pricing,
            feature_image: imgObject.data || imgObject,
            gallery_image: imgArray,
            status: args.status
          });

          await newProduct.save();
          const products = await Product.find({});
          return products || [];
        }
      } catch (error) {
        console.log("here comes", error);
        error = checkError(error);
        throw new Error(error.custom_message);
      }
    },
    updateProduct: async (root, args) => {
      try {
        const product = await Product.findById({ _id: args.id });
        if (product) {
          product.name = args.name || product.name;
          product.categoryId = args.categoryId || product.categoryId;
          product.sku = args.sku || product.sku;
          product.description = args.description || product.sku;
          product.quantity = args.quantity || product.quantity;
          product.pricing = args.pricing || product.pricing;
          product.updated = Date.now();

          return await product.save();
        } else {
          throw putError("Product not exist");
        }
      } catch (error) {
        error = checkError(error);
        throw new Error(error.custom_message);
      }
    },
    deleteProduct: async (root, args) => {
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

          const products = await Product.find({});
          return products || [];
        }
        throw putError("Product not exist");
      } catch (error) {
        error = checkError(error);
        throw new Error(error.custom_message);
      }
    }
  }
};
