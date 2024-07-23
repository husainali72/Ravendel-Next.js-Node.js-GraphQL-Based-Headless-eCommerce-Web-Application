
module.exports = {
  BASE_URL: process.env.BASE_URL,
  mongoURI: process.env.MONGODB_URI,
  jwtSecret: process.env.JWT_SECRET_KEY,
  JWT_ACCESS_EXPIRATION_MINUTES: process.env.JWT_ACCESS_EXPIRATION_MINUTES,
  JWT_REFRESH_EXPIRATION_DAYS: process.env.JWT_REFRESH_EXPIRATION_DAYS,
  resetPasswordExpirationMinutes: process.env.RESET_PASSWORD_EXPIRE_MINUTE,
  accessKeyId : process.env.ACCESS_KEY_ID,
  secretAccessKey : process.env.SECRET_ACCESS_KEY,
  bucketName : process.env.BUCKET_NAME,
  bucketBaseURL : process.env.BUCKET_BASE_URL,
  smptUser: process.env.SMTP_USERNAME,
  smptPass: process.env.SMTP_PASSWORD,
  codeString: process.env.SECRET_STRING,
  stripeBaseSuccessUrl: process.env.SUCCESS_URL,
  stripeBaseCancelUrl: process.env.CANCEL_URL,
  frontendBaseUrl: process.env.FRONTEND_BASEURL,
  noImagePlaceHolder: process.env.NO_IMAGE_PLACE_HOLDER,
  appName: process.env.REACT_APP_APP_NAME,
  FROM_EMAIL: process.env.FROM_EMAIL,
  SMTP_USER: process.env.SMTP_USER,
  SMTP_PASSWORD: process.env.SMTP_PASSWORD
};
