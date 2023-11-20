import { errors } from "../errors/errors.js"
import { citiesRepository } from "../repositories/cities.repository.js";


async function create(cityName) {
    const result = await citiesRepository.getByName(cityName); 

    if(result.rowCount != 0) throw errors.conflict("city");
   
    const cityId = await citiesRepository.create(cityName);
    
    return cityId;
}

export const citiesService = {
    create
}