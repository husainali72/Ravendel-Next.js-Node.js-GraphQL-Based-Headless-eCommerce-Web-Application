const Group = require("../models/ProductGroup");
const Product = require("../models/Product");
const {
  isEmpty,
  MESSAGE_RESPONSE,
  toObjectID,
} = require("../config/helpers");
const {
  GET_SINGLE_FUNC,
  GET_ALL_FUNC,
} = require("../config/api_functions");
const ProductCat = require("../models/ProductCat");
const { isValidObjectId } = require("mongoose");

const addOrUpdateProductGroup = async (args, token, isAdd = false) => {
  if (!token) {
    return MESSAGE_RESPONSE("TOKEN_REQ", "Group", false);
  }
  
  try {
    const { title, attributes, variations, productIds, id } = args;

    // Validate required fields
    const validationResponse = validateGroupInputs(title, attributes, variations, productIds);
    if (!validationResponse.success) {
      return validationResponse;
    }

    // Ensure each variation has a valid productId
    const invalidProductId = variations.find(
      (variation) => !variation.productId || !isValidObjectId(variation.productId)
    );
    if (invalidProductId) {
      return {
        message: "All variations must have a product",
        success: false,
      };
    }

    // Check for duplicate group title
    const isDuplicateTitle = await checkDuplicateTitle(title, id, isAdd);
    if (isDuplicateTitle) {
      return {
        message: `${title} already exists`,
        success: false,
      };
    }

    // Check for existing groups with overlapping products
    const duplicateProductsResponse = await checkDuplicateProductsInGroups(title, productIds, id, isAdd);
    if (!duplicateProductsResponse.success) {
      return duplicateProductsResponse;
    }

    // Add or Update the Group
    if (isAdd) {
      await Group.create(args);
      return MESSAGE_RESPONSE("AddSuccess", "Group", true);
    } else {
      await Group.findByIdAndUpdate(id, { $set: args }, { new: true });
      return MESSAGE_RESPONSE("UpdateSuccess", "Group", true);
    }
  } catch (error) {
    return MESSAGE_RESPONSE("CREATE_ERROR", "Group", false);
  }
};

// Helper function to validate group inputs
const validateGroupInputs = (title, attributes, variations, productIds) => {
  if (isEmpty(title) || isEmpty(attributes) || isEmpty(variations)) {
    return {
      message: "Title, Attributes, and Variations are required",
      success: false,
    };
  }

  if (!Array.isArray(productIds) || productIds.length === 0) {
    return {
      message: "Product IDs array cannot be empty",
      success: false,
    };
  }

  return { success: true };
};

// Utility function to validate ObjectId format

// Helper function to check for duplicate group title
const checkDuplicateTitle = async (title, id, isAdd) => {
  const query = isAdd ? { title } : { _id: { $ne: id }, title };
  const count = await Group.findOne(query).countDocuments();
  return count > 0;
};

// Helper function to check for duplicate products in other groups
const checkDuplicateProductsInGroups = async (title, productIds, id, isAdd) => {
  const existingSimilarGroupQuery = {
    title: { $ne: title },
    productIds: { $in: toObjectID(productIds) },
  };

  if (!isAdd) {
    existingSimilarGroupQuery["_id"] = { $ne: id };
  }

  const existingSimilarGroup = await Group.findOne(existingSimilarGroupQuery).populate("productIds");
  if (existingSimilarGroup) {
    const duplicateProductNames = existingSimilarGroup.productIds
      .filter((prod) => productIds.includes(prod._id.toString()))
      .map((prod) => prod.name);

    return {
      message: `${duplicateProductNames.join(", ")} are already assigned to a group.`,
      success: false,
    };
  }

  return { success: true };
};



module.exports = {
  Query: {
    groups: async (root, args) => {
      return await GET_ALL_FUNC(Group, "Groups", false, "createdAt");
    },
    group: async (root, args) => {
      return await GET_SINGLE_FUNC(args.id, Group, "Group");
    },
    availableProducts: async(root, args) => {
      const { groupId } = args

      const lookupStage = {
        $lookup: {
          from: "productgroups",
          localField: "_id",
          foreignField: "productIds",
          as: "productGroups",
        },
      }
      const matchStage = {
        $match: {
          $or: [
            {
              productGroups: { $size: 0 },
            },
          ],
        },
      }
      if(!isEmpty(groupId)) {
        matchStage["$match"]["$or"].push({
          "productGroups._id": toObjectID(groupId),
        })
      }
      const projectStage = {
        $project: {
          name: 1,
          url: 1
        }
      }
     
      const availableProducts = await Product.aggregate([
        lookupStage,
        matchStage,
        projectStage
      ])

      return availableProducts
    }
  },
  Mutation: {
    addGroup: async (root, args, { id }) => {
      return await addOrUpdateProductGroup(args, id, true)
    },
    updateGroup: async (root, args, { id }) => {
      return await addOrUpdateProductGroup(args, id)
    },
    deleteGroup: async (root, args, { id }) => {
      if (!id) {
        return MESSAGE_RESPONSE("TOKEN_REQ", "Group", false);
      }
      if (!args.id) {
        return MESSAGE_RESPONSE("ID_ERROR", "Group", false);
      }
      try {
        const existingGroup = await Group.findByIdAndDelete(args.id);
        if(!existingGroup) {
          return MESSAGE_RESPONSE("NOT_EXIST", "Group", false);
        }

        return MESSAGE_RESPONSE("DELETE", "Group", true);
      } catch (error) {
        return MESSAGE_RESPONSE("DELETE_ERROR", "Group", false);
      }
    },
  },
};
