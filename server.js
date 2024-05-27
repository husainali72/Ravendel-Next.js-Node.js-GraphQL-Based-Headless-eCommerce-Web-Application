const dotenv = require("dotenv");
dotenv.config({ path: "./.env" });
const express = require("express");
const { ApolloServer } = require("@apollo/server");
const cors = require("cors");
const connectDB = require("./config/db");
const typeDefs = require("./gqschema");
const resolvers = require("./resolvers");
const context = require("./context");
const path = require("path");
const bodyParser = require("body-parser");
const { expressMiddleware } = require("@apollo/server/express4");
const {
  ApolloServerPluginDrainHttpServer,
} = require("@apollo/server/plugin/drainHttpServer");
const http = require("http");
const APP_KEYS = require("./config/keys");
const { graphqlUploadExpress } = require("graphql-upload");
const jwt = require("jsonwebtoken");
const {
  abandonedCartsNotification,
} = require("./config/crons");

connectDB();
async function startServer() {
  const User = require("./models/User");
  const Brand = require("./models/Brand");
  const ProductCat = require("./models/ProductCat");
  const ProductAttribute = require("./models/ProductAttribute");
  const Product = require("./models/Product");
  const Tax = require("./models/Tax");
  const Shipping = require("./models/Shipping");
  const Settings = require("./models/Setting");

  User.createDefaultUsers();
  Brand.createDefaultBrands();
  ProductCat.createDefaultProductCats();
  ProductAttribute.createDefaultProductAttributes();
  Product.createDefaultProducts();
  Tax.createDefaultTaxes();
  Shipping.createDefaultShippings();
  Settings.createDefaultSettings();

  var port = process.env.PORT || 8000;

  //middleware
  const app = express();
  const httpServer = http.createServer(app);
  app.use(cors());
  app.use(bodyParser.json());

  abandonedCartsNotification(app);

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context,
    uploads: false,
    csrfPrevention: true,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });
  await server.start();
  app.use(graphqlUploadExpress({ maxFileSize: 1000000000, maxFiles: 10 }));

  app.use(
    "/graphql",
    cors(),
    express.json({ extended: false }),
    expressMiddleware(server, {
      context
      // ({ req }) => 
      
      // {
      //   const token = req?.headers?.authorization;

      //   //check if not token
      //   if (!token) {
      //     return res
      //       .status(401)
      //       .json({ msg: "no token, authorization denied" });
      //   }
      //   const decode = jwt.verify(token, APP_KEYS.jwtSecret);

      //   return {
      //     ...context,
      //     id: decode || "", // Include the token in the context
      //   };
      // },
    })
  );
  // Init Middleware
  // app.use(express.json({ extended: false }));
  app.use("/apis/users", require("./routes/api/users"));
  app.use("/apis/files", require("./routes/api/files"));
  app.use("/apis/misc", require("./routes/api/misc"));
  app.use("/apis/stripe", require("./routes/api/stripe"));
  app.use("/apis/paypal", require("./routes/api/paypal"));
  // app.use("/api/razorpay", require("./routes/api/razorpay"));
  app.use("/apis/razorpay", (req, res) =>
    res.send({ success: false, data: "Getting error on PM2" })
  );
  app.use("/apis/customers", require("./routes/api/customers"));

  // app.use('/uploads', express.static(__dirname + "/uploads"));
  app.use("/assets", express.static(__dirname + "/assets"));

  if (process.env.NODE_ENV === "production") {
    // app.use(express.static(path.join(__dirname, "frontend", "out")));
    // app.get("/", (req, res) => {
    //   res.sendFile(path.resolve(__dirname, "frontend", "out", "index.html"));
    // });
    // app.get("/*", (req, res) => {
    //   res.sendFile(path.resolve(__dirname, "frontend", "out", "index.html"));
    // });
  } else {
    app.get("/", (req, res) =>
      res.send(`Ravendel is running on port: ${port}`)
    );
  }
  app.listen(port, () =>
    console.log(`server started on port ${port}, ${process.env.NODE_ENV}`)
  );
}
startServer();
