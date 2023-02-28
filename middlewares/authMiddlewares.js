const User = require("../models/useModel");
const jwt = require("../config/jwtToken");
const asyncHandler = require("express-async-handler");

const authMiddlewares = asyncHandler(async (req, res, next) => {
  let token;
  if (req?.headers?.authorization?.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
    try {
      if (token) {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log(decoded);
      }
    } catch (error) {
      throw new Error("Não Autorizado, token expirado! Tente novamente");
    }
  } else {
    throw new Error("There is no token attached to header");
  }
});
module.exports = { authMiddlewares };
