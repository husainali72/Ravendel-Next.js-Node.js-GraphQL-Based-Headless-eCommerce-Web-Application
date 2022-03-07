const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");
// Create Schema
const CustomerSchema = new Schema({
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  company: {
    type: String,
  },
  phone: {
    type: String,
  },
  password: {
    type: String,
    required: true,
  },
  address_book: [
    {
      first_name: {
        type: String,
      },
      last_name: {
        type: String,
      },
      company: {
        type: String,
      },
      phone: {
        type: String,
      },
      address_line1: {
        type: String,
      },
      address_line2: {
        type: String,
      },
      city: {
        type: String,
      },
      country: {
        type: String,
      },
      state: {
        type: String,
      },
      pincode: {
        type: String,
      },
      default_address: {
        type: Boolean,
      },
    },
  ],
  cart: {
    items: [
      {
        product_id: {
          type: Schema.ObjectId,
          required: true,
        },
        qty: {
          type: Number,
          required: true,
        },
        combination: [],
        date: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  date: {
    type: Date,
    default: Date.now,
  },
  updated: {
    type: Date,
  },
});

/**
 * Check if email is taken
 * @param {string} email - The user's email
 * @param {ObjectId} [excludeUserId] - The id of the user to be excluded
 * @returns {Promise<boolean>}
 */
CustomerSchema.statics.isEmailTaken = async function (email, excludeUserId) {
  const user = await this.findOne({ email, _id: { $ne: excludeUserId } });
  return !!user;
};

/**
 * Check if password matches the user's password
 * @param {string} password
 * @returns {Promise<boolean>}
 */
CustomerSchema.methods.isPasswordMatch = async function (password) {
  const user = this;
  return bcrypt.compare(password, user.password);
};

CustomerSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

module.exports = mongoose.model("Customer", CustomerSchema);
