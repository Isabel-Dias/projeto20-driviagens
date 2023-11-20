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

async function getAll(origin = null, destination = null) {
    
    if (!origin && !destination) {
        
        const flights = await flightsRepository.getAll()
        if(flights.rowCount == 0) return [];
        
        return flights.rows;
    
    } else if (!destination) {
        
        const flights = await flightsRepository.getAllByOrigin(origin)
        if(flights.rowCount == 0) return [];
        
        return flights.rows;

    } else if (!origin) {

        const flights = await flightsRepository.getAllByDestination(destination)
        if (flights.rowCount == 0) return [];

        return flights.rows;
        
    } else {
        const flights = await flightsRepository.getAllbyOriginAndDestination(origin, destination)
        if (flights.rowCount == 0) return [];

        return flights.rows;
    }

}

export const flightsServices = {
    create,
    getAll
}