import { Router } from "express";
import { citiesController } from "../controllers/cities.controller.js";

const router = Router();

router.post("/cities", citiesController.create);


export default router;