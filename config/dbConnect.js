const { default: mongoose } = require("mongoose");

const dbConnect = () => {
  try {
    mongoose.set('strictQuery', true)
    const conn = mongoose.connect(process.env.MONGODB_URL);
    console.log("Banco de dados Conectado!");
  } catch (error) {
    console.log("Erro em Banco de dados");
  }
};
module.exports = dbConnect;
