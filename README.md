# Smiling Friends App — TP N°3

## Descripción del Proyecto

App fullstack para la gestion de clientes con problemas emocionales, asignando trabajadores para resolver sus situaciones. Este proyecto evoluciona el TP2 incorporando un manejo de estado global mediante **Context API** y **useReducer**, mejorando significativamente la escalabilidad y la organización del codigo en el frontend.

## Tecnologías Utilizadas

| Capa              | Tecnología                       |
| :---------------- | :------------------------------- |
| **Frontend**      | React.js + Vite + Tailwind CSS   |
| **Backend**       | Node.js + Express                |
| **Base de Datos** | MySQL + Sequelize                |
| **Estado**        | Context API + useReducer (React) |

---

## Cómo Ejecutar el Proyecto

### Requisitos Previos

- Node.js instalado en el sistema.
- Entorno de servidor local (XAMPP o servicio MySQL nativo) en ejecución.
- Base de datos creada (por ejemplo, `smiling_friends_db`).

### Backend

1. Navegar a la carpeta del backend e instalar dependencias:

```bash
cd backend
npm install
```

2. Crear un archivo `.env` en la raíz del directorio `backend` con las siguientes variables de entorno:

```env
DB_NAME=smiling_friends_db
DB_USER=root
DB_PASSWORD=
DB_HOST=localhost
PORT=3000
```

3. Poblar la base de datos con información inicial (Seeding):

```bash
npm run seed
# o alternativamente: node src/scripts/clienteSeed.js
```

4. Ejecutar el servidor en modo desarrollo:

```bash
npm run dev
```

_El servidor estará disponible en: `http://localhost:3000`_

### Frontend

1. Abrir una nueva terminal, navegar a la carpeta del frontend e instalar dependencias:

```bash
cd frontend
npm install
```

2. Iniciar la aplicación:

```bash
npm run dev
```

_La aplicación estará disponible en: `http://localhost:5173`_

---

## Arquitectura del Frontend (TP3)

El estado de la aplicación se maneja de forma global y centralizada mediante **Context API** y **useReducer**, evitando el _prop drilling_.

### Flujo de Datos

```text
Frontend  ──(fetch)──>  Backend  ────>  Base de Datos
   ↓
(dispatch) ──> (reducer) ──> (estado global) ──> UI
```

### Acciones del Reducer

| Acción           | Descripción                                            |
| :--------------- | :----------------------------------------------------- |
| `SET_CLIENTES`   | Cargar los datos iniciales obtenidos desde la API      |
| `ADD_CLIENTE`    | Agregar un nuevo cliente al estado local               |
| `UPDATE_CLIENTE` | Editar o resolver la situación de un cliente existente |
| `DELETE_CLIENTE` | Eliminar un cliente del estado local                   |

---

## Estructura del Proyecto

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
    │   ├── context/
    │   │   ├── ClienteContext.jsx
    │   │   └── clienteReducer.js
    │   ├── hooks/
    │   │   ├── useFilter.js
    │   │   └── useClientes.js
    │   ├── components/
    │   │   ├── ClienteCard.jsx
    │   │   ├── ClienteForm.jsx
    │   │   ├── FilterBar.jsx
    │   │   └── Loading.jsx
    │   ├── pages/
    │   │   └── HomePage.jsx
    │   ├── App.jsx
    │   └── main.jsx
    │
    └── package.json
```

---
