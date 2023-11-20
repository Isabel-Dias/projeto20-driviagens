import { Router } from "express";
import { flightsController } from "../controllers/flights.controller.js";


const router = Router();

router.post("/flights", flightsController.create);
router.get("/flights", flightsController.getAll);

export default router;