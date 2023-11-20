import express from 'express';
import "express-async-errors"
import cors from 'cors';
import dotenv from "dotenv";
import errorHandler from './middlewares/errorHandler.middleware.js';
import passengerRoutes from './routes/passengers.routes.js'
import citiesRoutes from './routes/cities.routes.js'
import flightsRoutes from './routes/flights.routes.js'
import travelsRoutes from './routes/travels.routes.js'

dotenv.config()
//TIRAR A LINHA ABAIXO ANTES DE ENTREGAR
process.env.NODE_TLS_REJECT_UNAUTHORIZED='0'

const app = express();

app.use(cors());
app.use(express.json())

app.use(passengerRoutes);
app.use(citiesRoutes);
app.use(flightsRoutes);
app.use(travelsRoutes);
app.use(errorHandler);

const port = process.env.PORT || 5000
app.listen(port, () => {
	console.log(`Servidor rodando na porta ${port}`)
})