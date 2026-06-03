const Mesa = require("../modelos/Mesa")

async function listar(req, res) {
  const filtro = { activa: true }

  if (req.query.ciudad) {
    filtro.ciudadBodega = req.query.ciudad
  }

  const mesas = await Mesa.find(filtro).sort({ createdAt: -1 })
  res.json(mesas)
}

async function crear(req, res) {
  const { nombre, descripcion, precio } = req.body

  if (!nombre || !descripcion || !precio) {
    return res.status(400).json({ error: "Faltan datos de la mesa" })
  }

  const mesa = await Mesa.create(req.body)
  res.status(201).json(mesa)
}

async function editar(req, res) {
  const mesa = await Mesa.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  })

  if (!mesa) {
    return res.status(404).json({ error: "Mesa no encontrada" })
  }

  res.json(mesa)
}

async function eliminar(req, res) {
  const mesa = await Mesa.findByIdAndUpdate(req.params.id, { activa: false }, { new: true })

  if (!mesa) {
    return res.status(404).json({ error: "Mesa no encontrada" })
  }

  res.json({ ok: true, mensaje: "Mesa eliminada" })
}

module.exports = {
  listar,
  crear,
  editar,
  eliminar
}
