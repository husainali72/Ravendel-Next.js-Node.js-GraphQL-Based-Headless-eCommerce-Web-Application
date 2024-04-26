const Group = require("../models/ProductGroup");
const Product = require("../models/Product");
const {
  isEmpty,
  MESSAGE_RESPONSE,
  _validate,
} = require("../config/helpers");
const {
  GET_SINGLE_FUNC,
  GET_ALL_FUNC,
} = require("../config/api_functions");

module.exports = {
  Query: {
    groups: async (root, args) => {
      return await GET_ALL_FUNC(Group, "Groups");
    },
    group: async (root, args) => {
      return await GET_SINGLE_FUNC(args.id, Group, "Group");
    },
  },
  Mutation: {
    addGroup: async (root, args, { id }) => {
      if (!id) {
        return MESSAGE_RESPONSE("TOKEN_REQ", "group", false);
      }
      try {
        const {title, attributes, variations} = args 
        if (isEmpty(title) || isEmpty(attributes) || isEmpty(variations)) {
          return {
            message: "Title/Attributes/Variations are required",
            success: false,
          };
        }
        if ( variations.some(variation => isEmpty(variation.productId))) {
          return {
            message: "ProductId is required",
            success: false,
          };
        }

        const existingGroup = await Group.findOne({title}).countDocuments()
        if(existingGroup) {
          return {
            message: `${title} already exists`,
            success: false,
          }; 
        }
        await Group.create(args)

        return MESSAGE_RESPONSE("AddSuccess", "Group", true);
      } catch (error) {
        return MESSAGE_RESPONSE("CREATE_ERROR", "Group", false);
      }
    },
    updateGroup: async (root, args, { id }) => {
      if (!id) {
        return MESSAGE_RESPONSE("TOKEN_REQ", "Group", false);
      }
      if (!args.id) {
        return MESSAGE_RESPONSE("ID_ERROR", "Group", false);
      }
      try {
        const {title, attributes, variations} = args 
        if (isEmpty(title) || isEmpty(attributes) || isEmpty(variations)) {
          return {
            message: "Title/Attributes/Variations are required",
            success: false,
          };
        }
        if ( variations.some(variation => isEmpty(variation.productId))) {
          return {
            message: "ProductId is required",
            success: false,
          };
        }

        const existingGroup = await Group.findOne({_id: {$ne: args.id}, title: title}).countDocuments()
        console.log(existingGroup)
        if(existingGroup) {
          return {
            message: `${title} already exists`,
            success: false,
          }; 
        }

        const updatedGroup = await Group.findByIdAndUpdate(
          args.id,
          {$set: args},
          {new: true}
        )
        if(!updatedGroup) {
          return MESSAGE_RESPONSE("UPDATE_ERROR", "Group", false);
        }

        return MESSAGE_RESPONSE("UpdateSuccess", "Group", true);
        
      } catch (error) {
        console.log(error)
        return MESSAGE_RESPONSE("UPDATE_ERROR", "Group", false);
      }
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
