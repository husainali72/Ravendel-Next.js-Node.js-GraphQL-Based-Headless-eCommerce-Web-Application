const FormatError = require("easygraphql-format-error");

const formatError = new FormatError([
  {
    name: "NOT_FOUND",
    message: "The record is not found",
    statusCode: 404,
  },
  {
    name: "INVALID_EMAIL",
    message: "The email is not valid",
    statusCode: "400",
  },
  {
    name: "User_DELETED",
    message: "The user deleted sucessfully",
    statusCode: "200",
  },
  {
    name: "User_NOT",
    message: "The user not created sucessfully",
    statusCode: "200",
  },
]);
const errorName = formatError.errorName;

module.exports = formatError;
