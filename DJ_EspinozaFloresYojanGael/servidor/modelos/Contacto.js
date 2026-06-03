const mongoose = require("mongoose")

const contactoSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true
  },
  correo: {
    type: String,
    required: true
  },
  telefono: String,
  mensaje: {
    type: String,
    required: true
  },
  motivo: {
    type: String,
    enum: ["servicio", "mesa", "cotizacion", "general"],
    default: "general"
  },
  estado: {
    type: String,
    enum: ["nuevo", "revisado"],
    default: "nuevo"
  }
}, {
  timestamps: true
})

module.exports = mongoose.model("Contacto", contactoSchema)
