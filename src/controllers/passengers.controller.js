import httpStatus from "http-status";
import { errors } from "../errors/errors.js";
import passengerSchema from "../schemas/passenger.schema.js";
import { passengerServices } from "../services/passengers.services.js";



async function create(req, res) {

    const passengerName = req.body;
    
    const validationSchema = passengerSchema.validate(passengerName);

    if (validationSchema.error) throw errors.invalidFormat("name");

    const passengerId = await passengerServices.create(passengerName);

    const passengerData = {
        id: passengerId.rows[0].id,
        firstName: passengerName.firstName,
        lastName: passengerName.lastName
    }
    
    res.status(httpStatus.CREATED).send(passengerData);

}

async function getWithTravels(req, res) {
    const name = req.query.name;

    const passengersList = await passengerServices.getWithTravels(name)

    res.status(httpStatus.ACCEPTED).send(passengersList);
}

export const passengersController = {
    create,
    getWithTravels
}