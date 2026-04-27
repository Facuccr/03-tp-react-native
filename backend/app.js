import express from "express";
import cors from "cors";
import "dotenv/config";

import sequelize from "./src/config/db.js";
import routes from "./src/routes/index.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", routes);

app.get("/", (req, res) => {
  res.send("API funcionando ");
});

// conexion a db
sequelize.sync().then(() => {
  console.log("Base de datos conectada");

  app.listen(process.env.PORT, () => {
    console.log(`Servidor en http://localhost:${process.env.PORT}`);
  });
});
