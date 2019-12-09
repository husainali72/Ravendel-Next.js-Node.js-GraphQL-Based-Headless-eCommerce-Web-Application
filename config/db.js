const mongoose = require("mongoose");
const APP_KEYS = require("./keys");
const db = APP_KEYS.mongoURI;

const connecDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true
    });
    console.log("mongoDB connected...");
  } catch (err) {
    console.error(err.message);
    //exit process with failure
    process.exit(1);
  }
};

module.exports = connecDB;
