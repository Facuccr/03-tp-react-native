import "dotenv/config";
import sequelize from "../config/db.js";
import { Cliente } from "../models/cliente.js";

const clientes = [
  {
    nombre: "Desmond",
    problema: "Depresión severa y falta de propósito",
    direccion: "742 Evergreen Terrace, Springfield",
    estado: "resuelto",
    trabajador: "/img/trabajadores/pim.png",
    imagen: "/img/trabajadores/pim.png",
  },
  {
    nombre: "Mr. Frog",
    problema: "Conducta errática y problemas sociales",
    direccion: "Los Angeles, California",
    estado: "en proceso",
    trabajador: "/img/trabajadores/charlie.png",
    imagen: "/img/trabajadores/charlie.png",
  },
  {
    nombre: "Gwimbly",
    problema: "Crisis de identidad tras perder fama",
    direccion: "New York City, NY",
    estado: "pendiente",
    trabajador: "/img/trabajadores/alan.png",
    imagen: "/img/trabajadores/alan.png",
  },
  {
    nombre: "Shrimp",
    problema: "Ruptura amorosa y baja autoestima",
    direccion: "Miami Beach, Florida",
    estado: "resuelto",
    trabajador: "/img/trabajadores/pim.png",
    imagen: "/img/trabajadores/pim.png",
  },
  {
    nombre: "The Boss",
    problema: "Estrés laboral extremo",
    direccion: "Dallas, Texas",
    estado: "en proceso",
    trabajador: "/img/trabajadores/charlie.png",
    imagen: "/img/trabajadores/charlie.png",
  },
  {
    nombre: "Glep",
    problema: "Dificultad para comunicarse",
    direccion: "Unknown Street 123",
    estado: "pendiente",
    trabajador: "/img/trabajadores/alan.png",
    imagen: "/img/trabajadores/alan.png",
  },
];

const seedDatabase = async () => {
  try {
    await sequelize.sync({ force: true });
    console.log("Tabla 'Clientes' sincronizada correctamente.");

    //* Insertar datos
    await Cliente.bulkCreate(clientes);

    console.log("Seed cargado con clientes inspirados en la serie.");
    process.exit(0);
  } catch (error) {
    console.error("Error al ejecutar seed:", error);
    process.exit(1);
  }
};

seedDatabase();
