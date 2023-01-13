//Prodution "mongodb+srv://userMernEcommerce:passwordMernEcommerce@cluster0-nxt3c.mongodb.net/test?retryWrites=true&w=majority",
//Staging "mongodb+srv://userMernEcommerce:passwordMernEcommerce@cluster0-nxt3c.mongodb.net/test?retryWrites=true&w=majority"

//var URI = 'mongodb+srv://rv-staging:4xPAesU6bu1fELfE@ravendel-staging.2hfno.mongodb.net/rv-staging-database?retryWrites=true&w=majority'; // staging
var URI = 'mongodb+srv://ravendel:AEajXoRfrkxMS7H2@ravendel.k8pbl0q.mongodb.net/ravendel-database'; // staging
//var URI = 'mongodb+srv://ravendel:AhytMhScZbNoByBs@ravendel.k8pbl0q.mongodb.net/ravendel-database?retryWrites=true&w=majority'
var accessKeyId = "AKIA5NPJTJ66BD6LZGU2";
var secretAccessKey = "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";
var bucketName = "revendal-image";
var bucketBaseURL= `https://${bucketName}.s3.amazonaws.com/`;

if (process.env.NODE_ENV === "production") {
  URI = "mongodb+srv://rv-live:4xPAesU6bu1fELfE@ravendel-live.apytt.mongodb.net/rv-live-database?retryWrites=true&w=majority";
  accessKeyId = "AKIA5NPJTJ66BD6LZGU2";
  secretAccessKey = "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";
  bucketName = "revendal-image-prod";
  bucketBaseURL= `https://${bucketName}.s3.amazonaws.com/`;
}


module.exports = {
  mongoURI: URI,
  jwtSecret: "Theziner",
  JWT_ACCESS_EXPIRATION_MINUTES: 30,
  JWT_REFRESH_EXPIRATION_DAYS: 30,
  resetPasswordExpirationMinutes: 10,
  accessKeyId : accessKeyId,
  secretAccessKey : secretAccessKey,
  bucketName : bucketName,
  bucketBaseURL : bucketBaseURL,
};
