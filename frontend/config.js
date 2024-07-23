export const BASE_URL = "/";
export const baseUrl = `/graphql`;
export const IMAGE_BASE_URL = `/`;
export const API_BASE_URL = `/apis`;

// export const BASE_URL = "localhost:8000";
// export const baseUrl = `http://${BASE_URL}/graphql`;
// export const IMAGE_BASE_URL = `http://${BASE_URL}/`;
// export const API_BASE_URL = `https://${BASE_URL}/apis`;


/* -------------------------------  imageURl changes to bucketURL ------------------------- */

// export var bucketName = "revendal-image-prod";
export var bucketName = "revendal-image";
export var BUCKET_BASE_URL = `https://${bucketName}.s3.amazonaws.com/`;

// if (process.env.NODE_ENV === "production") {
//     bucketName = "revendal-image-prod";
//     bucketBaseURL = `https://${bucketName}.s3.amazonaws.com/`;
// }

// add production image url to bucket

//   bucketName = "revendal-image-prod";
