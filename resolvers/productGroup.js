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

const addOrUpdateProductGroup = async (args, token, isAdd = false) => {
  if (!token) {
    return MESSAGE_RESPONSE("TOKEN_REQ", "Group", false);
  }

  try {
    const {title, attributes, variations, productIds} = args 
    if (isEmpty(title) || isEmpty(attributes) || isEmpty(variations)) {
      return {
        message: "Title/Attributes/Variations are required",
        success: false,
      };
    }

    let existingGroup = {}
    if(isAdd) {
      existingGroup = await Group.findOne({title}).countDocuments()
    } else {
      if (!args.id) {
        return MESSAGE_RESPONSE("ID_ERROR", "Group", false);
      }

      existingGroup = await Group.findOne({_id: {$ne: args.id}, title}).countDocuments()
    }
    if(existingGroup) {
      return {
        message: `${title} already exists`,
        success: false,
      }; 
    }

    if (variations.every(variation => isEmpty(variation.productId))) {
      return {
        message: "At least one product is required.",
        success: false,
      };
    }
    
    const existingSimilarGroupQuery = {
      title: {$ne: title},
      productIds: {$in: toObjectID(productIds)}
    }
    if(!isAdd) {
      existingSimilarGroupQuery["_id"] = {$ne: args.id}
    }
    const existingSimilarGroup = await Group.findOne(existingSimilarGroupQuery).populate("productIds")
    if(existingSimilarGroup) {
      const productNames = existingSimilarGroup.productIds.map(prod => {
        if(productIds.includes(prod._id.toString())){
          return prod.name
        } 
      })

      return {
        message: `${productNames.join(", ")} are already assigned to a group.`,
        success: false,
      }
    }

    if(isAdd) {
      await Group.create(args)
      return MESSAGE_RESPONSE("AddSuccess", "Group", true);
    } else {
      await Group.findByIdAndUpdate(
        args.id,
        {$set: args},
        {new: true}
      )
      return MESSAGE_RESPONSE("UpdateSuccess", "Group", true);
    }
  } catch (error) {
    return MESSAGE_RESPONSE("CREATE_ERROR", "Group", false);
  }
}

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
