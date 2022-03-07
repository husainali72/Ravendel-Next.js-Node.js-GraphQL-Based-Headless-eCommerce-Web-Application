/*if (process.env.NODE_ENV === "production") {
  module.exports = {
    mongoURI: process.env.MONGO_URI,
    jwtSecret: process.env.SECRET_APP_KEY
  };
} else {*/
/* module.exports = {
  //mongoURI: "mongodb+srv://ravendel-local:ravendelpassword@ravendel-local.gcmvx.gcp.mongodb.net/ravendel-local?retryWrites=true&w=majority",
  mongoURI: "mongodb+srv://userMernEcommerce:passwordMernEcommerce@cluster0-nxt3c.mongodb.net/test?retryWrites=true&w=majority",
  jwtSecret: "Theziner"
}; */
/*}*/

if (process.env.NODE_ENV === "production") {
  module.exports = {
    mongoURI:
      "mongodb+srv://userMernEcommerce:passwordMernEcommerce@cluster0-nxt3c.mongodb.net/test?retryWrites=true&w=majority",
    jwtSecret: "Theziner",
    JWT_ACCESS_EXPIRATION_MINUTES: 30,
    JWT_REFRESH_EXPIRATION_DAYS: 30,
    resetPasswordExpirationMinutes: 10,
  };
} else {
  module.exports = {
    mongoURI:
      "mongodb+srv://ravendel-local:ravendelpassword@ravendel-local.gcmvx.gcp.mongodb.net/ravendel-local?retryWrites=true&w=majority",
    jwtSecret: "Theziner",
    JWT_ACCESS_EXPIRATION_MINUTES: 30,
    JWT_REFRESH_EXPIRATION_DAYS: 30,
    resetPasswordExpirationMinutes: 10,
  };
}
