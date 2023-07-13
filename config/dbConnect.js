const mongoose = require("mongoose");

const dbConnect = async () => {
  try {
    mongoose.set("strictQuery", true);
    await mongoose.connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Banco de dados conectado!");
  } catch (error) {
    console.log("Erro em Banco de dados:", error);
  }
};

module.exports = dbConnect;
