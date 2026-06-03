const mongoose = require("mongoose")

const adminSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    trim: true
  },
  correo: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  clave: {
    type: String,
    required: true
  }
}, {
  timestamps: true
})

module.exports = mongoose.model("Admin", adminSchema)
