# Smiling Friends App — TP N°2

Aplicación fullstack para gestion clientes y sus problemas, asignando trabajadores para resolver sus situaciones.

**Alumno:** Facundo Cristaldo

---

## Tecnologías

| Capa          | Tecnología                     |
| ------------- | ------------------------------ |
| Frontend      | React.js + Vite + Tailwind CSS |
| Backend       | Node.js + Express              |
| Base de datos | MySQL + Sequelize              |

---

## Cómo ejecutar el proyecto

### Requisitos previos

- Node.js instalado
- XAMPP o MySQL corriendo localmente
- Una base de datos creada (ej: `smiling_friends_db`)

---

### Backend

```bash
cd backend
npm install
```

Crear un archivo `.env` en la raíz de la carpeta `backend`:

```env
DB_NAME=smiling_friends_db
DB_USER=root
DB_PASSWORD=
DB_HOST=localhost
PORT=3000
```

Ejecutar el seed (carga de datos iniciales):

```bash
npm run seed
```

Iniciar el servidor:

```bash
npm run dev
```

El servidor corre en `http://localhost:3000`
Sequelize crea las tablas automáticamente con `sync()`.

---

### Frontend

```bash
cd frontend
npm install
npm run dev
```

La app corre en `http://localhost:5173`

---

## Endpoints de la API

| Método | Ruta                      | Descripción               |
| ------ | ------------------------- | ------------------------- |
| GET    | `/api/clientes`           | Listar todos los clientes |
| GET    | `/api/cliente/:id`        | Obtener cliente por ID    |
| POST   | `/api/cliente`            | Crear un nuevo cliente    |
| PUT    | `/api/cliente/update/:id` | Actualizar cliente        |
| DELETE | `/api/cliente/remove/:id` | Eliminar cliente          |

---

## Estructura del proyecto

```text
/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js
│   │   ├── models/
│   │   │   └── cliente.model.js
│   │   ├── controllers/
│   │   │   └── cliente.controller.js
│   │   ├── routes/
│   │   │   └── cliente.routes.js
│   │   ├── scripts/
│   │   │   └── clienteSeed.js
│   ├── app.js
│   └── package.json
│
└── frontend/
    ├── public/
    │   └── img/
    │       └── trabajadores/
    │           ├── charlie.png
    │           ├── pim.png
    │           └── alan.png
    │
    ├── src/
    │   ├── components/
    │   │   ├── ClienteCard.jsx
    │   │   ├── ClienteForm.jsx
    │   │   ├── FilterBar.jsx
    │   │   └── Loading.jsx
    │   ├── hooks/
    │   │   ├── useFilter.js
    │   ├── pages/
    │   │   └── HomePage.jsx
    │   ├── App.jsx
    │   └── main.jsx
    │
    └── package.json
```

---

## Funcionalidades

- Listar clientes
- Crear cliente
- Editar cliente
- Eliminar cliente
- Marcar como resuelto
- Asignar trabajador mediante imagen
- Filtrar clientes

---

## Conceptos Aplicados

- CRUD completo (API REST)
- Manejo de estado con hooks (`useState`, `useEffect`)
- Props para comunicación entre componentes
- Custom hooks (`useFilter`)
- Separación de responsabilidades
- Consumo de API con `fetch`
- Renderizado condicional
