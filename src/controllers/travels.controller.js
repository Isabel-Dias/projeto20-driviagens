import httpStatus from "http-status";
import { errors } from "../errors/errors.js";
import travelSchema from "../schemas/travels.schema.js";
import { travelServices } from "../services/travels.services.js";

async function create(req, res) {

    const { passengerId, flightId } = req.body;
    
    const validationSchema = travelSchema.validate(req.body);

    if (validationSchema.error) throw errors.invalidFormat("id format");

    const travelId = await travelServices.create(passengerId, flightId)

    const travelData = {
        id: travelId,
        passengerId,
        flightId
    }

    res.status(httpStatus.CREATED).send(travelData);

}

export const travelsController = {
    create
}