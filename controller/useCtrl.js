const User = require("../models/useModel");
const asyncHandler = require("express-async-handler");
const createUser = asyncHandler(async (req, res) => {
  const email = req.body.email;
  const findUser = await User.findOne({ email: email });
  if (!findUser) {
    const newUser = await User.create(req.body);
    res.json(newUser);
  } else {
   throw new Error('Usuário já existente')
  }
});

const loginUserCtrl = asyncHandler(async(req, res) => {
  const {email, password} = req.body
  console.log(email, password)

  const findUser = await User.findOne({email})
  if(findUser && (await findUser.isPasswordMatched(password)) ) {
    res.json(findUser)
  } else {
    throw new Error('Credenciais Inválidos')
  }

}) 

module.exports = { createUser, loginUserCtrl };
