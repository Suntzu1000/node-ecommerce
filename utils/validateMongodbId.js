const mongoose = require("mongoose");
const validateMongodbId = (id) => {
  const isValid = mongoose.Types.ObjectId.isValid(id);
  if (!isValid) throw new Error("Este Id não é válido ou não foi Encontrado!");
};

module.exports = validateMongodbId