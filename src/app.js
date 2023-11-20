import express from 'express';
import "express-async-errors"
import cors from 'cors';
import dotenv from "dotenv";
import errorHandler from './middlewares/errorHandler.middleware.js';
import passengersRoutes from './routes/passengers.routes.js'
import citiesRoutes from './routes/cities.routes.js'
import flightsRoutes from './routes/flights.routes.js'
import travelsRoutes from './routes/travels.routes.js'

dotenv.config()

const app = express();

app.use(cors());
app.use(express.json())

app.use(passengersRoutes);
app.use(citiesRoutes);
app.use(flightsRoutes);
app.use(travelsRoutes);
app.use(errorHandler);

const port = process.env.PORT || 5000
app.listen(port, () => {
	console.log(`Servidor rodando na porta ${port}`)
})