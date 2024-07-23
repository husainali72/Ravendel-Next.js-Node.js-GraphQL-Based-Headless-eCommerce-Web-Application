/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */

// var bucketName = "revendal-image";
// var bucketBaseURL = `https://${bucketName}.s3.amazonaws.com/`;

// if (process.env.NODE_ENV === "production") {
  bucketName = "revendal-image-prod";
  bucketBaseURL = `https://${bucketName}.s3.amazonaws.com/`;
// }

module.exports = {
  reactStrictMode: true,
  distDir: 'build',
  assetPrefix: '',
  basepath: "/out",
  images: {
    domains: ['/'],
    loader: "imgix",
    path: "",
  },
  experimental: {
    esmExternals: false
  },
}

module.exports = {
  exportPathMap: async function (
    defaultPathMap,
    { dev, dir, outDir, distDir, buildId }
  ) {
    return {
      "/": { page: "/" },
      // "/shop": { page: "/shop" },
      "/about": { page: "/about" },
      "/abouts/contactus": { page: "/abouts/contactus" },
      "/abouts/deliveryInformation": { page: "/abouts/deliveryInformation" },
      "/abouts/help": { page: "/abouts/help" },
      "/abouts/privacypolicy": { page: "/abouts/privacypolicy" },
      "/abouts/supportcenter": { page: "/abouts/supportcenter" },
      "/abouts/terms&condition": { page: "/abouts/terms&condition" },
      "/account": { page: "/account" },
      "/account/order": { page: "/account/order" },
      "/account/profile": { page: "/account/profile" },
      "/account/trackmyorder": { page: "/account/trackmyorder" },
      "/account/forgetpassword": { page: "/account/forgetpassword" },
      // "/blog": { page: "/blog" },
      // "/blogs/[blogs]": { page: "/blogs/[blogs]" },
      // "/blogtags/[tags]": { page: "/blogtags/[tags]" },
      "/categorys/[category]": { page: "/categorys/[category]" },
      "/product/[singleproduct]": { page: "/product/[singleproduct]" },
      "/checkout": { page: "/checkout" },
      "/contact": { page: "/contact" },
      "/shopcart": { page: "/shopcart" },
    };
  },
  reactStrictMode: true,
  assetPrefix: '',
  basepath: "/",
  distDir: 'build',
  images: {
    domains: ['/'],
    loader: "imgix",
    path: "",
  },
  experimental: {
    esmExternals: false,
    outputStandalone: true,
  },
};
