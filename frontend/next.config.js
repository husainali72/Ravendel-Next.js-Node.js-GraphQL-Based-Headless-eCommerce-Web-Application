
// var bucketName = "revendal-image";
// var bucketBaseURL = `https://${bucketName}.s3.amazonaws.com/`;

// if (process.env.NODE_ENV === "production") {
  bucketName = "revendal-image-prod";
  bucketBaseURL = `https://${bucketName}.s3.amazonaws.com/`;
// }

module.exports = {
  reactStrictMode: true,
  assetPrefix: '',
  basepath: "/out",
  images: {
    domains: ['ravendel.herokuapp.com', 'adinahealth.com'],
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
      "/shop": { page: "/shop" },
      "/about": { page: "/about" },
      "/abouts/contactus": { page: "/abouts/contactus" },
      "/abouts/deliveryinformations": { page: "/abouts/deliveryinformation" },
      "/abouts/help": { page: "/abouts/help" },
      "/abouts/privacypolicy": { page: "/abouts/privacypolicy" },
      "/abouts/supportcenter": { page: "/abouts/supportcenter" },
      "/abouts/terms&condition": { page: "/abouts/terms&condition" },
      "/account": { page: "/account" },
      "/account/order": { page: "/account/order" },
      "/account/profile": { page: "/account/profile" },
      "/account/trackmyorder": { page: "/account/trackmyorder" },
      "/account/forgetpassword": { page: "/account/forgetpassword" },
      "/blog": { page: "/blog" },
      "/blogs/[blogs]": { page: "/blogs/[blogs]" },
      "/blogtags/[tags]": { page: "/blogtags/[tags]" },
      "/categorys/[category]": { page: "/categorys/[category]" },
      "/products/[singleproduct]": { page: "/products/[singleproduct]" },
      "/checkout": { page: "/checkout" },
      "/contact": { page: "/contact" },
      "/shopcart": { page: "/shopcart" },
    };
  },
  reactStrictMode: true,
  assetPrefix: '',
  basepath: "/",
  images: {
    domains: ['ravendel.herokuapp.com', 'adinahealth.com'],
    loader: "imgix",
    path: "",
  },
  experimental: {
    esmExternals: false,
    outputStandalone: true,
  },
};