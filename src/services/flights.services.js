import moment from "moment";
import { errors } from "../errors/errors.js"
import { citiesRepository } from "../repositories/cities.repository.js"
import { flightsRepository } from "../repositories/flights.repository.js";


async function create(flightData) {
    const { origin, destination, date} = flightData

    const originExists = await citiesRepository.getById(Number(origin));
    if (originExists.rowCount == 0) throw errors.notFound("Origin city");

    const destinationExists = await citiesRepository.getById(Number(destination));
    if (destinationExists.rowCount == 0) throw errors.notFound("Destination city");

    if (Number(origin) == Number(destination)) throw errors.conflict("destination city");

    const currentDate = new Date();
    
    const flightDate = moment(date, "DD-MM-YYYY")
    
    const convertedFlightDate = flightDate.toDate();
    
    if (convertedFlightDate < currentDate) throw errors.invalidFormat("date")

    const flightId = await flightsRepository.create(flightData);

    return flightId;
}

export const flightsServices = {
    create
}