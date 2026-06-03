const Contacto = require("../modelos/Contacto")

async function crear(req, res) {
  const { nombre, correo, mensaje } = req.body

  if (!nombre || !correo || !mensaje) {
    return res.status(400).json({ error: "Nombre, correo y mensaje son obligatorios" })
  }

  if (!correo.includes("@")) {
    return res.status(400).json({ error: "Correo inválido" })
  }

  const contacto = await Contacto.create(req.body)

  res.status(201).json({
    ok: true,
    mensaje: "Mensaje recibido",
    folio: contacto._id
  })
}

async function listar(req, res) {
  const mensajes = await Contacto.find().sort({ createdAt: -1 })
  res.json(mensajes)
}

module.exports = {
  crear,
  listar
}
