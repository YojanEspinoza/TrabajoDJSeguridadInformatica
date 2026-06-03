const api = import.meta.env.VITE_API_URL || "http://localhost:3000/api"

export async function pedir(ruta) {
  const res = await fetch(`${api}${ruta}`)
  return res.json()
}

export async function mandar(ruta, datos) {
  const res = await fetch(`${api}${ruta}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(datos)
  })

  const respuesta = await res.json()

  if (!res.ok) {
    throw new Error(respuesta.error || "No se pudo completar")
  }

  return respuesta
}
