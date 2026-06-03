const mongoose = require("mongoose")

const resenaSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true
  },
  texto: {
    type: String,
    required: true
  },
  calificacion: {
    type: Number,
    min: 1,
    max: 5,
    default: 5
  },
  fuente: {
    type: String,
    default: "Google Business"
  },
  visible: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
})

module.exports = mongoose.model("Resena", resenaSchema)
