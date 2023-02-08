// export const IMAGE_BASE_URL = "https://ravendel.herokuapp.com";
export const IMAGE_BASE_URL = "http://localhost:8000";
// export const IMAGE_BASE_URL = "http://localhost:3000"


// export const API_BASE_URL = "http://localhost:3001/api";
export const API_BASE_URL = "http://localhost:8000/api";

/* -------------------------------  imageURl changes to bucketURL ------------------------- */

// export var bucketName = "revendal-image-prod";
export var bucketName = "revendal-image";
export var bucketBaseURL = `https://${bucketName}.s3.amazonaws.com/`;

// if (process.env.NODE_ENV === "production") {
//     bucketName = "revendal-image-prod";
//     bucketBaseURL = `https://${bucketName}.s3.amazonaws.com/`;
// }


// add production image url to bucket

//   bucketName = "revendal-image-prod";
