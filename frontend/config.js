// export const IMAGE_BASE_URL = "https://ravendel.herokuapp.com";
// export const IMAGE_BASE_URL = "http://demo1.ravendel.io";

// export const BASE_URL = 'ravendel-node.onrender.com'
export const BASE_URL = "demo1.ravendel.io";
export const baseUrl = `https://${BASE_URL}/`;
// export const BASE_URL = 'localhost:8000'
export const IMAGE_BASE_URL = `https://${BASE_URL}`;

export const API_BASE_URL = `https://${BASE_URL}/api`;
// export const API_BASE_URL = "http://demo1.ravendel.io/api";
// export const API_BASE_URL = "http://ravendel-node.onrender.com/api";

/* -------------------------------  imageURl changes to bucketURL ------------------------- */

// export var bucketName = "revendal-image-prod";
export var bucketName = "revendal-image";
export var bucketBaseURL = `https://${bucketName}.s3.amazonaws.com/`;
// export var bucketBaseURL = `https://${BASE_URL}/`;

// if (process.env.NODE_ENV === "production") {
//     bucketName = "revendal-image-prod";
//     bucketBaseURL = `https://${bucketName}.s3.amazonaws.com/`;
// }


// add production image url to bucket

//   bucketName = "revendal-image-prod";
