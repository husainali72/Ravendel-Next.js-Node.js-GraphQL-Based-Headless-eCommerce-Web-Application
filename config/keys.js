if (process.env.NODE_ENV === "production") { 
  module.exports = {    
    mongoURI: "",
    jwtSecret: ""
  };
} else {
  module.exports = {
    mongoURI: "",    
    jwtSecret: ""
  };
}
