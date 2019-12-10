const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const cors = require("cors");
const connectDB = require("./config/db");
const typeDefs = require("./gqschema");
//const typeDefs = require("./typedefs");
const resolvers = require("./resolvers");
const context = require("./context");

//connect db
connectDB();

//middleware
const app = express();
app.use(cors());

const server = new ApolloServer({ typeDefs, resolvers, context });
server.applyMiddleware({ app });

// Init Middleware
app.use(express.json({ extended: false }));

//routes
app.use("/api/users", require("./routes/api/users"));

// Server static assets if in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
} else {
  app.get("/", (req, res) => res.send("api is running"));
}

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`server started on port ${PORT}`));
