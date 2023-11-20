import { errors } from "../errors/errors.js"
import { passengerRepository } from "../repositories/passengers.repository.js";


async function create(passengerData) {
    
    const {firstName, lastName} = passengerData;

    if (!passengerData) throw errors.invalidFormat("name"); 
    
    const passengerId = await passengerRepository.create(firstName, lastName);

    return passengerId;
}

async function getWithTravels(name = null) {
    
    if (!name) {
        const passengers = await passengerRepository.getWithTravels()
        
        return passengers.rows;
    } else {
        const passengers = await passengerRepository.getWithTravelsByName(name)

        return passengers.rows;
    }

}

export const passengerServices = {
    create,
    getWithTravels
}
