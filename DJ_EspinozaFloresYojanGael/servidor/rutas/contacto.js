const express = require("express")
const path = require("path")
const { leer, guardar, siguienteId } = require("../utils/archivo")

const router = express.Router()
const ruta = path.join(__dirname, "..", "datos", "mensajes.json")

router.get("/", (req, res) => {
  const mensajes = leer(ruta)
  res.json(mensajes)
})

router.post("/", (req, res) => {
  const { nombre, correo, telefono, mensaje, tipo } = req.body

  if (!nombre || !correo || !mensaje) {
    return res.status(400).json({ error: "Nombre, correo y mensaje son obligatorios" })
  }

  if (!correo.includes("@")) {
    return res.status(400).json({ error: "El correo no parece válido" })
  }

  const mensajes = leer(ruta)

  const nuevo = {
    id: siguienteId(mensajes),
    nombre,
    correo,
    telefono: telefono || "",
    mensaje,
    tipo: tipo || "general",
    estado: "pendiente",
    fecha: new Date().toISOString()
  }

  mensajes.push(nuevo)
  guardar(ruta, mensajes)

  res.status(201).json({
    ok: true,
    mensaje: "Mensaje recibido, te contacto pronto",
    folio: nuevo.id
  })
})

module.exports = router
