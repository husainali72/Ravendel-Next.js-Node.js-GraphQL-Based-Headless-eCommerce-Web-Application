//Prodution "mongodb+srv://userMernEcommerce:passwordMernEcommerce@cluster0-nxt3c.mongodb.net/test?retryWrites=true&w=majority",
//Staging "mongodb+srv://userMernEcommerce:passwordMernEcommerce@cluster0-nxt3c.mongodb.net/test?retryWrites=true&w=majority"

var URI = 'mongodb+srv://rv-staging:4xPAesU6bu1fELfE@ravendel-staging.2hfno.mongodb.net/rv-staging-database?retryWrites=true&w=majority'; // staging

if (process.env.NODE_ENV === "production") {
  URI = "mongodb+srv://rv-live:4xPAesU6bu1fELfE@ravendel-live.apytt.mongodb.net/rv-live-database?retryWrites=true&w=majority"
}


module.exports = {
  mongoURI: URI,
  jwtSecret: "Theziner",
  JWT_ACCESS_EXPIRATION_MINUTES: 30,
  JWT_REFRESH_EXPIRATION_DAYS: 30,
  resetPasswordExpirationMinutes: 10,
};