const mongoose = require("mongoose")

const articuloSchema = new mongoose.Schema({
  titulo: {
    type: String,
    required: true
  },
  resumen: String,
  contenido: {
    type: String,
    required: true
  },
  imagen: String,
  video: String,
  publicado: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
})

module.exports = mongoose.model("Articulo", articuloSchema)
