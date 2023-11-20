import { Router } from "express";
import { passengersController } from "../controllers/passengers.controller.js";


const router = Router();

router.post("/passengers", passengersController.registerPassenger);


export default router;