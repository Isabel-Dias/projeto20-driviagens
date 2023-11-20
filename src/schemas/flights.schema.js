import JoiBase from "joi";
import JoiDate from "@joi/date";

const joi = JoiBase.extend(JoiDate);

const flightSchema = joi.object ({
    origin: joi.number().integer().min(1).required(),
	destination: joi.number().integer().min(1).required(),
	date: joi.date().format('DD-MM-YYYY').required()
})

export default flightSchema;