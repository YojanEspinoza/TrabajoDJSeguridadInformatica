# Página DJ con backend

Este proyecto es una página para un DJ que ofrece servicios para eventos y vende mesas de trabajo.

La parte más importante del proyecto es el backend. El frontend solo consume la API.

## Tecnologías

- Node.js
- Express
- CORS
- JSON como almacenamiento local
- HTML, CSS y JavaScript para el cliente

## Estructura

```txt
dj-backend-web/
├── cliente/
│   ├── index.html
│   ├── estilos.css
│   └── main.js
├── servidor/
│   ├── datos/
│   │   ├── mesas.json
│   │   ├── servicios.json
│   │   └── mensajes.json
│   ├── rutas/
│   │   ├── contacto.js
│   │   ├── mesas.js
│   │   └── servicios.js
│   ├── utils/
│   │   └── archivo.js
│   ├── app.js
│   └── package.json
├── .gitignore
└── README.md
```

## Instalación

```bash
cd servidor
npm install
npm run dev
```

El servidor corre en:

```txt
http://localhost:3000
```

Después abre el archivo:

```txt
cliente/index.html
```

También puedes abrirlo con Live Server.

## Rutas principales

### Servicios

```txt
GET    /api/servicios
GET    /api/servicios/:id
POST   /api/servicios
PUT    /api/servicios/:id
DELETE /api/servicios/:id
```

### Mesas

```txt
GET    /api/mesas
GET    /api/mesas/:id
POST   /api/mesas
PUT    /api/mesas/:id
DELETE /api/mesas/:id
```

### Contacto

```txt
POST /api/contacto
GET  /api/contacto
```

## Ejemplo para crear una mesa

```json
{
  "nombre": "Mesa compacta",
  "detalle": "Mesa ligera para laptop y controladora",
  "precio": 2200,
  "foto": "https://ejemplo.com/foto.jpg",
  "stock": 4
}
```

## Ejemplo para crear un servicio

```json
{
  "nombre": "Fiesta privada",
  "texto": "Música para reuniones y cumpleaños",
  "costo": 3500,
  "incluye": ["DJ", "bocinas", "luces básicas"]
}
```
