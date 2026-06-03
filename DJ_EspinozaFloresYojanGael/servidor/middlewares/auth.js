const jwt = require("jsonwebtoken")

function proteger(req, res, next) {
  const header = req.headers.authorization

  if (!header || !header.startsWith("Bearer ")) {
    return res.status(401).json({ error: "No autorizado" })
  }

  try {
    const token = header.split(" ")[1]
    req.admin = jwt.verify(token, process.env.JWT_SECRET)
    next()
  } catch {
    res.status(401).json({ error: "Token inválido" })
  }
}

module.exports = proteger
