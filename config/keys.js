var URI = ''; // staging
var accessKeyId = "";
var secretAccessKey = "";
var bucketName = "revendal-image";
var bucketBaseURL= `https://${bucketName}.s3.amazonaws.com/`;

if (process.env.NODE_ENV === "production") {
  URI = "";
  accessKeyId = "";
  secretAccessKey = "";
  bucketName = "revendal-image-prod";
  bucketBaseURL= `https://${bucketName}.s3.amazonaws.com/`;
}


module.exports = {
  mongoURI: URI,
  jwtSecret: "",
  JWT_ACCESS_EXPIRATION_MINUTES: 30,
  JWT_REFRESH_EXPIRATION_DAYS: 30,
  resetPasswordExpirationMinutes: 10,
  accessKeyId : accessKeyId,
  secretAccessKey : secretAccessKey,
  bucketName : bucketName,
  bucketBaseURL : bucketBaseURL
};
