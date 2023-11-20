import httpStatus from "http-status";
import { errors } from "../errors/errors.js";
import passengerSchema from "../schemas/passenger.schema.js";
import createPassenger from "../services/passengers.services.js";


async function registerPassenger(req, res) {

    const passengerName = req.body;
    
    const validationSchema = passengerSchema.validate(passengerName);

    if (validationSchema.error) throw errors.invalidFormat("name");

    const passengerId = await createPassenger(passengerName);

    const passengerData = {
        id: passengerId.rows[0].id,
        firstName: passengerName.firstName,
        lastName: passengerName.lastName
    }
    
    res.status(httpStatus.CREATED).send(passengerData);

}

export const passengersController = {
    registerPassenger
}