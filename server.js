const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const cors = require("cors");
const connectDB = require("./config/db");
const typeDefs = require("./gqschema");
//const typeDefs = require("./typedefs");
const resolvers = require("./resolvers");
const context = require("./context");
const path = require("path");
const bodyParser = require("body-parser");
const vhost = require("vhost");

//connect db
connectDB();

//models
const Tax = require("./models/Tax");
Tax.createTax();

/*const Shipping = require("./models/Shipping");
Shipping.createShipping();*/

//middleware
const app = express();
app.use(cors());
app.use(bodyParser.json());

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context,
  uploads: {
    // Limits here should be stricter than config for surrounding
    // infrastructure such as Nginx so errors can be handled elegantly by
    // graphql-upload:
    // https://github.com/jaydenseric/graphql-upload#type-uploadoptions
    maxFileSize: 5000000, // 5 MB
    maxFiles: 20
  }
});
server.applyMiddleware({ app, path: "/graphql" });

// Init Middleware
app.use(express.json({ extended: false }));

//routes
app.use("/api/users", require("./routes/api/users"));
app.use("/api/files", require("./routes/api/files"));

//app.use(express.static("public"));
app.use("/assets", express.static(__dirname + "/assets"));

const appFront = express();

// Server static assets if in production
//if (process.env.NODE_ENV === "production") {
  // Set static folder
  appFront.use(express.static("frontend/build"));
  appFront.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
  });
/*} else {
  appFront.get("/", (req, res) => res.send("api is running"));
}*/

const appAdmin = express();

// Server static assets if in production
//if (process.env.NODE_ENV === "production") {
  // Set static folder
  appAdmin.use(express.static("client/build"));
  appAdmin.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
/*} else {
  appAdmin.get("/", (req, res) => res.send("api is running"));
}*/

app.use(vhost('ravendel-frontend.hbwebsol.com', appFront));
app.use(vhost('ravendel-backend.hbwebsol.com', appAdmin));


const PORT = process.env.PORT || 80;
app.listen(PORT, () => console.log(`server started on port ${PORT}`));
