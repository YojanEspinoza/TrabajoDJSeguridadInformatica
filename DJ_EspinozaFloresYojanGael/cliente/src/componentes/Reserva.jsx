import { useState } from "react"
import { mandar } from "../api/api"

function Reserva() {
  const [aviso, setAviso] = useState("")
  const [datos, setDatos] = useState({
    nombre: "",
    correo: "",
    telefono: "",
    fechaEvento: "",
    ciudad: "",
    tipoEvento: "fiesta",
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
      const respuesta = await mandar("/reservas", datos)
      setAviso(respuesta.mensaje)
    } catch (error) {
      setAviso(error.message)
    }
  }

  return (
    <form onSubmit={enviar}>
      <input name="nombre" value={datos.nombre} onChange={cambiar} placeholder="Nombre" required />
      <input name="correo" type="email" value={datos.correo} onChange={cambiar} placeholder="Correo" required />
      <input name="telefono" value={datos.telefono} onChange={cambiar} placeholder="Teléfono" />
      <input name="fechaEvento" type="date" value={datos.fechaEvento} onChange={cambiar} required />
      <input name="ciudad" value={datos.ciudad} onChange={cambiar} placeholder="Ciudad del evento" />
      <select name="tipoEvento" value={datos.tipoEvento} onChange={cambiar}>
        <option value="fiesta">Fiesta</option>
        <option value="boda">Boda</option>
        <option value="empresa">Empresa</option>
        <option value="otro">Otro</option>
      </select>
      <textarea name="mensaje" value={datos.mensaje} onChange={cambiar} placeholder="Detalles del evento" />
      <button>Reservar fecha</button>
      {aviso && <p className="aviso">{aviso}</p>}
    </form>
  )
}

export default Reserva
