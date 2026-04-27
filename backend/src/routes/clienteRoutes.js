import { Router } from "express";
import {
  getClientes,
  getClienteById,
  createCliente,
  updateCliente,
  removeCliente,
} from "../controllers/clienteController.js";

const clienteRouter = Router();

clienteRouter.get("/clientes", getClientes);
clienteRouter.get("/cliente/:clienteId", getClienteById);
clienteRouter.post("/cliente", createCliente);
clienteRouter.put("/cliente/update/:clienteId", updateCliente);
clienteRouter.delete("/cliente/remove/:clienteId", removeCliente);

export default clienteRouter;
