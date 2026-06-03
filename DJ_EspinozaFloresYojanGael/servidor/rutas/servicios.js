const express = require("express")
const path = require("path")
const { leer, guardar, siguienteId } = require("../utils/archivo")

const router = express.Router()
const ruta = path.join(__dirname, "..", "datos", "servicios.json")

router.get("/", (req, res) => {
  const servicios = leer(ruta)
  const activos = servicios.filter(servicio => servicio.activo !== false)
  res.json(activos)
})

router.get("/:id", (req, res) => {
  const servicios = leer(ruta)
  const id = Number(req.params.id)
  const servicio = servicios.find(item => item.id === id)

  if (!servicio) {
    return res.status(404).json({ error: "Servicio no encontrado" })
  }

  res.json(servicio)
})

router.post("/", (req, res) => {
  const { nombre, texto, costo, incluye } = req.body

  if (!nombre || !texto || !costo) {
    return res.status(400).json({ error: "Nombre, texto y costo son obligatorios" })
  }

  if (Number(costo) <= 0) {
    return res.status(400).json({ error: "El costo debe ser mayor a 0" })
  }

  const servicios = leer(ruta)

  const nuevo = {
    id: siguienteId(servicios),
    nombre,
    texto,
    costo: Number(costo),
    incluye: Array.isArray(incluye) ? incluye : [],
    activo: true
  }

  servicios.push(nuevo)
  guardar(ruta, servicios)

  res.status(201).json(nuevo)
})

router.put("/:id", (req, res) => {
  const servicios = leer(ruta)
  const id = Number(req.params.id)
  const posicion = servicios.findIndex(item => item.id === id)

  if (posicion === -1) {
    return res.status(404).json({ error: "Servicio no encontrado" })
  }

  const actual = servicios[posicion]

  servicios[posicion] = {
    ...actual,
    nombre: req.body.nombre ?? actual.nombre,
    texto: req.body.texto ?? actual.texto,
    costo: req.body.costo ? Number(req.body.costo) : actual.costo,
    incluye: Array.isArray(req.body.incluye) ? req.body.incluye : actual.incluye,
    activo: typeof req.body.activo === "boolean" ? req.body.activo : actual.activo
  }

  guardar(ruta, servicios)

  res.json(servicios[posicion])
})

router.delete("/:id", (req, res) => {
  const servicios = leer(ruta)
  const id = Number(req.params.id)
  const posicion = servicios.findIndex(item => item.id === id)

  if (posicion === -1) {
    return res.status(404).json({ error: "Servicio no encontrado" })
  }

  servicios[posicion].activo = false
  guardar(ruta, servicios)

  res.json({ ok: true, mensaje: "Servicio eliminado" })
})

module.exports = router
