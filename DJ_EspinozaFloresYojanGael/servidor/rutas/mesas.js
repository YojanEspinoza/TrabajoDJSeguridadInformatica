const express = require("express")
const path = require("path")
const { leer, guardar, siguienteId } = require("../utils/archivo")

const router = express.Router()
const ruta = path.join(__dirname, "..", "datos", "mesas.json")

router.get("/", (req, res) => {
  const mesas = leer(ruta)
  const activas = mesas.filter(mesa => mesa.activa !== false)
  res.json(activas)
})

router.get("/:id", (req, res) => {
  const mesas = leer(ruta)
  const id = Number(req.params.id)
  const mesa = mesas.find(item => item.id === id)

  if (!mesa) {
    return res.status(404).json({ error: "Mesa no encontrada" })
  }

  res.json(mesa)
})

router.post("/", (req, res) => {
  const { nombre, detalle, precio, foto, stock } = req.body

  if (!nombre || !detalle || !precio) {
    return res.status(400).json({ error: "Nombre, detalle y precio son obligatorios" })
  }

  if (Number(precio) <= 0) {
    return res.status(400).json({ error: "El precio debe ser mayor a 0" })
  }

  const mesas = leer(ruta)

  const nueva = {
    id: siguienteId(mesas),
    nombre,
    detalle,
    precio: Number(precio),
    foto: foto || "",
    stock: Number(stock) || 0,
    activa: true
  }

  mesas.push(nueva)
  guardar(ruta, mesas)

  res.status(201).json(nueva)
})

router.put("/:id", (req, res) => {
  const mesas = leer(ruta)
  const id = Number(req.params.id)
  const posicion = mesas.findIndex(item => item.id === id)

  if (posicion === -1) {
    return res.status(404).json({ error: "Mesa no encontrada" })
  }

  const actual = mesas[posicion]

  mesas[posicion] = {
    ...actual,
    nombre: req.body.nombre ?? actual.nombre,
    detalle: req.body.detalle ?? actual.detalle,
    precio: req.body.precio ? Number(req.body.precio) : actual.precio,
    foto: req.body.foto ?? actual.foto,
    stock: req.body.stock !== undefined ? Number(req.body.stock) : actual.stock,
    activa: typeof req.body.activa === "boolean" ? req.body.activa : actual.activa
  }

  guardar(ruta, mesas)

  res.json(mesas[posicion])
})

router.delete("/:id", (req, res) => {
  const mesas = leer(ruta)
  const id = Number(req.params.id)
  const posicion = mesas.findIndex(item => item.id === id)

  if (posicion === -1) {
    return res.status(404).json({ error: "Mesa no encontrada" })
  }

  mesas[posicion].activa = false
  guardar(ruta, mesas)

  res.json({ ok: true, mensaje: "Mesa eliminada" })
})

module.exports = router
