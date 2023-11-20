import httpStatus from "http-status";
import { errors } from "../errors/errors.js";
import citySchema from "../schemas/cities.schema.js";
import { citiesService } from "../services/cities.services.js";


async function create(req, res) {
    
    const cityName = req.body.name
    
    const validationSchema = citySchema.validate(req.body);

    if (validationSchema.error) throw errors.invalidFormat("city");
    
    const cityId = await citiesService.create(cityName)

    const cityData = {
        id: cityId,
        name: cityName
    }

    res.status(httpStatus.CREATED).send(cityData);
    
}

export const citiesController = {
    create
}