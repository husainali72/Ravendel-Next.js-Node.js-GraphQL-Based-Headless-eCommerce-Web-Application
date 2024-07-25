const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  role: {
    type: String,
    enum: ["USER", "AUTHOR", "SUBSCRIBER", "MANAGER", "EDITOR"],
    required: true,
    default: "USER"
  },
  // image: {},
  image: String,
  meta: [
    {
      key: {
        type: String,
        required: true
      },
      value: {
        type: String,
        required: true
      }
    }
  ],
  date: {
    type: Date,
    default: Date.now
  },
  device_info: {
    device_id: String,
    device_type: {
      type: String,
      enum: ["ANDROID", "IOS"],
      default: "ANDROID"
    },
    app_version: String
  },
  updated: {
    type: Date
  }
});

const User = (module.exports = mongoose.model("User", UserSchema));

const defaultUsers = [
  {
    _id: "65c4912e58129189c44881c5",
    name: "Manager",
    password: "$2a$10$wRjf7XYZWXalxsKotoPev.cIynav1Y0yNcezKTXM3T0ng5CFadJeS",
    email: "manager@ravendel.com",
    role: "MANAGER",
    image: "",
    meta: [
      {
        key: "User",
        value: "Manager"
      }
    ],
  }
]

module.exports.createDefaultUsers = async () => {
  const existingUsers = await User.findOne({});
  if (existingUsers) {
    return;
  }
  
  const users = await User.insertMany(defaultUsers)
};
