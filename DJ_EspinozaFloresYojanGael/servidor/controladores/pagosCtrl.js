const { MercadoPagoConfig, Preference } = require("mercadopago")

async function crearPago(req, res) {
  const { titulo, precio, cantidad } = req.body

  if (!titulo || !precio) {
    return res.status(400).json({ error: "Faltan datos para crear el pago" })
  }

  if (!process.env.MERCADOPAGO_TOKEN) {
    return res.status(400).json({ error: "Mercado Pago no está configurado" })
  }

  const cliente = new MercadoPagoConfig({
    accessToken: process.env.MERCADOPAGO_TOKEN
  })

  const preference = new Preference(cliente)

  const respuesta = await preference.create({
    body: {
      items: [
        {
          title: titulo,
          quantity: Number(cantidad) || 1,
          unit_price: Number(precio),
          currency_id: "MXN"
        }
      ],
      back_urls: {
        success: `${process.env.FRONTEND_URL}/pago-exitoso`,
        failure: `${process.env.FRONTEND_URL}/pago-error`,
        pending: `${process.env.FRONTEND_URL}/pago-pendiente`
      },
      auto_return: "approved"
    }
  })

  res.json({
    id: respuesta.id,
    link: respuesta.init_point
  })
}

module.exports = {
  crearPago
}
