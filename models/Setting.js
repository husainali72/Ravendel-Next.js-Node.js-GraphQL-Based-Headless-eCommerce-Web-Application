const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const SeetingSchema = new Schema(
  {
    site_name: {
      type: String,
    },
    site_logo: {},
    menu: [
      {
        name: {
          type: String,
        },
        url: {
          type: String,
        },
      },
    ],
    footer_copyright: {
      type: String,
    },
    theme: {
      primary_color: {
        type: String,
      },
    },
    general: {
      date_format: {
        type: String,
      },
      time_zone: {
        type: String,
      },
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Setting", SeetingSchema);
