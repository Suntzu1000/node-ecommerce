const User = require("../models/useModel");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");

const JWT_SECRET = process.env.JWT_SECRET || "default_secret_value";

const authMiddlewares = asyncHandler(async (req, res, next) => {
  let token;
  if (req?.headers?.authorization?.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
    try {
      if (token) {
        const decoded = jwt.verify(token, JWT_SECRET);
        const user = await User.findById(decoded?.id);
        req.user = user;
        next();
      }
    } catch (error) {
      throw new Error("Não autorizado token expirado, Por favor tente novamente");
    }
  } else {
    throw new Error(" Não há token em cabeçalho(header)");
  }
});

const isAdmin = asyncHandler(async (req, res, next) => {
  const {email} = req.user
  const adminUser = await User.findOne({email})
  if(adminUser.role !== 'admin'){
    throw new Error('Você não é um administrador')
  } else {
    next()
  }
});
module.exports = { authMiddlewares, isAdmin };
