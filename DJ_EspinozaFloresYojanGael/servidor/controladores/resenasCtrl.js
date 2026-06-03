const Resena = require("../modelos/Resena")

async function listar(req, res) {
  const resenas = await Resena.find({ visible: true }).sort({ createdAt: -1 })
  res.json(resenas)
}

async function crear(req, res) {
  const { nombre, texto } = req.body

  if (!nombre || !texto) {
    return res.status(400).json({ error: "Nombre y reseña son obligatorios" })
  }

  const resena = await Resena.create(req.body)
  res.status(201).json(resena)
}

module.exports = {
  listar,
  crear
}
