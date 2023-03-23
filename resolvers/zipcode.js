const Zipcode = require("../models/Zipcode");
const Product = require("../models/Product");
const {
  isEmpty,
  MESSAGE_RESPONSE,
  _validate,
  checkToken
} = require("../config/helpers");

module.exports = {
  Query: {
    checkZipcode: async (root, args) => {
      try {
        
      } catch (error) {
        return MESSAGE_RESPONSE("RETRIEVE_ERROR", "Zipcode", false)
      }
    },
    getZipcode: async (root, args) => {
      try {
        
      } catch (error) {
        return MESSAGE_RESPONSE("RETRIEVE_ERROR", "Zipcode", false)
      }
    }
  },
  Mutation: {
    addZipcode: async (root, args, { id }) => {
      try{
        checkToken(id)
      } catch(error) {
        return MESSAGE_RESPONSE("ADD_ERROR", "Zipcode", false)
      }
    },
    updateZipcode: async (root, args, { id }) => {
      try{
        checkToken(id)
      } catch(error) {
        return MESSAGE_RESPONSE("UPDATE_ERROR", "Zipcode", false)
      }
    },
    deleteZipcode: async (root, args, { id }) => {
      try{
        checkToken(id)
      } catch(error) {
        return MESSAGE_RESPONSE("DELETE_ERROR", "Zipcode", false)
      }
    }

  }
}