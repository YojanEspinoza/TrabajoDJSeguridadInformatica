const Reserva = require("../modelos/Reserva")

async function crear(req, res) {
  const { nombre, correo, fechaEvento } = req.body

  if (!nombre || !correo || !fechaEvento) {
    return res.status(400).json({ error: "Nombre, correo y fecha son obligatorios" })
  }

  const ocupada = await Reserva.findOne({
    fechaEvento: new Date(fechaEvento),
    estado: { $ne: "cancelada" }
  })

  if (ocupada) {
    return res.status(409).json({ error: "Esa fecha ya tiene una reserva registrada" })
  }

  const reserva = await Reserva.create(req.body)

  res.status(201).json({
    ok: true,
    mensaje: "Reserva registrada, falta confirmarla",
    reserva
  })
}

async function listar(req, res) {
  const reservas = await Reserva.find().sort({ fechaEvento: 1 })
  res.json(reservas)
}

module.exports = {
  crear,
  listar
}
