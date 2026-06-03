# Proyecto DJ y Mesas de Trabajo

Proyecto web para un DJ que ofrece servicios para eventos y también vende mesas de trabajo para cabinas o setups.

La idea es que el cliente pueda ver servicios, mesas disponibles, reseñas, artículos del blog y mandar una solicitud de reserva o compra. También tiene una parte de administrador para registrar ventas, subir contenido y revisar mensajes.

## Lo que incluye

- Landing page en React
- Backend en Express
- MongoDB con Mongoose
- Login de administrador con JWT
- CRUD de servicios
- CRUD de mesas de trabajo
- Reservas con fecha
- Registro de ventas
- Blog para artículos
- Reseñas
- Contacto
- Pago preparado para Mercado Pago
- SEO básico desde el frontend
- Variables de entorno listas

## Carpetas

```txt
dj-proyecto-completo/
├── cliente/
└── servidor/
```

## Cómo correr el backend

```bash
cd servidor
npm install
cp .env.example .env
npm run dev
```

## Cómo correr el frontend

```bash
cd cliente
npm install
npm run dev
```

## Variables importantes

En `servidor/.env`:

```txt
MONGO_URI=
JWT_SECRET=
MERCADOPAGO_TOKEN=
FRONTEND_URL=http://localhost:5173
```

En `cliente/.env`:

```txt
VITE_API_URL=http://localhost:3000/api
```

## Rutas del backend

### Públicas

```txt
GET  /api/servicios
GET  /api/mesas
GET  /api/blog
GET  /api/resenas
POST /api/contacto
POST /api/reservas
POST /api/pagos/crear
```

### Admin

```txt
POST   /api/admin/login
GET    /api/ventas
POST   /api/ventas
POST   /api/servicios
PUT    /api/servicios/:id
DELETE /api/servicios/:id
POST   /api/mesas
PUT    /api/mesas/:id
DELETE /api/mesas/:id
POST   /api/blog
PUT    /api/blog/:id
DELETE /api/blog/:id
```

## Cosas que se cubrieron del documento

- Cotización para interior de México
- Bodegas en Querétaro y Guadalajara
- Muebles a la medida
- Pasarela de pago con Mercado Pago
- Reseñas
- Login seguro para administrador
- Registro de ventas
- Ordenar ventas por artículo
- Blog con artículos, imágenes y videos
- MongoDB
- Express
- React
- Calendario para reservar
- SEO básico
