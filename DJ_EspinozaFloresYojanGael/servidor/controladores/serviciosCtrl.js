const Servicio = require("../modelos/Servicio")

async function listar(req, res) {
  const servicios = await Servicio.find({ disponible: true }).sort({ createdAt: -1 })
  res.json(servicios)
}

async function crear(req, res) {
  const { nombre, descripcion, precioBase, incluye } = req.body

  if (!nombre || !descripcion || !precioBase) {
    return res.status(400).json({ error: "Faltan datos del servicio" })
  }

  const servicio = await Servicio.create({
    nombre,
    descripcion,
    precioBase,
    incluye: Array.isArray(incluye) ? incluye : []
  })

  res.status(201).json(servicio)
}

async function editar(req, res) {
  const servicio = await Servicio.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  })

  if (!servicio) {
    return res.status(404).json({ error: "Servicio no encontrado" })
  }

  res.json(servicio)
}

async function eliminar(req, res) {
  const servicio = await Servicio.findByIdAndUpdate(req.params.id, { disponible: false }, { new: true })

  if (!servicio) {
    return res.status(404).json({ error: "Servicio no encontrado" })
  }

  res.json({ ok: true, mensaje: "Servicio eliminado" })
}

module.exports = {
  listar,
  crear,
  editar,
  eliminar
}
