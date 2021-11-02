const CustomAPIError = require("./custom-error");
const BadRequest = require("./bad-request");
const AuthError = require("./unauthenticated");

module.exports = { CustomAPIError, BadRequest, AuthError };
