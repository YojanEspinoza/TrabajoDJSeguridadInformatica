require("dotenv").config()

const express = require("express")
const cors = require("cors")
const helmet = require("helmet")
const morgan = require("morgan")
const conectarDb = require("./config/db")

const rutasAdmin = require("./rutas/admin")
const rutasServicios = require("./rutas/servicios")
const rutasMesas = require("./rutas/mesas")
const rutasReservas = require("./rutas/reservas")
const rutasVentas = require("./rutas/ventas")
const rutasBlog = require("./rutas/blog")
const rutasContacto = require("./rutas/contacto")
const rutasResenas = require("./rutas/resenas")
const rutasPagos = require("./rutas/pagos")

const app = express()
const puerto = process.env.PORT || 3000

conectarDb()

app.use(helmet())
app.use(cors({
  origin: process.env.FRONTEND_URL || "*"
}))
app.use(express.json())
app.use(morgan("dev"))

app.get("/", (req, res) => {
  res.json({
    ok: true,
    nombre: "API del proyecto DJ",
    version: "1.0.0"
  })
})

app.use("/api/admin", rutasAdmin)
app.use("/api/servicios", rutasServicios)
app.use("/api/mesas", rutasMesas)
app.use("/api/reservas", rutasReservas)
app.use("/api/ventas", rutasVentas)
app.use("/api/blog", rutasBlog)
app.use("/api/contacto", rutasContacto)
app.use("/api/resenas", rutasResenas)
app.use("/api/pagos", rutasPagos)

app.use((req, res) => {
  res.status(404).json({
    error: "Ruta no encontrada"
  })
})

app.use((error, req, res, next) => {
  res.status(500).json({
    error: "Error interno del servidor"
  })
})

app.listen(puerto, () => {
  console.log(`Servidor listo en http://localhost:${puerto}`)
})
