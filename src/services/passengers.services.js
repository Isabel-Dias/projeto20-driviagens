import { errors } from "../errors/errors.js"
import { passengerRepository } from "../repositories/passengers.repository.js";


export default async function createPassenger(passengerData) {
    
    const {firstName, lastName} = passengerData;

    if (!passengerData) throw errors.invalidFormat("name"); 
    
    const passengerId = await passengerRepository.create(firstName, lastName);

    return passengerId;
}
