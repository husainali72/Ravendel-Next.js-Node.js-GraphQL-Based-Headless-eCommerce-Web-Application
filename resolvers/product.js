const ProductCat = require("../models/ProductCat");
const CatTree = require("../models/CatTree");
const Product = require("../models/Product");
const { isEmpty, putError, checkError } = require("../config/helpers");
const validate = require("../validations/product");

var categories = [];
const getCategories = async id => {
  const cats = await ProductCat.find({ parentId: id });

  for (let i in cats) {
    cats[i].child = await getCategories(cats[i].id);

    categories.push(cats[i]);
  }
  return cats;
};

module.exports = {
  Query: {
    productCategories: async (root, args) => {
      try {
        categories = [];
        await getCategories(null);
        return categories;

        // var descendants = [];
        // var stack = [];
        // var item = ProductCat.findOne({ _id: "5de0e1d9f6b51a148cf3b53d" });
        // stack.push(item);
        // while (stack.length > 0) {
        //   var currentnode = stack.pop();
        //   var children = ProductCat.find({ parent: currentnode._id });
        //   children.hasNext = function hasNext() {
        //     const r = this.next();
        //     this.current = r.value;
        //     return !r.done;
        //   };
        //   while (true === children.hasNext()) {
        //     var child = children.next();
        //     descendants.push(child._id);
        //     stack.push(child);
        //   }
        // }

        // descendants.join(",");
        // console.log(descendants);
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
        return await CatTree.find({});
      } catch (error) {}
    },
    products: async (root, args) => {
      try {
        return await Product.find({});
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

          return await newCat.save();
        }
      } catch (error) {
        //console.log("here comes", error);
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
      const cat = await ProductCat.findByIdAndRemove(args.id);
      if (cat) {
        return true;
      }
      return false;
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

          const newProduct = new Product({
            name: args.name,
            categoryId: args.categoryId,
            sku: args.sku,
            description: args.description,
            quantity: args.quantity,
            pricing: args.pricing
          });
          return await newProduct.save();
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
        const cat = await Product.findByIdAndRemove(args.id);
        if (cat) {
          return true;
        }
        return false;
      } catch (error) {
        error = checkError(error);
        throw new Error(error.custom_message);
      }
    }
  }
};
