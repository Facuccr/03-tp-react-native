import { Router } from "express";
import clienteRouter from "./clienteRoutes.js";
import personajeRouter from "./personajeRoutes.js";

const router = Router();

router.use(clienteRouter);
router.use(personajeRouter);

export default router;
