const dotenv = require('dotenv');
dotenv.config({path:'./.env'});
const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const cors = require("cors");
const connectDB = require("./config/db");
const typeDefs = require("./gqschema");
const resolvers = require("./resolvers");
const context = require("./context");
const path = require("path");
const bodyParser = require("body-parser");
const { graphqlUploadExpress } = require("graphql-upload");
const { updateAdminProductLowStock, updateCustomerCheckoutCart } = require('./config/crons')

connectDB();

const Tax = require("./models/Tax");
Tax.createTax();

const Shipping = require("./models/Shipping");
Shipping.createShipping();

const Settings = require("./models/Setting");
Settings.createSettings();

var port = process.env.PORT || 8000;

//middleware
const app = express();
app.use(cors());
app.use(bodyParser.json());
updateAdminProductLowStock(app)
updateCustomerCheckoutCart(app)

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context,
  uploads: false,
});

app.use(graphqlUploadExpress({ maxFileSize: 1000000000, maxFiles: 10 }));
server.applyMiddleware({ app, path: "/graphql" });

// Init Middleware
app.use(express.json({ extended: false }));
app.use("/api/users", require("./routes/api/users"));
app.use("/api/files", require("./routes/api/files"));
app.use("/api/misc", require("./routes/api/misc"));
app.use("/api/stripe", require("./routes/api/stripe"));
app.use("/api/paypal", require("./routes/api/paypal"));
// app.use("/api/razorpay", require("./routes/api/razorpay"));
app.use("/api/razorpay", (req, res) => res.send({success: false, data: "Getting error on PM2"}));
app.use("/api/customers", require("./routes/api/customers"));
app.use("/assets", express.static(__dirname + "/assets"));

if (process.env.NODE_ENV === "production") {
  console.log("Production");  
// app.use(express.static(path.join(__dirname, "client", "build")));
  app.use(express.static(path.join(__dirname, "frontend", "out")));
  // app.get("/admin", (req, res) => {
  //   res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  // });

  // app.get("/admin/*", (req, res) => {
  //   res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  // });
  // app.get("/test", (req, res) => res.send(`Test Ravendel`));
  app.get("/", (req, res) => {
    console.log("Path /");
    res.sendFile(path.resolve(__dirname, "frontend", "out", "index.html"));
  });
  app.get("/", (req, res) => res.send(`Ravendel ${port}`));
} else {
  app.get("/", (req, res) => res.send(`Ravendel is running on port: ${port}`));
}

app.listen(port, () =>
  console.log(`server started on port ${port}, ${process.env.NODE_ENV}`)
);

