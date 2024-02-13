const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");
// Create Schema
const CustomerSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
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
  gender: {
    type: String,
  },
  phone: {
    type: String,
  },
  password: {
    type: String,
    required: true,
  },
  addressBook: [
    {
      firstName: {
        type: String,
      },
      lastName: {
        type: String,
      },
      company: {
        type: String,
      },
      phone: {
        type: String,
      },
      addressLine1: {
        type: String,
      },
      addressLine2: {
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
      defaultAddress: {
        type: Boolean,
      },
    },
  ],
  cart: {
    items: [
      {
        productId: {
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
  const user = await this.findOne({ email, _id: { $ne: new ObjectId(excludeUserId)  } });
  return !!user;
};

/**
 * Check if password matches the user's password
 * @param {string} password
 * @returns {Promise<boolean>}
 */
// CustomerSchema.methods.isPasswordMatch = async function (password) {
//   const user = this;
//   return bcrypt.compare(password, user.password);
// };

// CustomerSchema.pre("save", async function (next) {
//   const user = this;
//   if (user.isModified("password")) {
//     user.password = await bcrypt.hash(user.password, 8);
//   }
//   next();
// });

module.exports = mongoose.model("Customer", CustomerSchema);
