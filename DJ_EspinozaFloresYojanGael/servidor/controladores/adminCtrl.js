const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const Admin = require("../modelos/Admin")

async function login(req, res) {
  const { correo, clave } = req.body

  if (!correo || !clave) {
    return res.status(400).json({ error: "Correo y clave son obligatorios" })
  }

  const admin = await Admin.findOne({ correo })

  if (!admin) {
    return res.status(401).json({ error: "Datos incorrectos" })
  }

  const valida = await bcrypt.compare(clave, admin.clave)

  if (!valida) {
    return res.status(401).json({ error: "Datos incorrectos" })
  }

  const token = jwt.sign(
    { id: admin._id, correo: admin.correo },
    process.env.JWT_SECRET,
    { expiresIn: "2h" }
  )

  res.json({
    token,
    admin: {
      id: admin._id,
      nombre: admin.nombre,
      correo: admin.correo
    }
  })
}

module.exports = {
  login
}
