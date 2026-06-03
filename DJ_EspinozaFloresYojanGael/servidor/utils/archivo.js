const fs = require("fs")

function leer(ruta) {
  if (!fs.existsSync(ruta)) {
    return []
  }

  const contenido = fs.readFileSync(ruta, "utf-8")

  if (!contenido.trim()) {
    return []
  }

  return JSON.parse(contenido)
}

function guardar(ruta, datos) {
  fs.writeFileSync(ruta, JSON.stringify(datos, null, 2))
}

function siguienteId(lista) {
  if (!lista.length) {
    return 1
  }

  return Math.max(...lista.map(item => item.id)) + 1
}

module.exports = {
  leer,
  guardar,
  siguienteId
}
