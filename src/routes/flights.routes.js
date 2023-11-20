import { Router } from "express";
import { flightsController } from "../controllers/flights.controller.js";


const router = Router();

router.post("/flights", flightsController.create);


export default router;