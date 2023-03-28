const Zipcode = require("../models/Zipcode");
const Product = require("../models/Product");
const {
  isEmpty,
  MESSAGE_RESPONSE,
  _validate,
  checkToken,
  duplicateData,
} = require("../config/helpers");
const { GET_SINGLE_FUNC } = require("../config/api_functions");

module.exports = {
  Query: {
    checkZipcode: async (root, args) => {
      try {
        const errors = _validate(["zipcode"], args);
        if (!isEmpty(errors)) {
          return {
            message: errors,
            success: false,
          };
        }

        const zipcode = await Zipcode.findOne({zipcode: args.zipcode})
        if(zipcode){
          return {
            message: "Hooray, This product is deliverable at your zipcode",
            success: true
          }
        } else {
          return {
            message: "Sorry, This product is not deliverable at your zipcode.\nTry some other zipcode",
            success: false
          }
        }
      } catch (error) {
        return MESSAGE_RESPONSE("RETRIEVE_ERROR", "Zipcode", false)
      }
    },
    zipcode: async (root, args) => {
      try {
        return await GET_SINGLE_FUNC(args.id, Zipcode, "Zipcode");
      } catch (error) {
        return MESSAGE_RESPONSE("RETRIEVE_ERROR", "Zipcode", false)
      }
    }
  },
  Mutation: {
    addZipcode: async (root, args, { id }) => {
      try{
        checkToken(id)
        const errors = _validate(["zipcode"], args);
        if (!isEmpty(errors)) {
          return {
            message: errors,
            success: false,
          };
        }
        
        const duplicate = await duplicateData({zipcode: {$regex: `${args.zipcode}`, $options: "i"}}, Zipcode)
        if(duplicate) return MESSAGE_RESPONSE("DUPLICATE", "Zipcode", false);
        
        const newZipcode = new Zipcode({zipcode: args.zipcode})
        await newZipcode.save()
        return MESSAGE_RESPONSE("AddSuccess", "Zipcode", true);
      } catch(error) {
        return MESSAGE_RESPONSE("ADD_ERROR", "Zipcode", false)
      }
    },
    updateZipcode: async (root, args, { id }) => {
      try{
        checkToken(id)
        if (!args.id) {
          return MESSAGE_RESPONSE("ID_ERROR", "Zipcode", false);
        }
        const errors = _validate(["zipcode"], args);
        if (!isEmpty(errors)) {
          return {
            message: errors,
            success: false,
          };
        }

        const duplicate = await duplicateData({zipcode: {$regex: `${args.zipcode}`, $options: "i"}}, Zipcode, args.id)
        if(duplicate) return MESSAGE_RESPONSE("DUPLICATE", "Zipcode", false);

        const zipcode = await Zipcode.findById(args.id)
        if(zipcode){
          zipcode.zipcode = args.zipcode
          await zipcode.save()
        } else {
          return MESSAGE_RESPONSE("NOT_EXIST", "Zipcode", false);
        }
        return MESSAGE_RESPONSE("UpdateSuccess", "Zipcode", true);
      } catch(error) {
        return MESSAGE_RESPONSE("UPDATE_ERROR", "Zipcode", false)
      }
    },
    deleteZipcode: async (root, args, { id }) => {
      try{
        checkToken(id)
        if (!args.id) {
          return MESSAGE_RESPONSE("ID_ERROR", "Zipcode", false);
        }

        const zipcode = await Zipcode.findByIdAndRemove(args.id)
        if(zipcode) {
          return MESSAGE_RESPONSE("DELETE", "Zipcode", true);
        } else {
          return MESSAGE_RESPONSE("NOT_EXIST", "Zipcode", false);
        }
      } catch(error) {
        return MESSAGE_RESPONSE("DELETE_ERROR", "Zipcode", false)
      }
    }

  }
}