import httpStatus from "http-status";
import { errors } from "../errors/errors.js";
import flightSchema from "../schemas/flights.schema.js";
import { flightsServices } from "../services/flights.services.js";




async function create(req, res) {
    
    const flightData = req.body

    const validationSchema = flightSchema.validate(flightData);

    if (validationSchema.error) throw errors.invalidFormat("flight information");

    const flightId = await flightsServices.create(flightData)

    const { origin, destination, date} = flightData

    const flight = {
        id: flightId,
        origin,
        destination,
        date
    }

    res.status(httpStatus.CREATED).send(flight);
    
}

export const flightsController = {
    create
}