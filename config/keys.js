if (process.env.NODE_ENV === "production") {
  module.exports = {
    mongoURI: process.env.MONGO_URI,
    jwtSecret: process.env.SECRET_APP_KEY
  };
} else {
  module.exports = {
    mongoURI:
      "mongodb+srv://userMernEcommerce:passwordMernEcommerce@cluster0-nxt3c.mongodb.net/test?retryWrites=true&w=majority",
    jwtSecret: "Theziner"
  };
}
