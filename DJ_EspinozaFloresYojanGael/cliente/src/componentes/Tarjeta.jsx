function Tarjeta({ titulo, texto, precio, imagen, extra }) {
  return (
    <article className="tarjeta">
      {imagen && <img src={imagen} alt={titulo} />}
      <div>
        <h3>{titulo}</h3>
        <p>{texto}</p>
        {precio && <span>${Number(precio).toLocaleString("es-MX")} MXN</span>}
        {extra && <small>{extra}</small>}
      </div>
    </article>
  )
}

export default Tarjeta
