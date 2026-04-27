import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

export const Cliente = sequelize.define("Cliente", {
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  problema: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  estado: {
    type: DataTypes.STRING,
    defaultValue: "pendiente",
  },

  imagen: {
    type: DataTypes.STRING,
  },
  direccion: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  trabajador: {
    type: DataTypes.STRING,
  },
});
