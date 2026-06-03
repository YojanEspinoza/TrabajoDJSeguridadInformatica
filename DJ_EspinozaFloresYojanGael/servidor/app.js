const express = require("express")
const cors = require("cors")

const rutasServicios = require("./rutas/servicios")
const rutasMesas = require("./rutas/mesas")
const rutasContacto = require("./rutas/contacto")

const app = express()
const puerto = process.env.PORT || 3000

app.use(cors())
app.use(express.json())

app.get("/", (req, res) => {
  res.json({
    ok: true,
    nombre: "API DJ",
    rutas: {
      servicios: "/api/servicios",
      mesas: "/api/mesas",
      contacto: "/api/contacto"
    }
  })
})

app.use("/api/servicios", rutasServicios)
app.use("/api/mesas", rutasMesas)
app.use("/api/contacto", rutasContacto)

app.use((req, res) => {
  res.status(404).json({
    error: "Ruta no encontrada"
  })
})

app.use((err, req, res, next) => {
  res.status(500).json({
    error: "Error en el servidor"
  })
})

app.listen(puerto, () => {
  console.log(`Servidor listo en http://localhost:${puerto}`)
})
