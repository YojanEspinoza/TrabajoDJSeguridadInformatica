const api = "http://localhost:3000/api"

const serviciosLista = document.getElementById("servicios-lista")
const mesasLista = document.getElementById("mesas-lista")
const form = document.getElementById("form")
const aviso = document.getElementById("aviso")

async function pedirServicios() {
  const res = await fetch(`${api}/servicios`)
  const datos = await res.json()

  serviciosLista.innerHTML = datos.map(servicio => `
    <div class="card">
      <h3>${servicio.nombre}</h3>
      <p>${servicio.texto}</p>
      <span class="precio">$${servicio.costo.toLocaleString("es-MX")} MXN</span>
    </div>
  `).join("")
}

async function pedirMesas() {
  const res = await fetch(`${api}/mesas`)
  const datos = await res.json()

  mesasLista.innerHTML = datos.map(mesa => `
    <div class="card">
      <img src="${mesa.foto}" alt="${mesa.nombre}">
      <h3>${mesa.nombre}</h3>
      <p>${mesa.detalle}</p>
      <span class="precio">$${mesa.precio.toLocaleString("es-MX")} MXN</span>
      <small>Stock: ${mesa.stock}</small>
    </div>
  `).join("")
}

form.addEventListener("submit", async e => {
  e.preventDefault()

  const datos = {
    nombre: document.getElementById("nombre").value.trim(),
    correo: document.getElementById("correo").value.trim(),
    telefono: document.getElementById("telefono").value.trim(),
    tipo: document.getElementById("tipo").value,
    mensaje: document.getElementById("mensaje").value.trim()
  }

  try {
    const res = await fetch(`${api}/contacto`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(datos)
    })

    const respuesta = await res.json()

    if (!res.ok) {
      throw new Error(respuesta.error)
    }

    aviso.textContent = `${respuesta.mensaje}. Folio: ${respuesta.folio}`
    aviso.style.color = "#00e0c6"
    form.reset()
  } catch (error) {
    aviso.textContent = error.message
    aviso.style.color = "#ff4d6d"
  }
})

pedirServicios()
pedirMesas()
