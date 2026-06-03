const mongoose = require("mongoose")

async function conectarDb() {
  try {
    await mongoose.connect(process.env.MONGO_URI)
    console.log("MongoDB conectado")
  } catch (error) {
    console.log("No se pudo conectar a MongoDB")
    console.log(error.message)
    process.exit(1)
  }
}

module.exports = conectarDb
