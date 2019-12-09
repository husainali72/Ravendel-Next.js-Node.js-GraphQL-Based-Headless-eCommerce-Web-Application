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
const port = 8000;

const server = new ApolloServer({ typeDefs, resolvers, context });
server.applyMiddleware({ app });

// Init Middleware
app.use(express.json({ extended: false }));

//routes
app.use("/api/users", require("./routes/api/users"));

//running
app.get("/", (req, res) => res.send("Mern E-commerce is running....here "));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
