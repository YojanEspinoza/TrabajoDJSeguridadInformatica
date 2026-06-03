const mongoose = require("mongoose")

const reservaSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true
  },
  correo: {
    type: String,
    required: true
  },
  telefono: String,
  fechaEvento: {
    type: Date,
    required: true
  },
  ciudad: String,
  tipoEvento: {
    type: String,
    enum: ["fiesta", "boda", "empresa", "otro"],
    default: "otro"
  },
  mensaje: String,
  estado: {
    type: String,
    enum: ["pendiente", "confirmada", "cancelada"],
    default: "pendiente"
  }
}, {
  timestamps: true
})

module.exports = mongoose.model("Reserva", reservaSchema)
