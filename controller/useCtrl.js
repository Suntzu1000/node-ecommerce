const User = require("../models/useModel");
const Product = require("../models/productModel");
const Cart = require("../models/cartModel");
const asyncHandler = require("express-async-handler");
const { generateToken } = require("../config/jwtToken");
const validateMongodbId = require("../utils/validateMongodbId");
const { generateRefreshToken } = require("../config/refreshtoken");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");

//POST
const createUser = asyncHandler(async (req, res) => {
  const email = req.body.email;
  const findUser = await User.findOne({ email: email });
  if (!findUser) {
    const newUser = await User.create(req.body);
    res.json(newUser);
  } else {
    throw new Error("Usuário já existente");
  }
});

const loginUserCtrl = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  try {
    const findUser = await User.findOne({ email });

    if (findUser && (await findUser.isPasswordMatched(password))) {
      const refreshToken = generateRefreshToken(findUser._id);
      const updateuser = await User.findByIdAndUpdate(
        findUser.id,
        {
          refreshToken,
        },
        { new: true }
      );
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        maxAge: 72 * 60 * 60 * 1000,
      });
      res.json({
        _id: findUser._id,
        firstname: findUser.firstname,
        lastname: findUser.lastname,
        email: findUser.email,
        mobile: findUser.mobile,
        token: generateToken(findUser._id),
      });
    } else {
      throw new Error("Credenciais Inválidos");
    }
  } catch (error) {
    console.error("Erro ao procurar usuário:", error);
    throw new Error("Erro interno do servidor");
  }
});

const loginAdmin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  try {
    const findAdmin = await User.findOne({ email });
    if (findAdmin.role !== "admin") throw new Error("Não autorizado!");

    if (findAdmin && (await findAdmin.isPasswordMatched(password))) {
      const refreshToken = generateRefreshToken(findAdmin._id);
      const updateuser = await User.findByIdAndUpdate(
        findAdmin.id,
        {
          refreshToken,
        },
        { new: true }
      );
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        maxAge: 72 * 60 * 60 * 1000,
      });
      res.json({
        _id: findAdmin._id,
        firstname: findAdmin.firstname,
        lastname: findAdmin.lastname,
        email: findAdmin.email,
        mobile: findAdmin.mobile,
        token: generateToken(findAdmin._id),
      });
    } else {
      throw new Error("Credenciais Inválidos");
    }
  } catch (error) {
    console.error("Erro ao procurar usuário:", error);
    throw new Error("Erro interno do servidor");
  }
});

// HANDLE REFRESH TOKEN
const handleRefreshToken = asyncHandler(async (req, res) => {
  const cookie = req.cookies;
  if (!cookie?.refreshToken) throw new Error("No Refresh Token in Cookies");
  const refreshToken = cookie.refreshToken;
  const user = await User.findOne({ refreshToken });
  if (!user)
    throw new Error(
      "Sem atualização de token em Banco de dados ou não combinado!"
    );
  jwt.verify(refreshToken.process.env.JWT_SECERET, (err, decoded) => {
    if (err || user.id !== decoded.id) {
      throw new Error("Há algo de errado com o Refresh Token");
    }
    const accessToken = generateToken(user?._id);
    res.json({ accessToken });
  });
});

//LOGOUT

const logout = asyncHandler(async (req, res) => {
  const cookie = req.cookies;
  if (!cookie?.refreshToken) throw new Error("No Refresh Token in Cookies");
  const refreshToken = cookie.refreshToken;
  const user = await User.findOne({ refreshToken });
  if (!user) {
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: true,
    });
    return res.sendStatus(204);
  }
  await User.findOneAndUpdate(refreshToken, {
    refreshToken: "",
  });
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: true,
  });
  res.sendStatus(204);
});

//UPDATE

const updatedUser = asyncHandler(async (req, res) => {
  console.log();
  const { _id } = req.user;
  validateMongodbId(_id);

  try {
    const updatedUser = await User.findByIdAndUpdate(
      _id,
      {
        firstname: req?.body?.firstname,
        lastname: req?.body?.lastname,
        email: req?.body?.email,
        mobile: req?.body?.mobile,
      },
      {
        new: true,
      }
    );
    res.json(updatedUser);
  } catch (error) {
    throw new Error(error);
  }
});

//GET
const saveAddress = asyncHandler(async (req, res, next) => {
  const { _id } = req.user;
  validateMongodbId(_id);

  try {
    const updatedUser = await User.findByIdAndUpdate(
      _id,
      {
        address: req?.body?.address,
      },
      {
        new: true,
      }
    );
    res.json(updatedUser);
  } catch (error) {
    throw new Error(error);
  }
});

const getallUser = asyncHandler(async (req, res) => {
  try {
    const getUsers = await User.find();
    res.json(getUsers);
  } catch (error) {
    throw new Error(error);
  }
});

const getaUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);
  try {
    const getaUser = await User.findById(id);
    res.json({
      getaUser,
    });
  } catch (error) {
    throw new Error(error);
  }
});

//DELETE
const deleteaUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);
  try {
    const deleteaUser = await User.findByIdAndDelete(id);
    res.json({
      deleteaUser,
    });
  } catch (error) {
    throw new Error(error);
  }
});

const blockUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);
  try {
    const block = await User.findByIdAndUpdate(
      id,
      {
        isBlocked: true,
      },
      {
        new: true,
      }
    );
    res.json({
      message: "Usuário Bloqueado",
    });
  } catch (error) {
    throw new Error(error);
  }
});
const unblockUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);
  try {
    const unblock = await User.findByIdAndUpdate(
      id,
      {
        isBlocked: false,
      },
      {
        new: true,
      }
    );
    res.json({
      message: "Usuário Desbloqueado",
    });
  } catch (error) {
    throw new Error(error);
  }
});

const updatePassword = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { password } = req.body;
  validateMongodbId(_id);
  const user = await User.findById(_id);
  if (password) {
    user.password = password;
    const updatedPassword = await user.save();
    res.json(updatedPassword);
  } else {
    res.json(user);
  }
});

const forgotPasswordToken = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) throw Error("Usuário não encontrado com este email!");
  try {
    const token = await user.createPasswordResetToken();
    await user.save();
    const resetURL = `Olá! Por favor siga este link para Resetar sua senha! Será validada em até 10 minutos <a href='http://localhost:5000/api/user/reset-password/${token}' >Clique</a> `;
    const data = {
      to: email,
      text: "Olá Usuário!",
      subject: "Link de senha ESQUECIDA!",
      htm: resetURL,
    };
    sendEmail(data);
    res.json(token);
  } catch (error) {
    throw new Error(error);
  }
});

const resetPassword = asyncHandler(async (req, res) => {
  const { password } = req.body;
  const { token } = req.params;
  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });
  if (!user)
    throw new Error("Token Expirado. Por favor tente novamente mais tarde!");
  user.password = password;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();
  res.json(user);
});

const getWishList = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  try {
    const findUser = await User.findById(_id).populate("wishlist");
    res.json(findUser);
  } catch (error) {
    throw new Error(error);
  }
});

const userCart = asyncHandler(async (req, res, next) => {
  const { cart } = req.body;
  const { _id } = req.user;
  validateMongodbId(_id);
  try {
    const user = await User.findById(_id);
    const alreadyExistCart = await Cart.findOne({ orderby: user._id });
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  createUser,
  loginUserCtrl,
  getallUser,
  getaUser,
  deleteaUser,
  updatedUser,
  blockUser,
  unblockUser,
  handleRefreshToken,
  logout,
  updatePassword,
  forgotPasswordToken,
  resetPassword,
  loginAdmin,
  getWishList,
  saveAddress,
  userCart,
};
