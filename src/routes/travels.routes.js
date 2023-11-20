import { Router } from "express";
import { travelsController } from "../controllers/travels.controller.js";



const router = Router();

router.post("/travels", travelsController.create);


export default router;