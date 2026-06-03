const Articulo = require("../modelos/Articulo")

async function listar(req, res) {
  const articulos = await Articulo.find({ publicado: true }).sort({ createdAt: -1 })
  res.json(articulos)
}

async function crear(req, res) {
  const { titulo, contenido } = req.body

  if (!titulo || !contenido) {
    return res.status(400).json({ error: "Título y contenido son obligatorios" })
  }

  const articulo = await Articulo.create(req.body)
  res.status(201).json(articulo)
}

async function editar(req, res) {
  const articulo = await Articulo.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  })

  if (!articulo) {
    return res.status(404).json({ error: "Artículo no encontrado" })
  }

  res.json(articulo)
}

async function eliminar(req, res) {
  const articulo = await Articulo.findByIdAndUpdate(req.params.id, { publicado: false }, { new: true })

  if (!articulo) {
    return res.status(404).json({ error: "Artículo no encontrado" })
  }

  res.json({ ok: true, mensaje: "Artículo ocultado" })
}

module.exports = {
  listar,
  crear,
  editar,
  eliminar
}
