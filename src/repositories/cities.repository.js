import db from "../database.connection.js"

async function create(cityName) {
    const result = await db.query(
        `INSERT INTO "cities" ("name") VALUES ($1) RETURNING "id";`,
        [cityName]
    )
    return result.rows[0].id
}

async function getByName(cityName) {
    const result = await db.query(
        `SELECT * FROM "cities" 
        WHERE "name" = $1`,
        [cityName]
    )
    return result
}

async function getById(cityId) {
    const result = await db.query(
        `SELECT * FROM "cities" 
        WHERE "id" = $1`,
        [cityId]
    )
    return result
}


export const citiesRepository = {
    create,
    getByName,
    getById
}