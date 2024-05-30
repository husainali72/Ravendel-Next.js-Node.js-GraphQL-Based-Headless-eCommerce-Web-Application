const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EmailTemplateSchema = new Schema(
  {
    template_name: {
      type: String,
      unique: true,
      required: true,
    },
    subject: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    looping_text: {
      type: String,
    },
    social_html: {
      type: String,
    },
    placeholders: [
      {
        name: String,
        value: String,
        html: String,
        type: {
          type: String,
          enum: ["MONEY", "DATE", "FIRST_CAP", "STRING", "CONDITIONAL", "IMAGE"],
          default: "STRING",
        },
        description: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

let EmailTemplate = (module.exports = mongoose.model(
  "EmailTemplate",
  EmailTemplateSchema
));
