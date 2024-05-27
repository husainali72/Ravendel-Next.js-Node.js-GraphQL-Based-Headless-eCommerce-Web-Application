const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const eventValues = []
const fromValues = []

const AnalyticSchema = new Schema({
  IP: {
    type: String,
    required: true
  },
  customerId: {
    type: Schema.Types.ObjectId,
    ref: "Customer"
  },
  event: {
    type: String,
    enum: eventValues,
    required: true
  },
  from: {
    type: String,
    enum: fromValues
  },
  data: {},
  date: {
    type: Date,
    default: Date.now()
  }
})

module.exports = {
  Analytic: mongoose.model('Analytics', AnalyticSchema),
  eventValues,
  fromValues,
} 