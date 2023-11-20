import { Router } from "express";
import { passengersController } from "../controllers/passengers.controller.js";


const router = Router();

router.post("/passengers", passengersController.create);
router.get("/passengers/travels", passengersController.getWithTravels)

export default router;