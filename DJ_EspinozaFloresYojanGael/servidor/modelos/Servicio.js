const mongoose = require("mongoose")

const servicioSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    trim: true
  },
  descripcion: {
    type: String,
    required: true
  },
  precioBase: {
    type: Number,
    required: true
  },
  incluye: [String],
  disponible: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
})

module.exports = mongoose.model("Servicio", servicioSchema)
