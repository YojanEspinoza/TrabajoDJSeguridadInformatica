require("dotenv").config()
const bcrypt = require("bcryptjs")
const conectarDb = require("../config/db")
const Admin = require("../modelos/Admin")

async function crear() {
  await conectarDb()

  const correo = process.env.ADMIN_CORREO
  const clave = process.env.ADMIN_CLAVE

  const existe = await Admin.findOne({ correo })

  if (existe) {
    console.log("El admin ya existe")
    process.exit()
  }

  const hash = await bcrypt.hash(clave, 10)

  await Admin.create({
    nombre: "Administrador",
    correo,
    clave: hash
  })

  console.log("Admin creado")
  process.exit()
}

crear()
