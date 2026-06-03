import { useState } from "react"
import { mandar } from "../api/api"

function FormularioContacto() {
  const [aviso, setAviso] = useState("")
  const [datos, setDatos] = useState({
    nombre: "",
    correo: "",
    telefono: "",
    motivo: "servicio",
    mensaje: ""
  })

  function cambiar(e) {
    setDatos({
      ...datos,
      [e.target.name]: e.target.value
    })
  }

  async function enviar(e) {
    e.preventDefault()

    try {
      const respuesta = await mandar("/contacto", datos)
      setAviso(`Mensaje enviado. Folio: ${respuesta.folio}`)
      setDatos({
        nombre: "",
        correo: "",
        telefono: "",
        motivo: "servicio",
        mensaje: ""
      })
    } catch (error) {
      setAviso(error.message)
    }
  }

  return (
    <form onSubmit={enviar}>
      <input name="nombre" value={datos.nombre} onChange={cambiar} placeholder="Nombre" required />
      <input name="correo" type="email" value={datos.correo} onChange={cambiar} placeholder="Correo" required />
      <input name="telefono" value={datos.telefono} onChange={cambiar} placeholder="Teléfono" />
      <select name="motivo" value={datos.motivo} onChange={cambiar}>
        <option value="servicio">Servicio DJ</option>
        <option value="mesa">Mesa de trabajo</option>
        <option value="cotizacion">Cotización interior de México</option>
        <option value="general">General</option>
      </select>
      <textarea name="mensaje" value={datos.mensaje} onChange={cambiar} placeholder="Mensaje" required />
      <button>Enviar</button>
      {aviso && <p className="aviso">{aviso}</p>}
    </form>
  )
}

export default FormularioContacto
