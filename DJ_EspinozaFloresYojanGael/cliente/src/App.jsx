import { useEffect, useState } from "react"
import { pedir } from "./api/api"
import Tarjeta from "./componentes/Tarjeta"
import FormularioContacto from "./componentes/FormularioContacto"
import Reserva from "./componentes/Reserva"

function App() {
  const [servicios, setServicios] = useState([])
  const [mesas, setMesas] = useState([])
  const [blog, setBlog] = useState([])
  const [resenas, setResenas] = useState([])

  useEffect(() => {
    pedir("/servicios").then(setServicios)
    pedir("/mesas").then(setMesas)
    pedir("/blog").then(setBlog)
    pedir("/resenas").then(setResenas)
  }, [])

  return (
    <>
      <nav>
        <h2>DJ Set</h2>
        <div>
          <a href="#servicios">Servicios</a>
          <a href="#mesas">Mesas</a>
          <a href="#reserva">Reservar</a>
          <a href="#blog">Blog</a>
          <a href="#contacto">Contacto</a>
        </div>
      </nav>

      <header>
        <div>
          <p>DJ para eventos y cabinas</p>
          <h1>Servicios de DJ y mesas de trabajo a la medida</h1>
          <span>
            Cotizaciones para interior de México, bodegas en Querétaro y Guadalajara,
            pago en línea y reservas por fecha.
          </span>
        </div>
      </header>

      <main>
        <section id="servicios">
          <h2>Servicios</h2>
          <div className="grid">
            {servicios.map(servicio => (
              <Tarjeta
                key={servicio._id}
                titulo={servicio.nombre}
                texto={servicio.descripcion}
                precio={servicio.precioBase}
                extra={servicio.incluye?.join(", ")}
              />
            ))}
          </div>
        </section>

        <section id="mesas">
          <h2>Mesas de trabajo</h2>
          <div className="grid">
            {mesas.map(mesa => (
              <Tarjeta
                key={mesa._id}
                titulo={mesa.nombre}
                texto={mesa.descripcion}
                precio={mesa.precio}
                imagen={mesa.foto}
                extra={`Bodega: ${mesa.ciudadBodega} | Stock: ${mesa.stock}`}
              />
            ))}
          </div>
        </section>

        <section id="reserva">
          <h2>Reservar fecha</h2>
          <Reserva />
        </section>

        <section id="blog">
          <h2>Blog</h2>
          <div className="grid">
            {blog.map(item => (
              <Tarjeta
                key={item._id}
                titulo={item.titulo}
                texto={item.resumen || item.contenido}
                imagen={item.imagen}
                extra={item.video ? "Incluye video" : ""}
              />
            ))}
          </div>
        </section>

        <section>
          <h2>Reseñas</h2>
          <div className="grid">
            {resenas.map(resena => (
              <Tarjeta
                key={resena._id}
                titulo={resena.nombre}
                texto={resena.texto}
                extra={`${resena.calificacion}/5 - ${resena.fuente}`}
              />
            ))}
          </div>
        </section>

        <section id="contacto">
          <h2>Contacto</h2>
          <FormularioContacto />
        </section>
      </main>

      <footer>
        <p>DJ Set © 2026</p>
      </footer>
    </>
  )
}

export default App
