const Venta = require("../modelos/Venta")

async function listar(req, res) {
  const orden = req.query.orden === "articulo" ? { articulo: 1 } : { createdAt: -1 }
  const ventas = await Venta.find().sort(orden)
  res.json(ventas)
}

async function crear(req, res) {
  const { cliente, articulo, total } = req.body

  if (!cliente || !articulo || !total) {
    return res.status(400).json({ error: "Cliente, artículo y total son obligatorios" })
  }

  const venta = await Venta.create(req.body)
  res.status(201).json(venta)
}

module.exports = {
  listar,
  crear
}
