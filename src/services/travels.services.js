import { errors } from "../errors/errors.js"
import { flightsRepository } from "../repositories/flights.repository.js";
import { passengerRepository } from "../repositories/passengers.repository.js";
import { travelsRepository } from "../repositories/travels.repository.js";



async function create(passengerId, flightId) {

    const passengerExists = await passengerRepository.getById(Number(passengerId))
    if (passengerExists.rowCount == 0) throw errors.notFound("Passenger");

    const flightExists = await flightsRepository.getById(Number(flightId));
    if (flightExists.rowCount == 0) throw errors.notFound("Flight");
    
    const travelId = await travelsRepository.create(passengerId, flightId);
   
    return travelId.rows[0].id;
}

export const travelServices = {
    create
}