const Order = require("../models/Order");
const {
  isEmpty,
  putError,
  checkError,
  checkToken
} = require("../config/helpers");
const validate = require("../validations/order");

module.exports = {
  Query: {
    

    orders: async (root, args) => {
      // destrcture search, page, limit, and set default values
      
      try {
      const { search = null, page = 1, limit = 20 } = args;

      let searchQuery = {};

      // run if search is provided
      if (search) {
        // update the search query
        searchQuery = {
          $or: [
            { _id: { $regex: search, $options: 'i' } }
            
            
          ]
        };
      }

      // execute query to search orders
      const orders = await Order.find(searchQuery)


        .limit(limit)
        .skip((page - 1) * limit)
        .lean();

      // get total documents
      const count = await Order.countDocuments(searchQuery);

      return {
        orders,
        totalPages: Math.ceil(count / limit),
        currentPage: page,
        totalCount:count
        }
      } catch (error) {
         throw new Error("Something went wrong.");
       }
    },
    order: async (root, args) => {
      try {
        const order = await Order.findById(args.id);
        if (!order) {
          throw putError("not found");
        }
        return order;
      } catch (error) {
        error = checkError(error);
        throw new Error(error.custom_message);
      }
    },
    orderbyUser: async (root, args) => {
      try {
        const order = await Order.findOne({ user_id: args.user_id });
        if (!order) {
          throw putError("Order not found");
        }
        return order;
      } catch (error) {
        error = checkError(error);
        throw new Error(error.custom_message);
      }
    }
  },
  Mutation: {
    addOrder: async (root, args, { id }) => {
      checkToken(id);
      try {
        const newOrder = new Order({
          user_id: args.user_id,
          billing: args.billing,
          shipping: args.shipping,
          status: args.status
        });

        newOrder.products = [...args.products];

        await newOrder.save();
        return await Order.find({});
      } catch (error) {
        error = checkError(error);
        throw new Error(error.custom_message);
      }
    },
    updateOrder: async (root, args, { id }) => {
      checkToken(id);
      try {
        // Check Validation
        const errors = validate("updateOrder", args);
        if (!isEmpty(errors)) {
          throw putError(errors);
        }

        const order = await Order.findById(args.id);
        if (!order) {
          throw putError("not found");
        }

        order.status = args.status;
        order.billing = args.billing;
        order.shipping = args.shipping;
        await order.save();

        return await Order.find({});
      } catch (error) {
        error = checkError(error);
        throw new Error(error.custom_message);
      }
    },
    deleteOrder: async (root, args, { id }) => {
      checkToken(id);
      try {
        await Order.findByIdAndRemove(args.id);
        return await Order.find({});
      } catch (error) {
        error = checkError(error);
        throw new Error(error.custom_message);
      }
    }
  }
};
