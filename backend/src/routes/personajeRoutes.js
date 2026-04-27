import { Router } from "express";
import {
  getPersonajes,
  getPersonajeById,
} from "../controllers/personajeController.js";

const personajeRouter = Router();

personajeRouter.get("/personajes", getPersonajes);
personajeRouter.get("/personaje/:personajeId", getPersonajeById);

export default personajeRouter;
