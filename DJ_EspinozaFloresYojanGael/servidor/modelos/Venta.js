const mongoose = require("mongoose")

const ventaSchema = new mongoose.Schema({
  cliente: {
    type: String,
    required: true
  },
  correo: String,
  telefono: String,
  articulo: {
    type: String,
    required: true
  },
  tipo: {
    type: String,
    enum: ["mesa", "servicio", "otro"],
    default: "otro"
  },
  cantidad: {
    type: Number,
    default: 1
  },
  total: {
    type: Number,
    required: true
  },
  estado: {
    type: String,
    enum: ["pendiente", "pagado", "entregado", "cancelado"],
    default: "pendiente"
  },
  metodoPago: {
    type: String,
    default: "pendiente"
  }
}, {
  timestamps: true
})

module.exports = mongoose.model("Venta", ventaSchema)
