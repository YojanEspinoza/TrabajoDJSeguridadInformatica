const mongoose = require("mongoose")

const mesaSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    trim: true
  },
  descripcion: {
    type: String,
    required: true
  },
  precio: {
    type: Number,
    required: true
  },
  stock: {
    type: Number,
    default: 0
  },
  medidas: {
    ancho: Number,
    alto: Number,
    fondo: Number
  },
  ciudadBodega: {
    type: String,
    enum: ["Querétaro", "Guadalajara", "Otro"],
    default: "Querétaro"
  },
  aMedida: {
    type: Boolean,
    default: false
  },
  foto: {
    type: String,
    default: ""
  },
  activa: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
})

module.exports = mongoose.model("Mesa", mesaSchema)
